import './MyInput.scss'
import { useCallback } from 'react'

// Utils
import cn from 'classnames'
import debounce from '../../../utils/browser/debounce'

// Interface
interface Props {
  label: string
  model: {
    value: string | number
    setValue: any
  }
  type?: typeInput
  name?: nameInput
  autoComplete?: autoCompleteInput
  isError?: boolean // Not needed
  className?: any // Not needed

  callback?: (term: string) => void
  debounce?: number
}

type typeInput = 'password' | 'text' | 'email'
type nameInput = 'username' | 'password' | 'new-password' | 'password-confirm' | 'email' | 'search'
type autoCompleteInput = 'username' | 'new-password' | 'password' | 'email'

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function MyInput(props: Props): JSX.Element {
  const debounceCallback = props.callback || (() => {})
  const debounceTime = props.debounce || 100

  const dFuncCallback = debounce<typeof debounceCallback>(debounceCallback, debounceTime)

  const dFunc = useCallback(
    (term: string) => {
      dFuncCallback(term)
    },
    [debounceTime, debounceCallback]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.model.setValue(e.target.value)
    dFunc(e.target.value)
  }

  return (
    <div className="formGroup">
      <label className="formGroup__label">{props.label}</label>
      <input
        className={cn('formGroup__input', { Error: props?.isError })}
        value={props.model.value}
        onChange={handleChange}
        type={props?.type || 'text'}
        name={props?.name}
        autoComplete={'username'}
      />
    </div>
  )
}
