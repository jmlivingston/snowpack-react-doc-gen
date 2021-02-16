import React from 'react'
import style from './Button.module.css'

function Button({ children, className, onClick }) {
  return (
    <button className={`${style.button} ${style[className]}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
