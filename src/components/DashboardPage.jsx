'use client'

import { useState, useEffect } from 'react'

//  Responsive hook 
function useBreakpoint() {
  const [width, setWidth] = useState(1200) // always start with desktop on server

  useEffect(() => {
    setWidth(window.innerWidth) // then correct on client after hydration
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024
  return { width, isMobile, isTablet, isDesktop: width >= 1024 }
}

//  Tiny reusable pieces 

function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 600 }}>
      {children}
    </span>
  )
}

//  Metric cards 

const metrics = [
  {
    label: 'Emails Sent',
    value: '14,250',
    sub: 'of 18,000 total',
    badge: '+1,200 today',
    badgeType: 'up',
    accentColor: 'var(--orange)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  },
  {
    label: 'Opened',
    value: '4,830',
    sub: 'open rate',
    badge: '33.9%',
    badgeType: 'up',
    accentColor: 'var(--success)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    label: 'Leads Generated',
    value: '921',
    sub: 'from clicks',
    badge: '+47 today',
    badgeType: 'up',
    accentColor: '#2C74E0',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    label: 'Bounced',
    value: '183',
    sub: 'bounce rate',
    badge: '1.3%',
    badgeType: 'down',
    accentColor: 'var(--warning)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
]

function MetricCard({ label, value, sub, badge, badgeType, accentColor, icon }) {
  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* accent stripe */}
      <span style={{
        position: 'absolute', top: 0, right: 0,
        width: '3px', height: '100%',
        background: accentColor,
        borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 500 }}>
        {icon} {label}
      </div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>{value}</div>
      <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
        <span style={{
          background: badgeType === 'up' ? 'var(--success-bg)' : 'var(--danger-bg)',
          color: badgeType === 'up' ? 'var(--success)' : 'var(--danger)',
          padding: '1px 8px', borderRadius: '99px', fontWeight: 500,
        }}>{badge}</span>
        {sub}
      </div>
    </div>
  )
}

//  Bar chart (hourly) 

const hourlyBars = [
  { label: '9am',  pct: 35, active: false },
  { label: '10am', pct: 55, active: false },
  { label: '11am', pct: 70, active: false },
  { label: '12pm', pct: 85, active: true  },
  { label: '1pm',  pct: 92, active: true  },
  { label: '2pm',  pct: 78, active: true  },
  { label: '3pm',  pct: 66, active: true  },
  { label: '4pm',  pct: 22, active: false },
  { label: '5pm',  pct: 14, active: false },
  { label: '6pm',  pct: 8,  active: false },
]

