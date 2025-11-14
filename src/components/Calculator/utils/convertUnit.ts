import { create, all } from 'mathjs'

const math = create(all, {
  number: 'Fraction'
})
math.createUnit('word', '16 b')
math.createUnit('nibble', '4 b')

export const convertUnit = (
  value: string,
  sourceUnit: string,
  targetUnit: string,
  roundToTwoDecimals = false
): string => {
  try {
    if (!value) return ''

    const unit = math.unit(`${value} ${sourceUnit}`)
    const convertedValue = unit.toNumber(targetUnit)

    if (isNaN(convertedValue)) {
      throw new Error('Invalid conversion')
    }

    if (roundToTwoDecimals) {
      return math.round(convertedValue, 2).toString()
    }
    return convertedValue.toString()
  } catch {
    return ''
  }
}
