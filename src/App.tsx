import React from "react";
import Select from "react-select";
import { create, all } from "mathjs";
import { SyncIcon, ArrowRightIcon, ArrowLeftIcon } from '@primer/octicons-react'
import "./App.css";
import optsCorrect from "./options";
import { Toptions } from "./types/options";
import Input from "./components/Input";
const config = {};
const math = create(all, config);
math.createUnit("word", "16 b");
math.createUnit("nibble", "4 b");
math.config({
  number: "Fraction",
});
const pattern = /^-?(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d*)?$/;

const convert = (value: string, unit1: string, unit2: string) => {
  try {
    const aux = math
      .evaluate(`${parseFloat(value)} ${unit1} to ${unit2}`)
      .toNumeric(unit2)
      .valueOf();
    return isNaN(aux) ? "" : aux.toString();
  } catch (error) {
    // console.log(error);
    return "";
  }
};
const Convert = () => {
  const sw1 = React.useRef(false);
  const [direction, setDirection] = React.useState(false);
  const [value1, setValue1] = React.useState("");
  const [unit1, setUnit1] = React.useState({ value: "b", label: "bit" });
  const handleChangeValue1 = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setDirection(true);
    if (!sw1.current) sw1.current = true;
    if (pattern.test(currentTarget.value)) setValue1(currentTarget.value);
  };
  const handleChangeUnit1 = (event: any): void => {
    if (!value1 || !value2) sw1.current = false;
    setUnit1(event);
  };
  const [value2, setValue2] = React.useState("");
  const [unit2, setUnit2] = React.useState({ value: "B", label: "byte" });
  const handleChangeValue2 = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setDirection(false);
    if (!sw1.current) sw1.current = true;
    if (pattern.test(currentTarget.value)) setValue2(currentTarget.value);
  };
  const handleChangeUnit2 = (event: any) => {
    if (!value1 || !value2) sw1.current = false;
    setUnit2(event);
  };
  const [options, setOptions]: any = React.useState(optsCorrect);
  const handleChangeOptions = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    clean();
    if (currentTarget.checked) setOptions(optsCorrect);
    else {
      setOptions((curr: Toptions) => {
        const aux = curr.filter(
          (opt) => opt.label === "Basic" || opt.label === "Bit SI"
        );
        aux.push({
          label: "Byte SI",
          options: [
            { value: "KiB", label: "kilobyte" },
            { value: "MiB", label: "megabyte" },
            { value: "GiB", label: "gigabyte" },
            { value: "TiB", label: "terabyte" },
            { value: "PiB", label: "petabyte" },
          ],
        });
        return aux;
      });
    }
  };
  const childRef1: any = React.useRef(); //TODO! "any", considerarse nulidad
  const childRef2: any = React.useRef();

  React.useEffect(() => {
    if (!sw1.current) {
      sw1.current = true;
      return;
    }
    if (direction) {
      setValue2(convert(value1, unit1.value, unit2.value));
      childRef2.current.animationOn();
    } else {
      setValue1(convert(value2, unit2.value, unit1.value));
      childRef1.current.animationOn();
    }
    sw1.current = false;
  }, [unit1, unit2, value1, value2]);

  const invertAll = (): void => {
    if (value1 || value1)
      if (direction) {
        setDirection(false);
        setValue2(value1);
      } else {
        setDirection(true);
        setValue1(value2);
      }
    if (!value1 || !value2) sw1.current = false;
    const aux = unit2;
    setUnit2(unit1);
    setUnit1(aux);
  };
  const clean = (): void => {
    sw1.current = false;
    setDirection(true);
    setValue2("");
    setValue1("");
    setUnit1({ value: "b", label: "bit" });
    setUnit2({ value: "B", label: "byte" });
  };
  return (
    <>
      <div className="inputContainer">
        <Input
          handleChangeValue={handleChangeValue1}
          value={value1}
          symbol={unit1.value}
          ref={childRef1}
        />
        <button> {direction
          ? <ArrowRightIcon size={24} />
          : <ArrowLeftIcon size={24} />
        }</button>
        <Input
          handleChangeValue={handleChangeValue2}
          value={value2}
          symbol={unit2.value}
          ref={childRef2}
        />
      </div>
      <div className="selectContainer">
        <div style={{ "flex": "1" }}>
          <Select
            options={options}
            value={unit1}
            onChange={handleChangeUnit1}
          />
        </div>
        <button onClick={invertAll}><SyncIcon size={24} /></button>
        <div style={{ "flex": "1" }}>
          <Select
            options={options}
            value={unit2}
            onChange={handleChangeUnit2}
          />
        </div>
      </div>
      <button onClick={clean}>Clean</button>
      <label>Right way?</label>
      <input
        type="checkbox"
        defaultChecked={true}
        onChange={handleChangeOptions}
      />
    </>
  );
  //TODO Generar un formulario,
  //TODO mas unidades
};
function App() {
  return (
    <div className="container">
      <h3>Download time left calc</h3>
      <Convert />
    </div>
  );
}

export default App;

