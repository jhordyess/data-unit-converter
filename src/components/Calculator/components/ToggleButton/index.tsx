import type { ChangeEventHandler } from 'react'
import './style.css'

const ToggleButton = (props: {
  handleChange: ChangeEventHandler<HTMLInputElement>
  default: boolean
  trueVal: string
  falseVal: string
  title?: string
}) => {
  return (
    <div className="SihmKT" title={props.title}>
      <input
        type="checkbox"
        defaultChecked={props.default}
        onChange={props.handleChange}
        id={'rghTp'}
      />
      <label htmlFor="rghTp">
        <div>{props.trueVal}</div>
        <div>{props.falseVal}</div>
      </label>
    </div>
  )
}
export default ToggleButton
