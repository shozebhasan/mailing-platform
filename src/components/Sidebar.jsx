'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// SVG icons
const icons = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  send: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  chevron: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  close: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
}

function NavSection({ label, children }) {
  return (
    <div className="mb-5">
      <div className="px-4.5 mb-1 text-[10.5px] font-medium tracking-widest uppercase text-gray-400">
        {label}
      </div>
      {children}
    </div>
  )
}

function NavLink({ href, icon, label, active, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="block">
      <div
        className={`font-sans relative flex items-center gap-2.5 px-3 py-2.25 mx-2.5 rounded-md text-[13.5px] transition-colors
        ${active
          ? 'text-blue-500 bg-blue-50 font-medium'
          : 'text-gray-500 font-normal hover:bg-gray-50'
        }`}
      >
        {active && (
          <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0.75 h-4.5 bg-blue-500 rounded-r-md" />
        )}
        <span className="flex items-center">{icon}</span>
        {label}
      </div>
    </Link>
  )
}

export function SidebarPanel({ onClose }) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: icons.dashboard, label: 'Dashboard' },
    { href: '/campaigns', icon: icons.send, label: 'Campaigns' },
  ]

  return (
    <aside className="w-(--sidebar-w) shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen overflow-y-auto">
      
      {/* Brand */}
      <div className="px-4.5 pt-5 flex items-center gap-2.5 mb-7 font-sans">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>

        <span className=" text-[17px] font-bold tracking-tight flex-1">
          Proto<span className="text-blue-500">type</span>
        </span>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            {icons.close}
          </button>
        )}
      </div>

      {/* Main nav */}
      <NavSection label="Main">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={pathname === item.href}
            onClick={onClose}
          />
        ))}
      </NavSection>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center gap-2.5 p-2 rounded-md cursor-pointer hover:bg-gray-50 transition">
          
          <div className="w-7.5 h-7.5 rounded-full bg-orange-200 flex items-center justify-center text-[11px] font-bold text-orange-700 shrink-0">
            SH
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-gray-800 truncate">
              Shozeb Hasan
            </div>
          </div>

          <span className="text-gray-400">
            {icons.chevron}
          </span>
        </div>
      </div>
    </aside>
  )
}

export default function Sidebar() {
  return <SidebarPanel />
}