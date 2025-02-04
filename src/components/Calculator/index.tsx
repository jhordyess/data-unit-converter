import { useCalculator } from './hooks'
import { CalculatorUI } from './CalculatorUI'

export default function Calculator() {
  const hooks = useCalculator()

  return <CalculatorUI {...hooks} />
}
