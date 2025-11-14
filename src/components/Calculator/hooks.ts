import { useState } from 'react'
import { type SingleValue } from 'react-select'

import { convertUnit } from './utils/convertUnit'
import { isValidNumberFormat } from './utils/numberCheck'
import { selectOptionsTraditional, type TOption } from './utils/options'
import type { CalculatorHookReturn } from './types'

type Direction = 'TO_FIRST' | 'TO_SECOND'

export const useCalculator = (): CalculatorHookReturn => {
  const [isBinaryUnitEnabled, setIsBinaryUnit] = useState(false)

  const handleToggleSwitch = (value: boolean): void => {
    setIsBinaryUnit(value)
    resetCalculator()
  }

  const [values, setValues] = useState<{
    value1: string
    value2: string
    direction: Direction
  }>({ value1: '', value2: '', direction: 'TO_SECOND' })
  const [unit1, setUnit1] = useState<TOption>(selectOptionsTraditional[0].options[0])
  const [unit2, setUnit2] = useState<TOption>(selectOptionsTraditional[0].options[2])

  const handleChangeValue1 = (value: string) => {
    if (isValidNumberFormat(value)) {
      setValues({
        value1: value,
        value2: convertUnit(value, unit1.value, values.value2 ? unit1.value : unit1.value),
        direction: 'TO_SECOND'
      })
    }
  }

  const handleChangeUnit1 = (newUnit: SingleValue<TOption>) => {
    if (newUnit) {
      setUnit1(newUnit)
      setValues(prevValues => ({
        ...prevValues,
        value2: convertUnit(prevValues.value1, newUnit.value, unit2.value)
      }))
    }
  }

  const handleChangeValue2 = (value: string) => {
    if (isValidNumberFormat(value)) {
      setValues({
        value1: convertUnit(value, unit2.value, unit1.value),
        value2: value,
        direction: 'TO_FIRST'
      })
    }
  }
  const handleChangeUnit2 = (newUnit: SingleValue<TOption>) => {
    if (newUnit) {
      setUnit2(newUnit)
      setValues(prevValues => ({
        ...prevValues,
        value1: convertUnit(prevValues.value2, newUnit.value, unit1.value)
      }))
    }
  }

  const flipUnits = (): void => {
    if (values.value1 === '' && values.value2 === '') return

    const newUnit1 = unit2
    const newUnit2 = unit1
    const direction = values.direction === 'TO_SECOND'

    setUnit1(newUnit1)
    setUnit2(newUnit2)
    setValues(prevValues => ({
      value1: direction
        ? prevValues.value2
        : convertUnit(prevValues.value2, newUnit2.value, newUnit1.value),
      value2: direction
        ? convertUnit(prevValues.value1, newUnit1.value, newUnit2.value)
        : prevValues.value1,
      direction: direction ? 'TO_FIRST' : 'TO_SECOND'
    }))
  }

  const resetCalculator = (): void => {
    setValues({ value1: '', value2: '', direction: 'TO_SECOND' })
    setUnit1(selectOptionsTraditional[0].options[0])
    setUnit2(selectOptionsTraditional[0].options[2])
  }

  return {
    binaryUnitEnabled: { value: isBinaryUnitEnabled, set: handleToggleSwitch },
    resetCalculator,
    conversionDirection: { value: values.direction === 'TO_SECOND' },
    flipUnits,
    firstInput: { value: values.value1, setValue: handleChangeValue1 },
    secondInput: { value: values.value2, setValue: handleChangeValue2 },
    firstSelect: { value: unit1, onChange: handleChangeUnit1 },
    secondSelect: { value: unit2, onChange: handleChangeUnit2 }
  }
}
