import React, { useState } from 'react'
import './Sidebar.css'

function Sidebar({ children, nav }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sidenav-container">
      <aside id="sidenav-open" className={isOpen ? 'sidenav-open-open' : ''}>
        <nav onClick={() => setIsOpen(false)}>{nav}</nav>
        <a
          href="#"
          id="sidenav-close"
          title="Close Menu"
          aria-label="Close Menu"
          onClick={() => setIsOpen(false)}></a>
      </aside>
      <main>
        <header>
          <a
            id="sidenav-button"
            className="hamburger"
            title="Open Menu"
            aria-label="Open Menu"
            onClick={() => {
              setIsOpen(!isOpen)
            }}>
            <svg
              viewBox="0 0 50 40"
              role="presentation"
              focusable="false"
              aria-label="trigram for heaven symbol">
              <line x1="0" x2="100%" y1="10%" y2="10%"></line>
              <line x1="0" x2="100%" y1="50%" y2="50%"></line>
              <line x1="0" x2="100%" y1="90%" y2="90%"></line>
            </svg>
          </a>
          <h1>Site Title</h1>
        </header>
        <article>{children}</article>
      </main>
    </div>
  )
}

export default Sidebar
