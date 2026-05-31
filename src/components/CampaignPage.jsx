'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

//  Shared card 

function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px',
      ...style,
    }}>
      {children}
    </div>
  )
}

function CardTitle({ step, icon, children, extra }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      {step && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '22px', height: '22px', borderRadius: '50%',
          background: 'var(--orange)', color: '#fff',
          fontSize: '11px', fontWeight: 700, flexShrink: 0,
        }}>{step}</span>
      )}
      {icon}
      <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 600 }}>{children}</span>
      {extra && <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)' }}>{extra}</span>}
    </div>
  )
}

function CardSub({ children }) {
  return <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>{children}</p>
}

function Label({ children }) {
  return <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '5px' }}>{children}</label>
}

function Input({ ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      onFocus={e => { setFocused(true); props.onFocus && props.onFocus(e) }}
      onBlur={e => { setFocused(false); props.onBlur && props.onBlur(e) }}
      style={{
        width: '100%', padding: '8px 12px',
        border: `1px solid ${focused ? 'var(--orange)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        fontSize: '13.5px', fontFamily: 'DM Sans, sans-serif',
        color: 'var(--text-main)', background: 'var(--white)',
        outline: 'none', transition: 'border .15s',
        boxSizing: 'border-box',
        ...props.style,
      }}
    />
  )
}

function Textarea({ ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      onFocus={e => { setFocused(true); props.onFocus && props.onFocus(e) }}
      onBlur={e => { setFocused(false); props.onBlur && props.onBlur(e) }}
      style={{
        width: '100%', padding: '10px 12px',
        border: `1px solid ${focused ? 'var(--orange)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        fontSize: '13.5px', fontFamily: 'DM Sans, sans-serif',
        color: 'var(--text-main)', background: 'var(--white)',
        outline: 'none', resize: 'vertical', minHeight: '150px',
        lineHeight: 1.7, transition: 'border .15s',
        boxSizing: 'border-box',
        ...props.style,
      }}
    />
  )
}

//  SVG icons 

const icons = {
  clock: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  csv:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  mail:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  clip:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
  upload: (color = 'var(--text-hint)') => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  ),
  checkCircle: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  pdf:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  img:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  x:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  save: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  rocket: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  info: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  users: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  shuffle: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
  eye: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  check: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  layout: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
}

//  Email Templates 

const EMAIL_TEMPLATES = [
  {
    id: 1,
    name: 'Classic Newsletter',
    tag: 'Newsletter',
    tagColor: '#3b82f6',
    description: 'Clean header, body text, and a single CTA button. Best for announcements.',
    preview: {
      accent: '#f97316',
      layout: 'newsletter',
    },
  },
  {
    id: 2,
    name: 'Bold Promo',
    tag: 'Promotional',
    tagColor: '#ef4444',
    description: 'Full-width hero banner with a large discount badge and CTA. Great for sales.',
    preview: {
      accent: '#ef4444',
      layout: 'promo',
    },
  },
  {
    id: 3,
    name: 'Minimal Transactional',
    tag: 'Transactional',
    tagColor: '#6b7280',
    description: 'Plain text style, high deliverability. Ideal for receipts and notifications.',
    preview: {
      accent: '#6b7280',
      layout: 'minimal',
    },
  },
  {
    id: 4,
    name: 'Product Spotlight',
    tag: 'Product',
    tagColor: '#8b5cf6',
    description: 'Side-by-side product image and description with a buy button.',
    preview: {
      accent: '#8b5cf6',
      layout: 'product',
    },
  },
  {
    id: 5,
    name: 'Welcome Series',
    tag: 'Onboarding',
    tagColor: '#10b981',
    description: 'Warm welcome message with step-by-step getting started guide.',
    preview: {
      accent: '#10b981',
      layout: 'welcome',
    },
  },
  {
    id: 6,
    name: 'Re-engagement',
    tag: 'Retention',
    tagColor: '#f59e0b',
    description: 'We miss you style email with a special offer to win back inactive users.',
    preview: {
      accent: '#f59e0b',
      layout: 're-engage',
    },
  },
  {
    id: 7,
    name: 'Event Invite',
    tag: 'Event',
    tagColor: '#06b6d4',
    description: 'Elegant invite card layout with date, time, venue, and RSVP button.',
    preview: {
      accent: '#06b6d4',
      layout: 'event',
    },
  },
  {
    id: 8,
    name: 'Survey & Feedback',
    tag: 'Survey',
    tagColor: '#ec4899',
    description: 'Quick survey prompt with star rating graphic and a feedback link.',
    preview: {
      accent: '#ec4899',
      layout: 'survey',
    },
  },
  {
    id: 9,
    name: 'Dark Mode Promo',
    tag: 'Promotional',
    tagColor: '#ef4444',
    description: 'High-contrast dark background template with neon accents. Stands out in inbox.',
    preview: {
      accent: '#a78bfa',
      layout: 'dark',
    },
  },
  {
    id: 10,
    name: 'Digest / Roundup',
    tag: 'Digest',
    tagColor: '#14b8a6',
    description: 'Multi-section layout for weekly digests, blog roundups, or curated content.',
    preview: {
      accent: '#14b8a6',
      layout: 'digest',
    },
  },
]

