import { type ActionMeta, type SingleValue } from 'react-select'

import { type TOption } from './utils/options'

export interface CalculatorProps {
  binaryUnitEnabled: {
    value: boolean
    set: (value: boolean) => void
  }
  resetCalculator: () => void
  firstInput: {
    value: string
    setValue: (value: string) => void
  }
  secondInput: {
    value: string
    setValue: (value: string) => void
  }
  firstSelect: {
    value: TOption
    onChange: (newValue: SingleValue<TOption>) => void
  }
  secondSelect: {
    value: TOption
    onChange: (newValue: SingleValue<TOption>, actionMeta: ActionMeta<TOption>) => void
  }
}

export type CalculatorHookReturn = CalculatorProps
