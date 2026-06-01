'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/campaigns': 'Add New Campaign',
}

const hamburgerIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export default function Topbar({ showMenu = false, onMenuClick }) {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'MailFlow Pro'

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 sm:px-6 gap-4 shrink-0">

      {/* hamburger*/}
      <button
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="lg:hidden flex items-center justify-center p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition"
      >
        {hamburgerIcon}
      </button>

      {/* Page Title */}
      <span className="font-syne text-base font-semibold text-gray-900">
        {title}
      </span>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-3">

        {/* Live Indicator */}
        <span className="text-xs text-gray-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </span>

        {/* New Campaign Button */}
        <Link href="/campaigns">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-1.5 text-sm font-medium flex items-center gap-1.5 transition">
            
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>

            New Campaign
          </button>
        </Link>

      </div>
    </div>
  )
}