//  Template preview SVG thumbnails 

function TemplateThumbnail({ layout, accent, selected }) {
  const bg = layout === 'dark' ? '#1e1b2e' : '#f9fafb'
  const textLight = layout === 'dark' ? '#4a4560' : '#e5e7eb'
  const textDark = layout === 'dark' ? '#7c6f9a' : '#d1d5db'
  const white = layout === 'dark' ? '#2d2845' : '#ffffff'

  const thumbnails = {
    newsletter: (
      <>
        {/* header bar */}
        <rect x="8" y="8" width="84" height="16" rx="3" fill={accent} />
        {/* logo text */}
        <rect x="34" y="13" width="32" height="5" rx="2" fill="white" opacity="0.7" />
        {/* hero image area */}
        <rect x="8" y="28" width="84" height="22" rx="2" fill={textDark} />
        <rect x="30" y="34" width="40" height="4" rx="1" fill={textLight} />
        {/* body lines */}
        <rect x="8" y="55" width="84" height="3" rx="1" fill={textDark} />
        <rect x="8" y="61" width="70" height="3" rx="1" fill={textDark} />
        <rect x="8" y="67" width="78" height="3" rx="1" fill={textDark} />
        {/* CTA */}
        <rect x="28" y="75" width="44" height="10" rx="3" fill={accent} />
        <rect x="36" y="78" width="28" height="4" rx="1" fill="white" opacity="0.8" />
        {/* footer */}
        <rect x="20" y="90" width="60" height="2" rx="1" fill={textLight} />
      </>
    ),
    promo: (
      <>
        {/* full hero */}
        <rect x="8" y="8" width="84" height="35" rx="3" fill={accent} />
        {/* big % badge */}
        <circle cx="50" cy="25" r="12" fill="white" opacity="0.2" />
        <rect x="42" y="21" width="16" height="8" rx="2" fill="white" opacity="0.6" />
        {/* tagline */}
        <rect x="18" y="48" width="64" height="5" rx="2" fill={textDark} />
        <rect x="28" y="56" width="44" height="3" rx="1" fill={textLight} />
        {/* CTA big */}
        <rect x="16" y="64" width="68" height="12" rx="4" fill={accent} />
        <rect x="30" y="68" width="40" height="4" rx="1" fill="white" opacity="0.8" />
        {/* small print */}
        <rect x="24" y="82" width="52" height="2" rx="1" fill={textLight} />
        <rect x="30" y="87" width="40" height="2" rx="1" fill={textLight} />
      </>
    ),
    minimal: (
      <>
        {/* tiny logo */}
        <rect x="8" y="10" width="24" height="5" rx="2" fill={textDark} />
        {/* divider */}
        <line x1="8" y1="20" x2="92" y2="20" stroke={textDark} strokeWidth="0.8" />
        {/* plain text lines */}
        <rect x="8" y="26" width="50" height="4" rx="1" fill={textDark} />
        <rect x="8" y="34" width="84" height="3" rx="1" fill={textLight} />
        <rect x="8" y="40" width="78" height="3" rx="1" fill={textLight} />
        <rect x="8" y="46" width="82" height="3" rx="1" fill={textLight} />
        <rect x="8" y="52" width="60" height="3" rx="1" fill={textLight} />
        {/* text CTA link */}
        <rect x="8" y="62" width="36" height="3" rx="1" fill={accent} />
        {/* signature */}
        <rect x="8" y="74" width="30" height="3" rx="1" fill={textDark} />
        <rect x="8" y="80" width="42" height="2" rx="1" fill={textLight} />
        {/* footer */}
        <line x1="8" y1="90" x2="92" y2="90" stroke={textLight} strokeWidth="0.8" />
        <rect x="28" y="93" width="44" height="2" rx="1" fill={textLight} />
      </>
    ),
    product: (
      <>
        {/* header */}
        <rect x="8" y="8" width="84" height="8" rx="2" fill={textDark} />
        <rect x="34" y="10" width="32" height="4" rx="1" fill={textLight} />
        {/* product image */}
        <rect x="8" y="20" width="38" height="38" rx="3" fill={textDark} />
        <circle cx="27" cy="36" r="10" fill={textLight} />
        {/* product info */}
        <rect x="52" y="22" width="40" height="5" rx="2" fill={textDark} />
        <rect x="52" y="30" width="40" height="2.5" rx="1" fill={textLight} />
        <rect x="52" y="35" width="36" height="2.5" rx="1" fill={textLight} />
        <rect x="52" y="40" width="38" height="2.5" rx="1" fill={textLight} />
        {/* price */}
        <rect x="52" y="47" width="20" height="5" rx="1" fill={accent} opacity="0.2" />
        <rect x="53" y="49" width="14" height="3" rx="1" fill={accent} />
        {/* buy btn */}
        <rect x="52" y="55" width="40" height="8" rx="3" fill={accent} />
        <rect x="60" y="58" width="24" height="3" rx="1" fill="white" opacity="0.8" />
        {/* footer */}
        <rect x="8" y="70" width="84" height="2" rx="1" fill={textLight} />
        <rect x="8" y="75" width="84" height="2" rx="1" fill={textLight} />
        <rect x="24" y="85" width="52" height="2" rx="1" fill={textLight} />
      </>
    ),
    welcome: (
      <>
        {/* wave header */}
        <rect x="8" y="8" width="84" height="24" rx="3" fill={accent} />
        <ellipse cx="50" cy="32" rx="46" ry="8" fill={bg} />
        {/* hi text */}
        <rect x="24" y="14" width="52" height="7" rx="2" fill="white" opacity="0.3" />
        {/* steps */}
        {[0,1,2].map(i => (
          <g key={i}>
            <circle cx="18" cy={50 + i * 14} r="5" fill={accent} opacity="0.8" />
            <rect cx="16" cy={48 + i * 14} width="6" height="4" fill="white" opacity="0.6" />
            <rect x="28" y={47 + i * 14} width="56" height="3" rx="1" fill={textDark} />
            <rect x="28" y={52 + i * 14} width="44" height="2" rx="1" fill={textLight} />
          </g>
        ))}
        {/* CTA */}
        <rect x="22" y="96" width="56" height="9" rx="3" fill={accent} />
        {/* footer */}
      </>
    ),
    're-engage': (
      <>
        {/* sad illustration area */}
        <rect x="8" y="8" width="84" height="28" rx="3" fill={accent} opacity="0.15" />
        <circle cx="50" cy="22" r="10" fill={accent} opacity="0.3" />
        <rect x="38" y="19" width="24" height="6" rx="2" fill={accent} opacity="0.5" />
        {/* miss you text */}
        <rect x="16" y="42" width="68" height="6" rx="2" fill={textDark} />
        <rect x="8" y="52" width="84" height="3" rx="1" fill={textLight} />
        <rect x="8" y="58" width="70" height="3" rx="1" fill={textLight} />
        {/* offer badge */}
        <rect x="22" y="66" width="56" height="14" rx="4" fill={accent} opacity="0.15" />
        <rect x="22" y="66" width="56" height="14" rx="4" stroke={accent} strokeWidth="1" fill="none" />
        <rect x="30" y="70" width="40" height="5" rx="1" fill={accent} />
        {/* CTA */}
        <rect x="16" y="85" width="68" height="10" rx="3" fill={accent} />
        <rect x="28" y="88" width="44" height="4" rx="1" fill="white" opacity="0.8" />
      </>
    ),
    event: (
      <>
        {/* top color band */}
        <rect x="8" y="8" width="84" height="12" rx="3" fill={accent} />
        {/* card white area */}
        <rect x="14" y="16" width="72" height="68" rx="4" fill={white} />
        {/* event title */}
        <rect x="22" y="24" width="56" height="7" rx="2" fill={textDark} />
        {/* date block */}
        <rect x="22" y="36" width="20" height="20" rx="3" fill={accent} opacity="0.15" />
        <rect x="22" y="36" width="20" height="20" rx="3" stroke={accent} strokeWidth="1" fill="none" />
        <rect x="24" y="38" width="16" height="4" rx="1" fill={accent} />
        <rect x="26" y="44" width="12" height="8" rx="1" fill={textDark} />
        {/* event info */}
        <rect x="48" y="38" width="34" height="3" rx="1" fill={textDark} />
        <rect x="48" y="44" width="28" height="2.5" rx="1" fill={textLight} />
        <rect x="48" y="49" width="30" height="2.5" rx="1" fill={textLight} />
        {/* RSVP */}
        <rect x="22" y="62" width="56" height="10" rx="3" fill={accent} />
        <rect x="38" y="65" width="24" height="4" rx="1" fill="white" opacity="0.8" />
        {/* footer */}
        <rect x="8" y="88" width="84" height="6" rx="2" fill={textLight} />
      </>
    ),
    survey: (
      <>
        {/* header */}
        <rect x="8" y="8" width="84" height="14" rx="3" fill={accent} opacity="0.2" />
        <rect x="20" y="12" width="60" height="5" rx="2" fill={accent} />
        {/* question */}
        <rect x="8" y="28" width="68" height="5" rx="2" fill={textDark} />
        <rect x="8" y="36" width="84" height="2.5" rx="1" fill={textLight} />
        <rect x="8" y="41" width="70" height="2.5" rx="1" fill={textLight} />
        {/* star ratings */}
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={26 + i * 10} cy="56" r="4" fill={i < 3 ? accent : textLight} />
        ))}
        {/* scale labels */}
        <rect x="8" y="64" width="24" height="2.5" rx="1" fill={textLight} />
        <rect x="68" y="64" width="24" height="2.5" rx="1" fill={textLight} />
        {/* feedback btn */}
        <rect x="20" y="72" width="60" height="10" rx="3" fill={accent} />
        <rect x="30" y="75" width="40" height="4" rx="1" fill="white" opacity="0.8" />
        {/* footer */}
        <rect x="28" y="88" width="44" height="2" rx="1" fill={textLight} />
        <rect x="32" y="93" width="36" height="2" rx="1" fill={textLight} />
      </>
    ),
    dark: (
      <>
        
        {/* glow header */}
        <rect x="8" y="8" width="84" height="20" rx="3" fill={accent} opacity="0.25" />
        <rect x="20" y="13" width="60" height="8" rx="2" fill={accent} opacity="0.7" />
        {/* neon line */}
        <line x1="8" y1="32" x2="92" y2="32" stroke={accent} strokeWidth="0.8" opacity="0.6" />
        {/* body */}
        <rect x="8" y="38" width="84" height="3" rx="1" fill="#4a4560" />
        <rect x="8" y="44" width="70" height="3" rx="1" fill="#4a4560" />
        <rect x="8" y="50" width="78" height="3" rx="1" fill="#4a4560" />
        {/* feature boxes */}
        {[0,1,2].map(i => (
          <rect key={i} x={8 + i * 28} y="60" width="24" height="18" rx="3" fill={accent} opacity={0.1 + i * 0.08} />
        ))}
        {/* neon CTA */}
        <rect x="20" y="84" width="60" height="10" rx="3" fill="none" stroke={accent} strokeWidth="1.5" />
        <rect x="28" y="87" width="44" height="4" rx="1" fill={accent} opacity="0.8" />
      </>
    ),
    digest: (
      <>
        {/* header */}
        <rect x="8" y="8" width="84" height="10" rx="2" fill={accent} />
        <rect x="24" y="11" width="52" height="4" rx="1" fill="white" opacity="0.7" />
        {/* section 1 */}
        <rect x="8" y="23" width="84" height="18" rx="2" fill={textDark} />
        <rect x="12" y="27" width="40" height="4" rx="1" fill={textLight} />
        <rect x="12" y="33" width="56" height="2.5" rx="1" fill={textLight} opacity="0.5" />
        {/* section 2 */}
        <rect x="8" y="45" width="84" height="18" rx="2" fill={textDark} />
        <rect x="12" y="49" width="40" height="4" rx="1" fill={textLight} />
        <rect x="12" y="55" width="56" height="2.5" rx="1" fill={textLight} opacity="0.5" />
        {/* section 3 */}
        <rect x="8" y="67" width="84" height="18" rx="2" fill={textDark} />
        <rect x="12" y="71" width="40" height="4" rx="1" fill={textLight} />
        <rect x="12" y="77" width="56" height="2.5" rx="1" fill={textLight} opacity="0.5" />
        {/* footer */}
        <rect x="24" y="90" width="52" height="2" rx="1" fill={textLight} />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', borderRadius: '6px', display: 'block' }}
    >
      <rect width="100" height="100" fill={bg} rx="4" />
      {thumbnails[layout] || null}
      {selected && (
        <>
          <rect width="100" height="100" rx="4" fill={accent} opacity="0.08" />
          <rect width="100" height="100" rx="4" fill="none" stroke={accent} strokeWidth="2.5" />
        </>
      )}
    </svg>
  )
}

