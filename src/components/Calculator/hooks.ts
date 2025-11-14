import { useReducer } from 'react'
import { type SingleValue } from 'react-select'

import { convertUnit } from './utils/convertUnit'
import { isValidNumberFormat } from './utils/numberCheck'
import { selectOptionsTraditional, type TOption } from './utils/options'
import type { CalculatorHookReturn } from './types'

type State = {
  isBinaryUnit: boolean
  value1: string
  value2: string
  unit1: TOption
  unit2: TOption
}

type Action =
  | { type: 'TOGGLE_BINARY'; payload: boolean }
  | { type: 'CHANGE_VALUE1'; payload: string }
  | { type: 'CHANGE_VALUE2'; payload: string }
  | { type: 'CHANGE_UNIT1'; payload: TOption }
  | { type: 'CHANGE_UNIT2'; payload: TOption }
  | { type: 'RESET' }

const initialState: State = {
  isBinaryUnit: false,
  value1: '',
  value2: '',
  unit1: selectOptionsTraditional[0].options[0],
  unit2: selectOptionsTraditional[0].options[2]
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_BINARY':
      return {
        ...initialState,
        isBinaryUnit: action.payload
      }

    case 'CHANGE_VALUE1': {
      const v1 = action.payload
      if (!isValidNumberFormat(v1)) return state
      const v2 = v1 === '' ? '' : convertUnit(v1, state.unit1.value, state.unit2.value)
      return {
        ...state,
        value1: v1,
        value2: v2
      }
    }

    case 'CHANGE_VALUE2': {
      const v2 = action.payload
      if (!isValidNumberFormat(v2)) return state
      const v1 = v2 === '' ? '' : convertUnit(v2, state.unit2.value, state.unit1.value)
      return {
        ...state,
        value1: v1,
        value2: v2
      }
    }

    // Update the first unit and recalculate value2, use first value with the new unit to convert using the second unit
    case 'CHANGE_UNIT1': {
      const newUnit1 = action.payload
      const newValue2 =
        state.value1 === '' ? '' : convertUnit(state.value1, newUnit1.value, state.unit2.value)
      return {
        ...state,
        unit1: newUnit1,
        value2: newValue2
      }
    }

    // Update the second unit and recalculate value2, use first value with the first unit to convert using the new second unit
    case 'CHANGE_UNIT2': {
      const newUnit2 = action.payload
      const newValue2 =
        state.value1 === '' ? '' : convertUnit(state.value1, state.unit1.value, newUnit2.value)
      return {
        ...state,
        unit2: newUnit2,
        value2: newValue2
      }
    }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

export const useCalculator = (): CalculatorHookReturn => {
  const [state, dispatch] = useReducer(reducer, undefined, () => initialState)

  const handleToggleSwitch = (value: boolean): void => {
    dispatch({ type: 'TOGGLE_BINARY', payload: value })
  }

  const handleChangeValue1 = (value: string) => {
    dispatch({ type: 'CHANGE_VALUE1', payload: value })
  }

  const handleChangeUnit1 = (newUnit: SingleValue<TOption>) => {
    if (newUnit) dispatch({ type: 'CHANGE_UNIT1', payload: newUnit })
  }

  const handleChangeValue2 = (value: string) => {
    dispatch({ type: 'CHANGE_VALUE2', payload: value })
  }

  const handleChangeUnit2 = (newUnit: SingleValue<TOption>) => {
    if (newUnit) dispatch({ type: 'CHANGE_UNIT2', payload: newUnit })
  }

  const resetCalculator = (): void => {
    dispatch({ type: 'RESET' })
  }

  return {
    binaryUnitEnabled: { value: state.isBinaryUnit, set: handleToggleSwitch },
    resetCalculator,
    firstInput: { value: state.value1, setValue: handleChangeValue1 },
    secondInput: { value: state.value2, setValue: handleChangeValue2 },
    firstSelect: { value: state.unit1, onChange: handleChangeUnit1 },
    secondSelect: { value: state.unit2, onChange: handleChangeUnit2 }
  }
}
