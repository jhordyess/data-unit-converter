import type { ChangeEventHandler, FC } from 'react'
import './style.css'

interface ToggleButtonProps {
  value: boolean
  setValue: (value: boolean) => void
  labels: {
    onLabel: string
    offLabel: string
  }
  title?: string
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  value,
  labels: { offLabel, onLabel },
  setValue,
  title
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = () => setValue(!value)

  return (
    <div className="SihmKT" title={title}>
      <input type="checkbox" checked={value} onChange={handleChange} id={'rghTp'} />

      <label htmlFor="rghTp">
        <div>{onLabel}</div>
        <div>{offLabel}</div>
      </label>
    </div>
  )
}
