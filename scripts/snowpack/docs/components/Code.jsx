import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import React, { useEffect, useRef } from 'react'

function Code({ code, plugins, language = 'js' }) {
  const codeRef = useRef()
  useEffect(() => {
    Prism.highlightElement(codeRef.current)
  }, [code, codeRef])
  return (
    <pre className={plugins?.join(' ')}>
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}

export default Code
