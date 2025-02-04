import './style.css'
import type { FC } from 'react'
import { SyncIcon, ArrowRightIcon, ArrowLeftIcon, TrashIcon } from '@primer/octicons-react'
import Select from 'react-select'

import { Input } from './components/Input'
import { ToggleButton } from './components/ToggleButton'
import { selectOptionsBinary, selectOptionsTraditional } from './utils/options'
import type { CalculatorProps } from './types'

export const CalculatorUI: FC<CalculatorProps> = ({
  binaryUnitEnabled,
  resetCalculator,
  conversionDirection,
  flipUnits,
  firstInput,
  secondInput,
  firstSelect,
  secondSelect
}) => (
  <>
    <div className="optionsContainer">
      <ToggleButton
        value={binaryUnitEnabled.value}
        setValue={binaryUnitEnabled.set}
        labels={{ traditionalLabel: 'Traditional prefixes', binaryLabel: 'Binary prefixes' }}
        title="Toggle units"
      />

      <button onClick={resetCalculator} title="Reset values">
        <TrashIcon size={20} />
      </button>
    </div>

    <div className="inputContainer">
      <Input
        setValue={firstInput.setValue}
        value={firstInput.value}
        symbol={firstSelect.value.symbol || firstSelect.value.value}
        ref={firstInput.ref}
      />

      <button>
        {conversionDirection.value ? <ArrowRightIcon size={20} /> : <ArrowLeftIcon size={20} />}
      </button>

      <Input
        setValue={secondInput.setValue}
        value={secondInput.value}
        symbol={secondSelect.value.symbol || secondSelect.value.value}
        ref={secondInput.ref}
      />
    </div>

    <div className="selectContainer">
      <div style={{ flex: '1' }}>
        <Select
          options={binaryUnitEnabled.value ? selectOptionsBinary : selectOptionsTraditional}
          value={firstSelect.value}
          onChange={firstSelect.onChange}
        />
      </div>

      <button onClick={flipUnits} title="Invert values">
        <SyncIcon size={20} />
      </button>

      <div style={{ flex: '1' }}>
        <Select
          options={binaryUnitEnabled.value ? selectOptionsBinary : selectOptionsTraditional}
          value={secondSelect.value}
          onChange={secondSelect.onChange}
        />
      </div>
    </div>
  </>
)
