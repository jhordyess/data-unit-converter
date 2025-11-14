import './style.css'
import { useAnimate, type TargetAndTransition } from 'motion/react'

import { useEffect, useRef, type FC } from 'react'

interface InputProps {
  value: string
  setValue: (value: string) => void
  symbol: string
}

const borderAnimation: TargetAndTransition = {
  borderColor: ['#cccccc', '#000000bf', '#cccccc'],
  transition: { duration: 0.75 }
}

export const Input: FC<InputProps> = ({ symbol, value, setValue }) => {
  const prevValue = useRef(value)
  const [scope, animate] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    if (value === prevValue.current) return
    animate(scope.current, borderAnimation)
    animate(scope.current.children[0], borderAnimation)
    prevValue.current = value
  }, [value, animate, scope])

  return (
    <div ref={scope} className="bFXyQu">
      <div>{symbol}</div>

      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}
