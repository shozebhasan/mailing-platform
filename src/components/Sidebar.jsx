'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navMain = [
  { href: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { href: '/campaigns', icon: '✉', label: 'Campaigns' },
]

function NavItem({ href, label, svgIcon, active }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 12px',
        margin: '1px 10px',
        borderRadius: 'var(--radius-md)',
        color: active ? 'var(--orange)' : 'var(--text-muted)',
        background: active ? 'var(--orange-light)' : 'transparent',
        fontWeight: active ? '500' : '400',
        fontSize: '13.5px',
        cursor: 'pointer',
        transition: 'background .15s, color .15s',
        position: 'relative',
      }}
        onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--text-main)' } }}
        onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' } }}
      >
        {active && (
          <span style={{
            position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)',
            width: '3px', height: '18px', background: 'var(--orange)', borderRadius: '0 3px 3px 0'
          }} />
        )}
        <span style={{ fontSize: '16px', lineHeight: 1 }}>{svgIcon}</span>
        {label}
      </div>
    </Link>
  )
}

// SVG icons — inline so no icon library needed
const icons = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  send: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  template: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  ),
  chart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  chevron: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
}

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: icons.dashboard, label: 'Dashboard' },
    { href: '/campaigns', icon: icons.send,      label: 'Campaigns' },
  ]
  

  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      flexShrink: 0,
      background: 'var(--white)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflowY: 'auto',
    }}>
      {/* Brand */}
      <div style={{ padding: '20px 18px 0', display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '28px' }}>
        <div style={{
          width: '32px', height: '32px', background: 'var(--orange)',
          borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: 700, letterSpacing: '-0.3px' }}>
          Proto<span style={{ color: 'var(--orange)' }}>type</span>
        </span>
      </div>

      {/* Main nav */}
      <NavSection label="Main">
        {navItems.map(item => (
          <NavLink key={item.href} {...item} active={pathname === item.href} />
        ))}
      </NavSection>

      

      

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
          transition: 'background .15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: 'var(--orange-mid)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontFamily: 'Syne, sans-serif',
            fontWeight: 700, fontSize: '11px', color: 'var(--orange-dark)', flexShrink: 0,
          }}>SH</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>Shozeb Hasan</div>
            
          </div>
          <span style={{ color: 'var(--text-hint)' }}>{icons.chevron}</span>
        </div>
      </div>
    </aside>
  )
}

function NavSection({ label, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        fontSize: '10.5px', fontWeight: 500, color: 'var(--text-hint)',
        letterSpacing: '.08em', textTransform: 'uppercase',
        padding: '0 18px', marginBottom: '4px',
      }}>{label}</div>
      {children}
    </div>
  )
}

function NavLink({ href, icon, label, active }) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 12px', margin: '1px 10px',
        borderRadius: 'var(--radius-md)',
        color: active ? 'var(--orange)' : 'var(--text-muted)',
        background: active ? 'var(--orange-light)' : 'transparent',
        fontWeight: active ? 500 : 400,
        fontSize: '13.5px',
        cursor: 'pointer',
        transition: 'background .15s, color .15s',
        position: 'relative',
      }}>
        {active && (
          <span style={{
            position: 'absolute', left: '-10px', top: '50%',
            transform: 'translateY(-50%)',
            width: '3px', height: '18px',
            background: 'var(--orange)', borderRadius: '0 3px 3px 0',
          }} />
        )}
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
        {label}
      </div>
    </Link>
  )
}