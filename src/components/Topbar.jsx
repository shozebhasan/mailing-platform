'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/campaigns': 'Add New Campaign',
  '/templates': 'Templates',
  '/analytics': 'Analytics',
}

export default function Topbar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'MailFlow Pro'

  return (
    <div style={{
      height: 'var(--topbar-h)',
      background: 'var(--white)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
      flexShrink: 0,
    }}>
      <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 600 }}>{title}</span>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Live indicator */}
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'var(--success)', display: 'inline-block',
            animation: 'livePulse 1.5s infinite',
          }} />
          Live
        </span>
        

        {/* New Campaign button */}
        <Link href="/campaigns" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'var(--orange)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius-md)',
            padding: '7px 16px', fontSize: '13px', fontWeight: 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: 'DM Sans, sans-serif', transition: 'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--orange-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Campaign
          </button>
        </Link>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  )
}