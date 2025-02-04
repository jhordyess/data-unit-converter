import './style.css'

import { type ChangeEventHandler, useImperativeHandle, useState, forwardRef } from 'react'

interface InputProps {
  value: string
  symbol: string
  handleChangeValue: ChangeEventHandler<HTMLInputElement>
}

export interface InputRef {
  animationOn: () => void
}

const Input = forwardRef<InputRef, InputProps>(({ symbol, value, handleChangeValue }, ref) => {
  const [animation, setAnimation] = useState<boolean>(false)

  const animationOff = () => {
    setAnimation(false)
  }

  const animationOn = () => {
    setAnimation(true)
  }

  useImperativeHandle(ref, () => ({
    animationOn
  }))

  return (
    <div className={animation ? 'bFXyQu animation' : 'bFXyQu'} onAnimationEnd={animationOff}>
      <div>{symbol}</div>
      <input type="text" value={value} onChange={handleChangeValue} />
    </div>
  )
})
export default Input
