import './ThemeSelector.scss'
import { useRef, useEffect, useState } from 'react'

// Icons
import { GiSun } from 'react-icons/gi'
import { IoMdRainy } from 'react-icons/io'
import { GiNightSleep } from 'react-icons/gi'

// Components

// Custom hooks
import { useTheme } from '../../hooks/theme'
import { useOutsideClick } from '../../hooks/events/useOutsideClick'

// Utils
import cn from 'classnames'
import { ThemeVarious } from '../../contexts/theme'

interface Props {
  setOpen: any
  buttonRef: any
}

///////////////////////////////////////////////////////////////////////////////////////////
export default function ThemeSelector(props: Props): JSX.Element {
  const [currentThemeIcon, setCurrentThemeIcon] = useState<any>()
  const { themeContext, setThemeContext } = useTheme()

  const innerRef = useRef(null)
  const handleOutsideClick = () => props.setOpen(false)
  useOutsideClick([innerRef, props.buttonRef], handleOutsideClick)
  // const handleClickClose = () => props.setOpen(false)

  const handleClickTheme = (theme: ThemeVarious) => (e: any) => {
    setThemeContext(theme)
  }

  useEffect(() => {
    setCurrentThemeIcon(themeIcon.get(themeContext))
  }, [themeContext])

  return (
    <div ref={innerRef} className="theme-selector">
      <div className="theme-selector-content">
        <GiSun
          onClick={handleClickTheme('light')}
          className={cn('theme-selector-item', { active: themeContext === 'light' })}
        />
        <IoMdRainy
          onClick={handleClickTheme('blue')}
          className={cn('theme-selector-item', { active: themeContext === 'blue' })}
        />
        <GiNightSleep
          onClick={handleClickTheme('dark')}
          className={cn('theme-selector-item', { active: themeContext === 'dark' })}
        />
      </div>
    </div>
  )
}

// Hardcode
const themeIcon = new Map<ThemeVarious, JSX.Element>([
  ['light', <GiSun key={1} />],
  ['dark', <GiNightSleep key={2} />],
  ['blue', <IoMdRainy key={3} />],
])
