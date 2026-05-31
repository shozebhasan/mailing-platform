'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import { SidebarPanel } from '../components/Sidebar'
import Topbar from '../components/Topbar'

const MOBILE_BREAKPOINT = 768

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(null)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      // Auto-close sidebar when resizing to mobile
      if (mobile) setSidebarOpen(false)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobile, sidebarOpen])

  if (isMobile === null) return (
  <html lang="en">
    <body style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </main>
      </div>
    </body>
  </html>
)

  return (
    <html lang="en">
      <body style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>

        {/* ── Desktop: static sidebar ── */}
        {!isMobile && <SidebarPanel />}

        {/* ── Mobile: backdrop overlay ── */}
        {isMobile && sidebarOpen && (
          <>
            {/* Scrim */}
            <div
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: 'rgba(0,0,0,0.35)',
                animation: 'fadeIn .2s ease',
              }}
            />
            {/* Drawer */}
            <div style={{
              position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
              animation: 'slideIn .22s ease',
            }}>
              <SidebarPanel onClose={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* ── Main content area ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <Topbar
            onMenuClick={isMobile ? () => setSidebarOpen(true) : undefined}
            showMenu={isMobile}
          />
          <main style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px' : '24px' }}>
            {children}
          </main>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to   { transform: translateX(0); }
          }
        `}</style>
      </body>
    </html>
  )
}