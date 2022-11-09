import { Toptions } from "./types";
const selectOptions: Toptions = [
  {
    label: "Basic",
    options: [
      {
        value: "b",
        label: "bit",
      },
      {
        value: "nibble",
        label: "nibble",
      },
      {
        value: "B",
        label: "byte",
      },
      {
        value: "word",
        label: "word",
      },
    ],
  },
  {
    label: "Bit SI",
    //multiples of bit, decimal prefixs
    options: [
      {
        value: "kb",
        label: "kilobit",
      },
      {
        value: "Mb",
        label: "megabit",
      },
      {
        value: "Gb",
        label: "gigabit",
      },
      {
        value: "Tb",
        label: "terabit",
      },
      {
        value: "Pb",
        label: "petabit",
      },
    ],
  },
  {
    label: "Bit bin",
    //multiples of bit, binary prefixs
    options: [
      {
        value: "Kib",
        label: "kibibit",
      },
      {
        value: "Mib",
        label: "mebibit",
      },
      {
        value: "Gib",
        label: "gibibit",
      },
      {
        value: "Tib",
        label: "tebibit",
      },
      {
        value: "Pib",
        label: "pebibit",
      },
    ],
  },
  {
    label: "Byte SI",
    //multiples of byte, decimal prefixs
    options: [
      {
        value: "kB",
        label: "kilobyte",
      },
      {
        value: "MB",
        label: "megabyte",
      },
      {
        value: "GB",
        label: "gigabyte",
      },
      {
        value: "TB",
        label: "terabyte",
      },
      {
        value: "PB",
        label: "petabyte",
      },
    ],
  },
  {
    label: "Byte bin",
    //multiples of byte, binary prefix
    options: [
      {
        value: "KiB",
        label: "kibibyte",
      },
      {
        value: "MiB",
        label: "mebibyte",
      },
      {
        value: "GiB",
        label: "gibibyte",
      },
      {
        value: "TiB",
        label: "tebibyte",
      },
      {
        value: "PiB",
        label: "pebibyte",
      },
    ],
  },
];
export default selectOptions;
