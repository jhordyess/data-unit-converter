import type { RefObject } from 'react'
import { type ActionMeta, type SingleValue } from 'react-select'

import { InputRef } from './components/Input'
import { type TOption } from './utils/options'

export interface CalculatorProps {
  toggleSwitch: {
    value: boolean
    set: (value: boolean) => void
  }
  conversionDirection: {
    value: boolean
  }
  resetCalculator: () => void
  flipUnits: () => void
  firstInput: {
    value: string
    setValue: (value: string) => void
    ref: RefObject<InputRef>
  }
  secondInput: {
    value: string
    setValue: (value: string) => void
    ref: RefObject<InputRef>
  }
  firstSelect: {
    value: TOption
    onChange: (newValue: SingleValue<TOption>, actionMeta: ActionMeta<TOption>) => void
  }
  secondSelect: {
    value: TOption
    onChange: (newValue: SingleValue<TOption>, actionMeta: ActionMeta<TOption>) => void
  }
}

export type CalculatorHookReturn = CalculatorProps
