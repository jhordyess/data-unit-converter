import './style.css'

import { useImperativeHandle, useState, forwardRef } from 'react'

interface InputProps {
  value: string
  setValue: (value: string) => void
  symbol: string
}

export interface InputRef {
  animationOn: () => void
}

export const Input = forwardRef<InputRef, InputProps>(({ symbol, value, setValue }, ref) => {
  const [animation, setAnimation] = useState(false)

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

      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
})
