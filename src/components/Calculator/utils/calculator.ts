import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)
math.createUnit('word', '16 b')
math.createUnit('nibble', '4 b')
math.config({
  number: 'Fraction'
})

export const isValidNumberFormat = (str: string) =>
  /^-?(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d*)?$/.test(str)

export const convert = (value: string, unit1: string, unit2: string) => {
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
