import type { ChangeEventHandler, FC } from 'react'
import './style.css'

interface ToggleButtonProps {
  value: boolean
  setValue: (value: boolean) => void
  labels: {
    traditionalLabel: string
    binaryLabel: string
  }
  title?: string
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  value,
  labels: { binaryLabel, traditionalLabel },
  setValue,
  title
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => setValue(e.target.checked)

  return (
    <div className="SihmKT" title={title}>
      <input type="checkbox" checked={value} onChange={handleChange} id={'rghTp'} hidden />

      <label htmlFor="rghTp">
        <div>{traditionalLabel}</div>
        <div>{binaryLabel}</div>
      </label>
    </div>
  )
}
