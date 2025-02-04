import { useRef, useState, useEffect } from 'react'
import { type SingleValue } from 'react-select'

import { type InputRef } from './components/Input'
import { convert, isValidNumberFormat } from './utils/calculator'
import { selectOptionsTraditional, type TOption } from './utils/options'
import type { CalculatorHookReturn } from './types'

export const useCalculator = (): CalculatorHookReturn => {
  const [isBinaryUnitEnabled, setIsBinaryUnit] = useState(false)

  const handleToggleSwitch = (value: boolean): void => {
    setIsBinaryUnit(value)
    resetCalculator()
  }

  const [direction, setDirection] = useState(true)

  const [value1, setValue1] = useState('')
  const [unit1, setUnit1] = useState<TOption>(selectOptionsTraditional[0].options[0])

  const handleChangeValue1 = (value: string) => {
    setDirection(true)
    if (isValidNumberFormat(value)) setValue1(value)
  }

  const handleChangeUnit1: (newValue: SingleValue<TOption>) => void = newValue => {
    if (newValue) setUnit1(newValue)
  }

  const [value2, setValue2] = useState('')
  const [unit2, setUnit2] = useState(selectOptionsTraditional[0].options[2])

  const handleChangeValue2 = (value: string) => {
    setDirection(false)
    if (isValidNumberFormat(value)) setValue2(value)
  }
  const handleChangeUnit2: (newValue: SingleValue<TOption>) => void = newValue => {
    if (newValue) setUnit2(newValue)
  }

  const childRef1 = useRef<InputRef>(null)
  const childRef2 = useRef<InputRef>(null)

  useEffect(() => {
    if (direction) {
      setValue2(convert(value1, unit1.value, unit2.value))
      childRef2.current?.animationOn()
    } else {
      setValue1(convert(value2, unit2.value, unit1.value))
      childRef1.current?.animationOn()
    }
  }, [value1, value2, unit1, unit2, direction])

  const flipUnits = (): void => {
    if (value1 || value1)
      if (direction) {
        setDirection(false)
        setValue2(value1)
      } else {
        setDirection(true)
        setValue1(value2)
      }
    const aux = unit2
    setUnit2(unit1)
    setUnit1(aux)
  }

  const resetCalculator = (): void => {
    setDirection(true)
    setValue2('')
    setValue1('')
    setUnit1(selectOptionsTraditional[0].options[0])
    setUnit2(selectOptionsTraditional[0].options[2])
  }

  return {
    binaryUnitEnabled: { value: isBinaryUnitEnabled, set: handleToggleSwitch },
    resetCalculator,
    conversionDirection: { value: direction },
    flipUnits,
    firstInput: { value: value1, setValue: handleChangeValue1, ref: childRef1 },
    secondInput: { value: value2, setValue: handleChangeValue2, ref: childRef2 },
    firstSelect: { value: unit1, onChange: handleChangeUnit1 },
    secondSelect: { value: unit2, onChange: handleChangeUnit2 }
  }
}
