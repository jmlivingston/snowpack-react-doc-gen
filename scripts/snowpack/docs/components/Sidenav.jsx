import React, { useState } from 'react'
import styles from './Sidenav.module.css'

function Sidenav({ children, nav }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles['sidenav-container']}>
      <aside className={`${styles['sidenav']} ${isOpen ? styles['sidenav-expanded'] : ''}`}>
        <nav onClick={() => setIsOpen(false)}>{nav}</nav>
        <button
          aria-label="Close Menu"
          className={styles['sidenav-close']}
          onClick={() => setIsOpen(false)}
          title="Close Menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </button>
      </aside>
      <main className={styles['contents']}>
        <header>
          <button
            aria-label="Open Menu"
            className={styles['sidenav-open']}
            title="Open Menu"
            onClick={() => {
              setIsOpen(!isOpen)
            }}>
            <svg viewBox="0 0 50 40" role="presentation" focusable="false" aria-label="trigram for heaven symbol">
              <line x1="0" x2="100%" y1="10%" y2="10%"></line>
              <line x1="0" x2="100%" y1="50%" y2="50%"></line>
              <line x1="0" x2="100%" y1="90%" y2="90%"></line>
            </svg>
          </button>
        </header>
        <article>{children}</article>
      </main>
    </div>
  )
}

export default Sidenav
