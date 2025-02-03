import './style.css'

import { useRef, useState, useEffect, type ChangeEventHandler } from 'react'
import Select, { type ActionMeta, type SingleValue } from 'react-select'
import { create, all } from 'mathjs'
import { SyncIcon, ArrowRightIcon, ArrowLeftIcon, TrashIcon } from '@primer/octicons-react'
import selectOptions, { type TOptions, type TOption } from './options'
import Input, { type InputRef } from './Input'
import ToggleButton from './ToggleButton'

const config = {}
const math = create(all, config)
math.createUnit('word', '16 b')
math.createUnit('nibble', '4 b')
math.config({
  number: 'Fraction'
})

const pattern = /^-?(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d*)?$/

const convert = (value: string, unit1: string, unit2: string) => {
  try {
    const aux = math
      .evaluate(`${parseFloat(value)} ${unit1} to ${unit2}`)
      .toNumeric(unit2)
      .valueOf()
    return isNaN(aux) ? '' : aux.toString()
  } catch {
    return ''
  }
}

export default function Calculator() {
  const sw = useRef(false)
  const [direction, setDirection] = useState(true)

  const [value1, setValue1] = useState('')
  const [unit1, setUnit1] = useState<TOption>(selectOptions[0].options[0])

  const handleChangeValue1: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setDirection(true)
    if (!sw.current) sw.current = true
    if (pattern.test(currentTarget.value)) setValue1(currentTarget.value)
  }

  const handleChangeUnit1: (
    newValue: SingleValue<TOption>,
    actionMeta: ActionMeta<TOption>
  ) => void = event => {
    if (!value1 || !value2) sw.current = false
    if (event) setUnit1(event)
  }

  const [value2, setValue2] = useState('')
  const [unit2, setUnit2] = useState(selectOptions[0].options[2])
  const handleChangeValue2: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setDirection(false)
    if (!sw.current) sw.current = true
    if (pattern.test(currentTarget.value)) setValue2(currentTarget.value)
  }
  const handleChangeUnit2: (
    newValue: SingleValue<TOption>,
    actionMeta: ActionMeta<TOption>
  ) => void = event => {
    if (!value1 || !value2) sw.current = false
    if (event) setUnit2(event)
  }

  const [options, setOptions] = useState<TOptions>(selectOptions)
  const handleChangeOptions: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    clean()
    if (currentTarget.checked) setOptions(selectOptions)
    else {
      setOptions((curr: TOptions) => {
        const aux = curr.filter(opt => opt.label === 'Basic' || opt.label === 'Bit SI')
        aux.push({
          label: 'Byte SI',
          options: [
            { value: 'KiB', label: 'kilobyte', symbol: 'kB' },
            { value: 'MiB', label: 'megabyte', symbol: 'MB' },
            { value: 'GiB', label: 'gigabyte', symbol: 'GB' },
            { value: 'TiB', label: 'terabyte', symbol: 'TB' },
            { value: 'PiB', label: 'petabyte', symbol: 'PB' }
          ]
        })
        return aux
      })
    }
  }

  const childRef1 = useRef<InputRef>(null)
  const childRef2 = useRef<InputRef>(null)

  useEffect(() => {
    if (!sw.current) {
      sw.current = true
      return
    }
    if (direction) {
      setValue2(convert(value1, unit1.value, unit2.value))
      childRef2.current?.animationOn()
    } else {
      setValue1(convert(value2, unit2.value, unit1.value))
      childRef1.current?.animationOn()
    }
    sw.current = false
  }, [value1, value2, unit1, unit2, direction])

  const invertAll = (): void => {
    if (value1 || value1)
      if (direction) {
        setDirection(false)
        setValue2(value1)
      } else {
        setDirection(true)
        setValue1(value2)
      }
    if (!value1 || !value2) sw.current = false
    const aux = unit2
    setUnit2(unit1)
    setUnit1(aux)
  }

  const clean = (): void => {
    sw.current = false
    setDirection(true)
    setValue2('')
    setValue1('')
    setUnit1(selectOptions[0].options[0])
    setUnit2(selectOptions[0].options[2])
  }

  return (
    <>
      <div className="optionsContainer">
        <ToggleButton
          default={true}
          handleChange={handleChangeOptions}
          trueVal={'Binary prefixes'}
          falseVal={'Traditional prefixes'}
          title="Toggle units"
        />
        <button onClick={clean} title="Reset values">
          <TrashIcon size={20} />
        </button>
      </div>
      <div className="inputContainer">
        <Input
          handleChangeValue={handleChangeValue1}
          value={value1}
          symbol={unit1.symbol ? unit1.symbol : unit1.value}
          ref={childRef1}
        />
        <button>{direction ? <ArrowRightIcon size={20} /> : <ArrowLeftIcon size={20} />}</button>
        <Input
          handleChangeValue={handleChangeValue2}
          value={value2}
          symbol={unit2.symbol ? unit2.symbol : unit2.value}
          ref={childRef2}
        />
      </div>
      <div className="selectContainer">
        <div style={{ flex: '1' }}>
          <Select options={options} value={unit1} onChange={handleChangeUnit1} />
        </div>
        <button onClick={invertAll} title="Invert values">
          <SyncIcon size={20} />
        </button>
        <div style={{ flex: '1' }}>
          <Select options={options} value={unit2} onChange={handleChangeUnit2} />
        </div>
      </div>
    </>
  )
}
