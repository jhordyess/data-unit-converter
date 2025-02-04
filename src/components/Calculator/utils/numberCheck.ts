export const isValidNumberFormat = (str: string) =>
  /^-?(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d*)?$/.test(str)
