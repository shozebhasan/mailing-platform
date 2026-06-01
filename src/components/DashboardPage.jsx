'use client'


const metrics = [
  { label: 'Emails Sent', value: '14,250', sub: 'of 18,000 total', badge: '+1,200 today', badgeType: 'up', color: 'bg-orange-500' },
  { label: 'Opened', value: '4,830', sub: 'open rate', badge: '33.9%', badgeType: 'up', color: 'bg-green-500' },
  { label: 'Leads Generated', value: '921', sub: 'from clicks', badge: '+47 today', badgeType: 'up', color: 'bg-blue-600' },
  { label: 'Bounced', value: '183', sub: 'bounce rate', badge: '1.3%', badgeType: 'down', color: 'bg-yellow-500' },
]

const campaigns = [
  { name: 'Q3 Product Outreach', recipients: '18,000', date: 'Started today', status: 'Live' },
  { name: 'July Newsletter', recipients: '12,400', date: 'Jul 15', status: 'Done' },
  { name: 'Summer Promo Blast', recipients: '9,800', date: 'Jul 8', status: 'Paused' },
]

const hourlyBars = [
  { label: '9am', pct: 35, active: false },
  { label: '10am', pct: 55, active: false },
  { label: '11am', pct: 70, active: false },
  { label: '12pm', pct: 85, active: true },
  { label: '1pm', pct: 92, active: true },
  { label: '2pm', pct: 78, active: true },
  { label: '3pm', pct: 66, active: true },
  { label: '4pm', pct: 22, active: false },
  { label: '5pm', pct: 14, active: false },
  { label: '6pm', pct: 8, active: false },
]

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl font-sans border-(--border) bg-white p-5 ${className}`}>
      {children}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-3 sm:p-4 lg:p-0 font-sans">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-5 ">
        {metrics.map((item) => (
          <div key={item.label} className="relative overflow-hidden rounded-xl border-white bg-white p-5 ">
            <div className={`absolute right-0 top-0 h-full w-1 ${item.color}`} />
            <p className="text-xs text-gray-500 mb-2">{item.label}</p>
            <h3 className="text-2xl font-bold">{item.value}</h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <span className={`rounded-full px-2 py-1 ${item.badgeType === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {item.badge}
              </span>
              {item.sub}
            </div>
          </div>
        ))}
      </div>

      <Card className="mb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-bold">
            Active Campaign — <span className="text-blue-500">Q3 Product Outreach</span>
          </h2>
          <span className="text-sm text-gray-500">Started 9:00 AM · Ends 6:00 PM</span>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>14,250 sent</span>
          <span>3,750 remaining</span>
        </div>

        <div className="mt-2 h-2.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full w-[79%] rounded-full bg-blue-600" />
        </div>

        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span className="font-semibold text-blue-500">79% complete</span>
          <span>~2h 10m remaining</span>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-green-50 p-4 text-green-600 border-2">
            <div className="text-2xl font-bold">621</div>
            <div className="text-sm">Interested</div>
          </div>
          <div className="rounded-xl bg-red-50 p-4 text-red-600 border-2">
            <div className="text-2xl font-bold">300</div>
            <div className="text-sm">Not Interested</div>
          </div>
          <div className="rounded-xl bg-gray-100 p-4 text-gray-600 border-2">
            <div className="text-2xl font-bold">13,329</div>
            <div className="text-sm">No Response Yet</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">Emails sent per hour</h3>
            <span className="text-xs text-gray-500">Today</span>
          </div>

          <div className="flex h-32 items-end gap-1">
            {hourlyBars.map((bar) => (
              <div key={bar.label} className="flex flex-1 flex-col items-center justify-end gap-1 h-full">
                <div
                  className={`w-full rounded-t ${bar.active ? 'bg-blue-500' : 'bg-blue-300'}`}
                  style={{ height: `${bar.pct}%` }}
                />
                <span className="text-[10px] text-gray-500">{bar.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-bold">Lead outcomes</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span>Interested</span><strong>621</strong></div>
            <div className="flex justify-between"><span>Clicked</span><strong>300</strong></div>
            <div className="flex justify-between"><span>Bounced</span><strong>183</strong></div>
          </div>
        </Card>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold">Recent Campaigns</h3>
          <button className="rounded-lg border-gray-300 bg-gray-200 px-4 py-1 text-sm">View all</button>
        </div>

        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <div key={campaign.name} className="flex items-center gap-3 rounded-lg border-white bg-white p-3">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <div className="flex-1">
                <div className="font-medium">{campaign.name}</div>
                <div className="text-sm text-gray-500">
                  {campaign.recipients} recipients · {campaign.date}
                </div>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                {campaign.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}