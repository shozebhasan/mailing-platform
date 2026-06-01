'use client'

import './globals.css'
import { useState } from 'react'
import { SidebarPanel } from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
        <div className="hidden lg:block">
          <SidebarPanel />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/35 lg:hidden"
              style={{ animation: 'fadeIn .2s ease' }}
            />
            <div 
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
              style={{ animation: 'slideIn .22s ease' }}
            >
              <SidebarPanel onClose={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <div className="sticky top-0 z-30 shrink-0">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
          </div>
          
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
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