import React from "react";
import Select from "react-select";
import { create, all } from "mathjs";
import {
  SyncIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TrashIcon,
} from "@primer/octicons-react";

import "./App.css";
import selectOps from "./extra/selectOps";
import { Toptions } from "./extra/Toptions";
import Input from "./components/input/Input";
import ToogleButton from "./components/toogleButton/ToogleButton";

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
    return "";
  }
};

const App = () => {
  const sw = React.useRef(false);
  const [direction, setDirection] = React.useState(true);

  const [value1, setValue1] = React.useState("");
  const [unit1, setUnit1] = React.useState(selectOps[0].options[0]);
  const handleChangeValue1 = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setDirection(true);
    if (!sw.current) sw.current = true;
    if (pattern.test(currentTarget.value)) setValue1(currentTarget.value);
  };
  const handleChangeUnit1 = (event: any): void => {
    if (!value1 || !value2) sw.current = false;
    setUnit1(event);
  };

  const [value2, setValue2] = React.useState("");
  const [unit2, setUnit2] = React.useState(selectOps[0].options[2]);
  const handleChangeValue2 = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setDirection(false);
    if (!sw.current) sw.current = true;
    if (pattern.test(currentTarget.value)) setValue2(currentTarget.value);
  };
  const handleChangeUnit2 = (event: any) => {
    if (!value1 || !value2) sw.current = false;
    setUnit2(event);
  };

  const [options, setOptions]: any = React.useState(selectOps);
  const handleChangeOptions = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    clean();
    if (currentTarget.checked) setOptions(selectOps);
    else {
      setOptions((curr: Toptions) => {
        const aux = curr.filter(
          (opt) => opt.label === "Basic" || opt.label === "Bit SI"
        );
        aux.push({
          label: "Byte SI",
          options: [
            { value: "KiB", label: "kilobyte", symbol: "kB" },
            { value: "MiB", label: "megabyte", symbol: "MB" },
            { value: "GiB", label: "gigabyte", symbol: "GB" },
            { value: "TiB", label: "terabyte", symbol: "TB" },
            { value: "PiB", label: "petabyte", symbol: "PB" },
          ],
        });
        return aux;
      });
    }
  };

  const childRef1: any = React.useRef();
  const childRef2: any = React.useRef();

  React.useEffect(() => {
    if (!sw.current) {
      sw.current = true;
      return;
    }
    if (direction) {
      setValue2(convert(value1, unit1.value, unit2.value));
      childRef2.current.animationOn();
    } else {
      setValue1(convert(value2, unit2.value, unit1.value));
      childRef1.current.animationOn();
    }
    sw.current = false;
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
    if (!value1 || !value2) sw.current = false;
    const aux = unit2;
    setUnit2(unit1);
    setUnit1(aux);
  };

  const clean = (): void => {
    sw.current = false;
    setDirection(true);
    setValue2("");
    setValue1("");
    setUnit1(selectOps[0].options[0]);
    setUnit2(selectOps[0].options[2]);
  };

  return (
    <div className="container">
      <h2>Data unit converter</h2>
      <div className="optionsContainer">
        <ToogleButton
          default={true}
          handleChange={handleChangeOptions}
          trueVal={"Binary prefixes"}
          falseVal={"Traditional prefixes"}
          title="Toogle units"
        />
        <button onClick={clean} title="Reset values">
          <TrashIcon size={20} />
        </button>
      </div>
      <div className="inputContainer">
        <Input
          handleChangeValue={handleChangeValue1}
          value={value1}
          symbol={unit1.symbol ? unit1.symbol : unit1.value}
          ref={childRef1}
        />
        <button>
          {direction ? (
            <ArrowRightIcon size={20} />
          ) : (
            <ArrowLeftIcon size={20} />
          )}
        </button>
        <Input
          handleChangeValue={handleChangeValue2}
          value={value2}
          symbol={unit2.symbol ? unit2.symbol : unit2.value}
          ref={childRef2}
        />
      </div>
      <div className="selectContainer">
        <div style={{ flex: "1" }}>
          <Select
            options={options}
            value={unit1}
            onChange={handleChangeUnit1}
          />
        </div>
        <button onClick={invertAll} title="Invert values">
          <SyncIcon size={20} />
        </button>
        <div style={{ flex: "1" }}>
          <Select
            options={options}
            value={unit2}
            onChange={handleChangeUnit2}
          />
        </div>
      </div>
      <footer>
        Made with 💪 by{" "}
        <a href="https://jhordyess.com" target="_blank" rel="noreferrer">
          Jhordyess
        </a>
      </footer>
    </div>
  );
};

export default App;
