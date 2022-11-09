import * as React from "react";
import "./style.css";
const Input = React.forwardRef(
  (
    prop: {
      value: string;
      symbol: string;
      handleChangeValue: any;
      animation?: boolean;
      setAnimation?: any;
    },
    ref
  ) => {
    const [animation, setAnimation] = React.useState(false);
    const animationOff = () => {
      setAnimation(false);
    };
    const animationOn = () => {
      setAnimation(true);
    };
    React.useImperativeHandle(ref, () => ({
      animationOn,
    }));
    return (
      <div
        className={animation ? "bFXyQu animation" : "bFXyQu"}
        onAnimationEnd={animationOff}
      >
        <div>{prop.symbol}</div>
        <input
          type="text"
          value={prop.value}
          onChange={prop.handleChangeValue}
        />
      </div>
    );
  }
);
export default Input;
