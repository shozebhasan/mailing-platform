'use client'

import './globals.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <Topbar />
          <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}