function BarChart({ compact }) {
  return (
    <div style={{ display: 'flex', gap: compact ? '4px' : '6px', alignItems: 'flex-end', height: compact ? '100px' : '130px' }}>
      {hourlyBars.map(bar => (
        <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', height: '100%', justifyContent: 'flex-end' }}>
          <div style={{
            width: '100%',
            height: bar.pct + '%',
            borderRadius: '5px 5px 0 0',
            background: bar.active ? 'var(--orange)' : 'var(--orange-mid)',
            opacity: bar.pct < 20 ? 0.4 : 1,
            minHeight: '4px',
            transition: 'height .3s',
          }} />
          <span style={{ fontSize: compact ? '9px' : '10px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{bar.label}</span>
        </div>
      ))}
    </div>
  )
}

//  Donut chart (SVG) 

function DonutChart({ stacked }) {
  const total = 251.2
  const orangeLen = Math.round(total * 0.67)
  const greenLen  = Math.round(total * 0.33)

  return (
    <div style={{
      display: 'flex',
      flexDirection: stacked ? 'row' : 'row',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap',
    }}>
      <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="40" fill="none" stroke="var(--border)" strokeWidth="14" />
          <circle cx="55" cy="55" r="40" fill="none" stroke="var(--orange)" strokeWidth="14"
            strokeDasharray={`${orangeLen} ${total - orangeLen}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90 55 55)" />
          <circle cx="55" cy="55" r="40" fill="none" stroke="var(--success)" strokeWidth="14"
            strokeDasharray={`${greenLen} ${total - greenLen}`}
            strokeDashoffset={-orangeLen}
            strokeLinecap="round"
            transform="rotate(-90 55 55)" />
        </svg>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>921</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>total</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { dot: 'var(--orange)',  label: 'Interested', val: '621' },
          { dot: 'var(--success)', label: 'Clicked',    val: '300' },
          { dot: 'var(--border)',  label: 'Bounced',    val: '183' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
            <span>{item.label}</span>
            <strong style={{ marginLeft: 'auto', paddingLeft: '12px', color: 'var(--text-main)', fontWeight: 600 }}>{item.val}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

//  Campaign list 

const campaigns = [
  { name: 'Q3 Product Outreach', recipients: '18,000', date: 'Started today', status: 'live'   },
  { name: 'July Newsletter',      recipients: '12,400', date: 'Jul 15',        status: 'done'   },
  { name: 'Summer Promo Blast',   recipients: '9,800',  date: 'Jul 8',         status: 'paused' },
]

const statusStyles = {
  live:   { dot: 'var(--success)',   badge: { bg: 'var(--success-bg)',  color: 'var(--success)'   }, label: 'Live'   },
  done:   { dot: 'var(--text-hint)', badge: { bg: 'var(--bg)',          color: 'var(--text-muted)' }, label: 'Done'   },
  paused: { dot: 'var(--warning)',   badge: { bg: 'var(--warning-bg)',  color: 'var(--warning)'   }, label: 'Paused' },
}

function CampaignRow({ name, recipients, date, status }) {
  const s = statusStyles[status]
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '12px 14px',
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
    }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 500, fontSize: '13.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>{recipients} recipients · {date}</div>
      </div>
      <span style={{
        fontSize: '11px', padding: '3px 10px', borderRadius: '99px', fontWeight: 500, flexShrink: 0,
        background: s.badge.bg, color: s.badge.color,
      }}>{s.label}</span>
    </div>
  )
}

//  Main export 

export default function DashboardPage() {
  const { isMobile, isTablet } = useBreakpoint()

  const metricsColumns = isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'
  const chartsColumns  = isMobile || isTablet ? '1fr' : '2fr 1fr'

  return (
    <div style={{ padding: isMobile ? '12px' : isTablet ? '16px' : undefined }}>

      {/*  Metric cards  */}
      <div style={{ display: 'grid', gridTemplateColumns: metricsColumns, gap: isMobile ? '10px' : '16px', marginBottom: isMobile ? '14px' : '20px' }}>
        {metrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      {/*  Live send progress  */}
      <Card style={{ marginBottom: isMobile ? '12px' : '16px' }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          gap: '6px',
        }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%', background: 'var(--success)',
              display: 'inline-block', animation: 'livePulse 1.5s infinite',
            }} />
            Active Campaign — <span style={{ color: 'var(--orange)' }}>Q3 Product Outreach</span>
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Started 9:00 AM · Ends 6:00 PM</span>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <span>14,250 sent</span><span>3,750 remaining</span>
        </div>
        <div style={{ height: '10px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: '79%',
            background: 'linear-gradient(90deg, #2563eb, #2563eb)',
            borderRadius: '99px',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span style={{ color: 'var(--orange)', fontWeight: 600 }}>79% complete</span>
          <span>~2h 10m remaining</span>
        </div>

        {/* Outcome pills */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '10px',
          marginTop: '14px',
        }}>
          {[
            { label: 'Interested',      val: '621',    bg: 'var(--success-bg)', color: 'var(--success)' },
            { label: 'Not Interested',  val: '300',    bg: 'var(--danger-bg)',  color: 'var(--danger)'  },
            { label: 'No Response Yet', val: '13,329', bg: 'var(--bg)',         color: 'var(--text-muted)' },
          ].map(pill => (
            <div key={pill.label} style={{
              flex: 1,
              padding: isMobile ? '10px 14px' : '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: pill.bg, color: pill.color,
              display: isMobile ? 'flex' : 'block',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: isMobile ? '20px' : '22px', fontWeight: 700, lineHeight: 1.2 }}>{pill.val}</div>
              <div style={{ fontSize: '12px', fontWeight: 500, marginTop: isMobile ? '0' : '2px' }}>{pill.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/*  Charts row  */}
      <div style={{ display: 'grid', gridTemplateColumns: chartsColumns, gap: isMobile ? '12px' : '16px', marginBottom: isMobile ? '16px' : '20px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <SectionTitle>Emails sent per hour</SectionTitle>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Today</span>
          </div>
          <BarChart compact={isMobile} />
        </Card>

        <Card>
          <div style={{ marginBottom: '14px' }}>
            <SectionTitle>Lead outcomes</SectionTitle>
          </div>
          <DonutChart />
        </Card>
      </div>

      {/*  Recent campaigns  */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <SectionTitle>Recent Campaigns</SectionTitle>
          <button style={{
            background: 'transparent', color: 'var(--text-main)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            padding: '5px 14px', fontSize: '12px', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}>View all</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {campaigns.map(c => <CampaignRow key={c.name} {...c} />)}
        </div>
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