// Template card

function TemplateCard({ template, selected, onToggle }) {
  const [hovered, setHovered] = useState(false)
  const isActive = selected || hovered

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="template-card"
      style={{
        border: `1.5px solid ${selected ? template.preview.accent : hovered ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color .15s, box-shadow .15s, transform .1s',
        background: 'var(--white)',
        transform: hovered && !selected ? 'translateY(-1px)' : 'none',
        boxShadow: selected
          ? `0 0 0 3px ${template.preview.accent}22`
          : hovered
            ? '0 4px 16px rgba(0,0,0,0.07)'
            : 'none',
        position: 'relative',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100%',
        aspectRatio: '1 / 1',
        background: 'var(--bg)',
        padding: '8px',
        boxSizing: 'border-box',
      }}>
        <TemplateThumbnail
          layout={template.preview.layout}
          accent={template.preview.accent}
          selected={selected}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 600, padding: '2px 7px',
            borderRadius: '99px',
            background: template.tagColor + '18',
            color: template.tagColor,
            letterSpacing: '0.02em',
          }}>
            {template.tag}
          </span>
          {selected && (
            <span style={{
              marginLeft: 'auto',
              width: '18px', height: '18px',
              borderRadius: '50%',
              background: template.preview.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          )}
        </div>
        <div style={{ fontWeight: 600, fontSize: '12.5px', fontFamily: 'Syne, sans-serif', marginBottom: '3px', color: 'var(--text-main)' }}>
          {template.name}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {template.description}
        </div>
      </div>
    </div>
  )
}

//text toolbar buttons

const toolbarBtns = [
  { label: 'B', style: { fontWeight: 700 } },
  { label: 'I', style: { fontStyle: 'italic' } },
  { label: 'U', style: { textDecoration: 'underline' } },
  { label: 'H1', style: {} },
  { label: 'H2', style: {} },
  {
    label: null, style: {},
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    title: 'List',
  },
  {
    label: null, style: {},
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    title: 'Link',
  },
  {
    label: null, style: {},
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    title: 'Image',
  },
]

function ToolbarBtn({ label, icon, title, style: btnStyle }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '4px 9px', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        background: hovered ? 'var(--orange-light)' : 'var(--white)',
        color: hovered ? 'var(--orange)' : 'var(--text-muted)',
        borderColor: hovered ? 'var(--orange-mid)' : 'var(--border)',
        cursor: 'pointer', fontSize: '12px',
        fontFamily: 'DM Sans, sans-serif',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minWidth: '28px', transition: 'all .12s',
        ...btnStyle,
      }}
    >
      {label || icon}
    </button>
  )
}

// Attachment item

function AttachItem({ name, size, onRemove }) {
  const ext = name.split('.').pop().toLowerCase()
  const fileIcon = ext === 'pdf' ? icons.pdf : icons.img
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '9px',
      padding: '8px 12px', background: 'var(--bg)',
      borderRadius: 'var(--radius-md)', fontSize: '13px',
    }}>
      {fileIcon}
      <span style={{ flex: 1, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>{size}</span>
      <button onClick={onRemove} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--text-hint)', display: 'flex', padding: '2px',
        borderRadius: '4px', transition: 'color .12s',
      }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-hint)'}
      >
        {icons.x}
      </button>
    </div>
  )
}

// Demo files

const fakeFiles = [
  { name: 'promo-deck.pdf',   size: '3.1 MB' },
  { name: 'data-sheet.pdf',   size: '1.4 MB' },
  { name: 'brand-logo.png',   size: '220 KB' },
  { name: 'offer-letter.pdf', size: '890 KB' },
]

//Main export

export default function CampaignPage() {
  const router = useRouter()

  const [startTime, setStartTime] = useState('2024-08-01T09:00')
  const [endTime,   setEndTime]   = useState('2024-08-01T18:00')
  const [csvFile,   setCsvFile]   = useState(null)
  const [hovering,  setHovering]  = useState(false)
  const [subject,   setSubject]   = useState('')
  const [body,      setBody]      = useState('')
  const [attachments, setAttachments] = useState([
    { name: 'product-brochure.pdf', size: '2.4 MB' },
    { name: 'banner-image.jpg',     size: '540 KB' },
  ])
  const [fakeIdx, setFakeIdx] = useState(0)
  const [selectedTemplates, setSelectedTemplates] = useState([1, 3])
  const fileInputRef = useRef(null)

  const getInterval = (count) => {
    if (!startTime || !endTime || !count) return null
    const ms = new Date(endTime) - new Date(startTime)
    if (ms <= 0) return null
    const sec = ms / 1000
    const interval = (sec / count).toFixed(1)
    const hours = Math.round(ms / 3600000)
    return `1 email every ${interval}s · ${count.toLocaleString()} total over ${hours}h window`
  }

  const handleCsvClick = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const count = Math.floor(Math.random() * 9000) + 10000
    setCsvFile({ name: file.name, count })
  }

  const removeAttachment = (idx) => {
    setAttachments(prev => prev.filter((_, i) => i !== idx))
  }

  const addFakeAttachment = () => {
    if (fakeIdx >= fakeFiles.length) return
    setAttachments(prev => [...prev, fakeFiles[fakeIdx]])
    setFakeIdx(i => i + 1)
  }

  const toggleTemplate = (id) => {
    setSelectedTemplates(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedTemplates(EMAIL_TEMPLATES.map(t => t.id))
  }

  const handleClearAll = () => {
    setSelectedTemplates([])
  }

  const handleLaunch = () => {
    router.push('/dashboard')
  }

  const csvPct = csvFile ? Math.round((csvFile.count / 20000) * 100) : 0
  const intervalText = csvFile ? getInterval(csvFile.count) : null
  const selectedCount = selectedTemplates.length

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

      {/*Schedule Time*/}
      <Card>
        <CardTitle step="1" icon={icons.clock}>Schedule Time</CardTitle>
        <CardSub>Define start and end time, emails will be evenly distributed across this window.</CardSub>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <Label>Start Time</Label>
            <Input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>
          <div>
            <Label>End Time</Label>
            <Input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
          </div>
        </div>
        {intervalText && (
          <div style={{
            marginTop: '12px', padding: '9px 12px',
            background: 'var(--orange-light)', borderRadius: 'var(--radius-md)',
            fontSize: '12.5px', color: 'var(--orange-dark)',
            display: 'flex', alignItems: 'center', gap: '7px',
          }}>
            {icons.info} {intervalText}
          </div>
        )}
      </Card>

      {/*CSV Upload*/}
      <Card>
        <CardTitle step="2" icon={icons.csv}>Upload Recipients</CardTitle>
        <CardSub>Upload a CSV with email addresses. Maximum 20,000 recipients per campaign.</CardSub>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div
          onClick={handleCsvClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{
            border: `1.5px dashed ${hovering || csvFile ? 'var(--orange)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '24px 16px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border .15s, background .15s',
            background: hovering ? 'var(--orange-light)' : csvFile ? 'var(--success-bg)' : 'var(--bg)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            {csvFile ? icons.checkCircle : icons.upload(hovering ? 'var(--orange)' : 'var(--text-hint)')}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {csvFile ? (
              <>
                <strong style={{ color: 'var(--text-main)' }}>{csvFile.name}</strong>
                <br />
                <span style={{ fontSize: '11.5px' }}>Click to replace</span>
              </>
            ) : (
              <>
                <strong style={{ color: 'var(--text-main)' }}>Click to upload</strong>{' or drag & drop'}
                <br />
                <span style={{ fontSize: '11.5px' }}>.CSV files only</span>
              </>
            )}
          </div>
        </div>

        {csvFile && (
          <>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              marginTop: '12px', padding: '9px 12px',
              background: 'var(--orange-light)', borderRadius: 'var(--radius-md)',
              fontSize: '13px', fontWeight: 500, color: 'var(--orange-dark)',
            }}>
              {icons.users}
              <span>{csvFile.count.toLocaleString()} recipients loaded</span>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--orange)' }}>Max: 20,000</span>
            </div>
            <div style={{ height: '5px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{
                height: '100%', width: csvPct + '%',
                background: csvPct > 90 ? 'var(--danger)' : 'var(--orange)',
                borderRadius: '99px', transition: 'width .4s',
              }} />
            </div>
          </>
        )}
      </Card>

      {/*Compose Email*/}
      <Card style={{ gridColumn: '1 / -1' }}>
        <CardTitle step="3" icon={icons.mail}>Compose Email</CardTitle>
        <CardSub>Write your subject line and email body. Use the toolbar for formatting options.</CardSub>

        <div style={{ marginBottom: '14px' }}>
          <Label>Subject Line</Label>
          <Input
            type="text"
            placeholder="e.g. Exclusive offer just for you 🎁"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Label>Email Body</Label>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {toolbarBtns.map((btn, i) => (
              <ToolbarBtn key={i} {...btn} />
            ))}
            <button style={{
              marginLeft: 'auto',
              padding: '4px 12px',
              border: '1px solid var(--orange-mid)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--orange-light)',
              color: 'var(--orange)',
              cursor: 'pointer', fontSize: '12px', fontWeight: 500,
              fontFamily: 'DM Sans, sans-serif',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M8 9V5a2 2 0 0 1 4 0v4"/></svg>
              Insert CTA Button
            </button>
          </div>
          <Textarea
            placeholder={`Write your email content here...\n\nHi {{first_name}},\n\nWe wanted to share something exciting with you...`}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        {/*Template Selector*/}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '20px',
        }}>
          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {icons.layout}
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>
                Email Templates
              </span>
              {selectedCount > 0 && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: '20px', height: '20px', padding: '0 6px',
                  borderRadius: '99px', background: 'var(--orange)',
                  color: '#fff', fontSize: '11px', fontWeight: 700,
                }}>
                  {selectedCount}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              <button
                onClick={handleSelectAll}
                style={{
                  padding: '4px 10px', fontSize: '11.5px', fontWeight: 500,
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg)', color: 'var(--text-muted)',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  transition: 'all .12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--orange)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                Select All
              </button>
              <button
                onClick={handleClearAll}
                style={{
                  padding: '4px 10px', fontSize: '11.5px', fontWeight: 500,
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg)', color: 'var(--text-muted)',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  transition: 'all .12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--danger)'; e.currentTarget.style.color = 'var(--danger)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                Clear
              </button>
            </div>
          </div>

          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
            Select one or more templates. Your email content will be distributed randomly across all selected templates to improve inbox deliverability and avoid spam filters.
          </p>

          {/* Shuffle info banner */}
          {selectedCount > 1 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '9px 12px', marginBottom: '14px',
              background: 'var(--orange-light)', borderRadius: 'var(--radius-md)',
              fontSize: '12.5px', color: 'var(--orange-dark)',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', color: 'var(--orange)' }}>{icons.shuffle}</span>
              <span>
                Recipients will be <strong>randomly assigned</strong> across{' '}
                <strong>{selectedCount} templates</strong> — each getting roughly{' '}
                <strong>{Math.round(100 / selectedCount)}%</strong> of the send volume.
              </span>
            </div>
          )}

          {/* Template grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
          }}>
            {EMAIL_TEMPLATES.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                selected={selectedTemplates.includes(template.id)}
                onToggle={() => toggleTemplate(template.id)}
              />
            ))}
          </div>

          {/* No template warning */}
          {selectedCount === 0 && (
            <div style={{
              marginTop: '12px', padding: '9px 12px',
              background: '#fef2f2', borderRadius: 'var(--radius-md)',
              fontSize: '12.5px', color: '#dc2626',
              display: 'flex', alignItems: 'center', gap: '7px',
              border: '1px solid #fecaca',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Please select at least one template to continue.
            </div>
          )}
        </div>
      </Card>

      {/*Attachments*/}
      <Card style={{ gridColumn: '1 / -1' }}>
        <CardTitle icon={icons.clip} extra="Upload · PDF, JPG, PNG">Attachments</CardTitle>
        <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {attachments.map((a, i) => (
            <AttachItem key={i} {...a} onRemove={() => removeAttachment(i)} />
          ))}
        </div>
        <button
          onClick={addFakeAttachment}
          style={{
            marginTop: '12px', width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            padding: '9px', fontSize: '13px', fontWeight: 400,
            background: 'transparent', color: 'var(--text-muted)',
            border: '1.5px dashed var(--border)', borderRadius: 'var(--radius-md)',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            transition: 'border .15s, color .15s, background .15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--orange)'
            e.currentTarget.style.color = 'var(--orange)'
            e.currentTarget.style.background = 'var(--orange-light)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          {icons.plus} Add Attachment
        </button>
      </Card>

      {/*Launch bar */}
      <Card style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 22px' }}>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 600 }}>Ready to launch?</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
            {selectedCount > 0
              ? `Emails will be sent using ${selectedCount} template${selectedCount > 1 ? 's' : ''} on your defined schedule.`
              : 'Select at least one template before launching.'}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button style={{
            background: 'transparent', color: 'var(--text-main)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            padding: '8px 16px', fontSize: '13px', fontWeight: 400,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px',
            fontFamily: 'DM Sans, sans-serif', transition: 'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {icons.save} Save Draft
          </button>
          <button
            onClick={handleLaunch}
            disabled={selectedCount === 0}
            style={{
              background: selectedCount === 0 ? 'var(--border)' : 'var(--orange)',
              color: selectedCount === 0 ? 'var(--text-muted)' : '#fff',
              border: 'none', borderRadius: 'var(--radius-md)',
              padding: '8px 20px', fontSize: '13px', fontWeight: 500,
              cursor: selectedCount === 0 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '7px',
              fontFamily: 'DM Sans, sans-serif', transition: 'background .15s',
            }}
            onMouseEnter={e => { if (selectedCount > 0) e.currentTarget.style.background = 'var(--orange-dark)' }}
            onMouseLeave={e => { if (selectedCount > 0) e.currentTarget.style.background = 'var(--orange)' }}
          >
            {icons.rocket} Launch Campaign
          </button>
        </div>
      </Card>

    </div>
  )
}