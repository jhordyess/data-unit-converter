import { describe, it, expect } from 'vitest'
import { convert } from './calculator'

describe('Check if the conversion is correct by the nearest unit', () => {
  const testCases = [
    { value: '1', unit1: 'b', unit2: 'B', expected: '0.125' },
    { value: '1', unit1: 'B', unit2: 'b', expected: '8' },
    { value: '1', unit1: 'nibble', unit2: 'b', expected: '4' },
    { value: '1', unit1: 'word', unit2: 'b', expected: '16' },
    { value: '1', unit1: 'kb', unit2: 'b', expected: '1000' },
    { value: '1', unit1: 'Mb', unit2: 'kb', expected: '1000' },
    { value: '1', unit1: 'Gb', unit2: 'Mb', expected: '1000' },
    { value: '1', unit1: 'Tb', unit2: 'Gb', expected: '1000' },
    { value: '1', unit1: 'Pb', unit2: 'Tb', expected: '1000' },
    { value: '1', unit1: 'Kib', unit2: 'b', expected: '1024' },
    { value: '1', unit1: 'Mib', unit2: 'Kib', expected: '1024' },
    { value: '1', unit1: 'Gib', unit2: 'Mib', expected: '1024' },
    { value: '1', unit1: 'Tib', unit2: 'Gib', expected: '1024' },
    { value: '1', unit1: 'Pib', unit2: 'Tib', expected: '1024' },
    { value: '1', unit1: 'kB', unit2: 'B', expected: '1000' },
    { value: '1', unit1: 'MB', unit2: 'kB', expected: '1000' },
    { value: '1', unit1: 'GB', unit2: 'MB', expected: '1000' },
    { value: '1', unit1: 'TB', unit2: 'GB', expected: '1000' },
    { value: '1', unit1: 'PB', unit2: 'TB', expected: '1000' },
    { value: '1', unit1: 'KiB', unit2: 'B', expected: '1024' },
    { value: '1', unit1: 'MiB', unit2: 'KiB', expected: '1024' },
    { value: '1', unit1: 'GiB', unit2: 'MiB', expected: '1024' },
    { value: '1', unit1: 'TiB', unit2: 'GiB', expected: '1024' },
    { value: '1', unit1: 'PiB', unit2: 'TiB', expected: '1024' }
  ]

  testCases.forEach(({ value, unit1, unit2, expected }) => {
    it(`should convert ${value} ${unit1} to ${unit2}`, () => {
      expect(convert(value, unit1, unit2)).toBe(expected)
    })
  })
})

describe('Check if the conversion is correct with rounding', () => {
  const testCases = [
    { value: '1.2345', unit1: 'b', unit2: 'B', expected: '0.15' },
    { value: '1234.5678', unit1: 'B', unit2: 'kb', expected: '9.88' },
    { value: '9876.5432', unit1: 'kB', unit2: 'Mb', expected: '79.01' },
    { value: '0.1234', unit1: 'PB', unit2: 'Tib', expected: '897.85' },
    { value: '5678.9101', unit1: 'kB', unit2: 'MiB', expected: '5.42' }
  ]

  testCases.forEach(({ value, unit1, unit2, expected }) => {
    it(`should convert ${value} ${unit1} to ${unit2} with rounding`, () => {
      expect(convert(value, unit1, unit2, true)).toBe(expected)
    })
  })
})
