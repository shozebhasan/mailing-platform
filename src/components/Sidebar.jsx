'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// SVG icons
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
  chevron: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  close: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
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

function NavLink({ href, icon, label, active, onClick }) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }} onClick={onClick}>
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

// The actual sidebar panel — used both inline (desktop) and in overlay (mobile)
export function SidebarPanel({ onClose }) {
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
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: 700, letterSpacing: '-0.3px', flex: 1 }}>
          Proto<span style={{ color: 'var(--orange)' }}>type</span>
        </span>
        {/* Close button — only visible when rendered as overlay */}
        {onClose && (
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center',
          }}>
            {icons.close}
          </button>
        )}
      </div>

      {/* Main nav */}
      <NavSection label="Main">
        {navItems.map(item => (
          <NavLink key={item.href} {...item} active={pathname === item.href} onClick={onClose} />
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
export default function Sidebar() {
  return <SidebarPanel />
}