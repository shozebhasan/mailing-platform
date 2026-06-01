"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function Card({ children, style }) {
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "22px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardTitle({ step, icon, children, extra }) {
  return (
    <div className="mb-1 flex flex-wrap items-center gap-2">
      {step && (
        <span className="inline-flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white">
          {step}
        </span>
      )}

      {icon}

      <span className=" text-sm font-semibold">{children}</span>

      {extra && <span className="ml-auto text-xs text-muted">{extra}</span>}
    </div>
  );
}

function CardSub({ children }) {
  return (
    <p className="mb-4 text-[12.5px] text-(--text-muted)">{children}</p>
  );
}

function Label({ children }) {
  return (
    <label className="mb-1.25 block text-[12.5px] font-medium text-(--text-muted)">
      {children}
    </label>
  );
}


function Input({ ...props }) {
  return (
    <input
      {...props}
      className="box-border w-full rounded-md border border-(--border) bg-(--white) px-3 py-2 text-[13.5px] text-(--text-main) outline-none transition-colors duration-150 focus:border-(--orange)"
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  );
}

function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="box-border min-h-37.5 w-full resize-y rounded-md border border-(--border) bg-(--white) px-3 py-2.5 text-[13.5px] leading-[1.7] text-(--text-main) outline-none transition-colors duration-150 focus:border-(--orange)"
    />
  );
}

//  SVG icons

const icons = {
  clock: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--orange)"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  csv: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--orange)"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  mail: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--orange)"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  clip: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--orange)"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  upload: (color = "var(--text-hint)") => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  checkCircle: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--success)"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  pdf: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--orange)"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  img: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--orange)"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  x: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  plus: (
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
  ),
  save: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  rocket: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  info: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  users: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  shuffle: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  ),
  layout: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--orange)"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
};

//  Email templates

const EMAIL_TEMPLATES = [
  {
    id: 1,
    name: "Classic Newsletter",
    tag: "Newsletter",
    tagColor: "#3b82f6",
    description: "Clean header, body text, and a single CTA button.",
    preview: { accent: "#f97316", layout: "newsletter" },
  },
  {
    id: 2,
    name: "Bold Promo",
    tag: "Promotional",
    tagColor: "#ef4444",
    description: "Full-width hero banner with a large discount badge.",
    preview: { accent: "#ef4444", layout: "promo" },
  },
  {
    id: 3,
    name: "Minimal Transactional",
    tag: "Transactional",
    tagColor: "#6b7280",
    description: "Plain text style, high deliverability.",
    preview: { accent: "#6b7280", layout: "minimal" },
  },
  {
    id: 4,
    name: "Product Spotlight",
    tag: "Product",
    tagColor: "#8b5cf6",
    description: "Side-by-side product image and description.",
    preview: { accent: "#8b5cf6", layout: "product" },
  },
  {
    id: 5,
    name: "Welcome Series",
    tag: "Onboarding",
    tagColor: "#10b981",
    description: "Warm welcome with step-by-step getting started guide.",
    preview: { accent: "#10b981", layout: "welcome" },
  },
  {
    id: 6,
    name: "Re-engagement",
    tag: "Retention",
    tagColor: "#f59e0b",
    description: "We miss you style with a special offer.",
    preview: { accent: "#f59e0b", layout: "re-engage" },
  },
  {
    id: 7,
    name: "Event Invite",
    tag: "Event",
    tagColor: "#06b6d4",
    description: "Elegant invite card with date, time, venue, and RSVP.",
    preview: { accent: "#06b6d4", layout: "event" },
  },
  {
    id: 8,
    name: "Survey & Feedback",
    tag: "Survey",
    tagColor: "#ec4899",
    description: "Quick survey prompt with star rating and feedback link.",
    preview: { accent: "#ec4899", layout: "survey" },
  },
  {
    id: 9,
    name: "Dark Mode Promo",
    tag: "Promotional",
    tagColor: "#ef4444",
    description: "High-contrast dark template with neon accents.",
    preview: { accent: "#a78bfa", layout: "dark" },
  },
  {
    id: 10,
    name: "Digest / Roundup",
    tag: "Digest",
    tagColor: "#14b8a6",
    description: "Multi-section layout for weekly digests and roundups.",
    preview: { accent: "#14b8a6", layout: "digest" },
  },
];

//  Template thumbnail SVG

function TemplateThumbnail({ layout, accent, selected }) {
  const bg = layout === "dark" ? "#1e1b2e" : "#f9fafb";
  const textLight = layout === "dark" ? "#4a4560" : "#e5e7eb";
  const textDark = layout === "dark" ? "#7c6f9a" : "#d1d5db";
  const white = layout === "dark" ? "#2d2845" : "#ffffff";

  const thumbnails = {
    newsletter: (
      <>
        <rect x="8" y="8" width="84" height="16" rx="3" fill={accent} />
        <rect
          x="34"
          y="13"
          width="32"
          height="5"
          rx="2"
          fill="white"
          opacity="0.7"
        />
        <rect x="8" y="28" width="84" height="22" rx="2" fill={textDark} />
        <rect x="30" y="34" width="40" height="4" rx="1" fill={textLight} />
        <rect x="8" y="55" width="84" height="3" rx="1" fill={textDark} />
        <rect x="8" y="61" width="70" height="3" rx="1" fill={textDark} />
        <rect x="8" y="67" width="78" height="3" rx="1" fill={textDark} />
        <rect x="28" y="75" width="44" height="10" rx="3" fill={accent} />
        <rect
          x="36"
          y="78"
          width="28"
          height="4"
          rx="1"
          fill="white"
          opacity="0.8"
        />
        <rect x="20" y="90" width="60" height="2" rx="1" fill={textLight} />
      </>
    ),
    promo: (
      <>
        <rect x="8" y="8" width="84" height="35" rx="3" fill={accent} />
        <circle cx="50" cy="25" r="12" fill="white" opacity="0.2" />
        <rect
          x="42"
          y="21"
          width="16"
          height="8"
          rx="2"
          fill="white"
          opacity="0.6"
        />
        <rect x="18" y="48" width="64" height="5" rx="2" fill={textDark} />
        <rect x="28" y="56" width="44" height="3" rx="1" fill={textLight} />
        <rect x="16" y="64" width="68" height="12" rx="4" fill={accent} />
        <rect
          x="30"
          y="68"
          width="40"
          height="4"
          rx="1"
          fill="white"
          opacity="0.8"
        />
        <rect x="24" y="82" width="52" height="2" rx="1" fill={textLight} />
        <rect x="30" y="87" width="40" height="2" rx="1" fill={textLight} />
      </>
    ),
    minimal: (
      <>
        <rect x="8" y="10" width="24" height="5" rx="2" fill={textDark} />
        <line
          x1="8"
          y1="20"
          x2="92"
          y2="20"
          stroke={textDark}
          strokeWidth="0.8"
        />
        <rect x="8" y="26" width="50" height="4" rx="1" fill={textDark} />
        <rect x="8" y="34" width="84" height="3" rx="1" fill={textLight} />
        <rect x="8" y="40" width="78" height="3" rx="1" fill={textLight} />
        <rect x="8" y="46" width="82" height="3" rx="1" fill={textLight} />
        <rect x="8" y="52" width="60" height="3" rx="1" fill={textLight} />
        <rect x="8" y="62" width="36" height="3" rx="1" fill={accent} />
        <rect x="8" y="74" width="30" height="3" rx="1" fill={textDark} />
        <rect x="8" y="80" width="42" height="2" rx="1" fill={textLight} />
        <line
          x1="8"
          y1="90"
          x2="92"
          y2="90"
          stroke={textLight}
          strokeWidth="0.8"
        />
        <rect x="28" y="93" width="44" height="2" rx="1" fill={textLight} />
      </>
    ),
    product: (
      <>
        <rect x="8" y="8" width="84" height="8" rx="2" fill={textDark} />
        <rect x="34" y="10" width="32" height="4" rx="1" fill={textLight} />
        <rect x="8" y="20" width="38" height="38" rx="3" fill={textDark} />
        <circle cx="27" cy="36" r="10" fill={textLight} />
        <rect x="52" y="22" width="40" height="5" rx="2" fill={textDark} />
        <rect x="52" y="30" width="40" height="2.5" rx="1" fill={textLight} />
        <rect x="52" y="35" width="36" height="2.5" rx="1" fill={textLight} />
        <rect x="52" y="40" width="38" height="2.5" rx="1" fill={textLight} />
        <rect
          x="52"
          y="47"
          width="20"
          height="5"
          rx="1"
          fill={accent}
          opacity="0.2"
        />
        <rect x="53" y="49" width="14" height="3" rx="1" fill={accent} />
        <rect x="52" y="55" width="40" height="8" rx="3" fill={accent} />
        <rect
          x="60"
          y="58"
          width="24"
          height="3"
          rx="1"
          fill="white"
          opacity="0.8"
        />
        <rect x="8" y="70" width="84" height="2" rx="1" fill={textLight} />
        <rect x="8" y="75" width="84" height="2" rx="1" fill={textLight} />
        <rect x="24" y="85" width="52" height="2" rx="1" fill={textLight} />
      </>
    ),
    welcome: (
      <>
        <rect x="8" y="8" width="84" height="24" rx="3" fill={accent} />
        <ellipse cx="50" cy="32" rx="46" ry="8" fill={bg} />
        <rect
          x="24"
          y="14"
          width="52"
          height="7"
          rx="2"
          fill="white"
          opacity="0.3"
        />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle
              cx="18"
              cy={50 + i * 14}
              r="5"
              fill={accent}
              opacity="0.8"
            />
            <rect
              x="28"
              y={47 + i * 14}
              width="56"
              height="3"
              rx="1"
              fill={textDark}
            />
            <rect
              x="28"
              y={52 + i * 14}
              width="44"
              height="2"
              rx="1"
              fill={textLight}
            />
          </g>
        ))}
        <rect x="22" y="96" width="56" height="9" rx="3" fill={accent} />
      </>
    ),
    "re-engage": (
      <>
        <rect
          x="8"
          y="8"
          width="84"
          height="28"
          rx="3"
          fill={accent}
          opacity="0.15"
        />
        <circle cx="50" cy="22" r="10" fill={accent} opacity="0.3" />
        <rect
          x="38"
          y="19"
          width="24"
          height="6"
          rx="2"
          fill={accent}
          opacity="0.5"
        />
        <rect x="16" y="42" width="68" height="6" rx="2" fill={textDark} />
        <rect x="8" y="52" width="84" height="3" rx="1" fill={textLight} />
        <rect x="8" y="58" width="70" height="3" rx="1" fill={textLight} />
        <rect
          x="22"
          y="66"
          width="56"
          height="14"
          rx="4"
          fill={accent}
          opacity="0.15"
        />
        <rect
          x="22"
          y="66"
          width="56"
          height="14"
          rx="4"
          stroke={accent}
          strokeWidth="1"
          fill="none"
        />
        <rect x="30" y="70" width="40" height="5" rx="1" fill={accent} />
        <rect x="16" y="85" width="68" height="10" rx="3" fill={accent} />
        <rect
          x="28"
          y="88"
          width="44"
          height="4"
          rx="1"
          fill="white"
          opacity="0.8"
        />
      </>
    ),
    event: (
      <>
        <rect x="8" y="8" width="84" height="12" rx="3" fill={accent} />
        <rect x="14" y="16" width="72" height="68" rx="4" fill={white} />
        <rect x="22" y="24" width="56" height="7" rx="2" fill={textDark} />
        <rect
          x="22"
          y="36"
          width="20"
          height="20"
          rx="3"
          fill={accent}
          opacity="0.15"
        />
        <rect
          x="22"
          y="36"
          width="20"
          height="20"
          rx="3"
          stroke={accent}
          strokeWidth="1"
          fill="none"
        />
        <rect x="24" y="38" width="16" height="4" rx="1" fill={accent} />
        <rect x="26" y="44" width="12" height="8" rx="1" fill={textDark} />
        <rect x="48" y="38" width="34" height="3" rx="1" fill={textDark} />
        <rect x="48" y="44" width="28" height="2.5" rx="1" fill={textLight} />
        <rect x="48" y="49" width="30" height="2.5" rx="1" fill={textLight} />
        <rect x="22" y="62" width="56" height="10" rx="3" fill={accent} />
        <rect
          x="38"
          y="65"
          width="24"
          height="4"
          rx="1"
          fill="white"
          opacity="0.8"
        />
        <rect x="8" y="88" width="84" height="6" rx="2" fill={textLight} />
      </>
    ),
    survey: (
      <>
        <rect
          x="8"
          y="8"
          width="84"
          height="14"
          rx="3"
          fill={accent}
          opacity="0.2"
        />
        <rect x="20" y="12" width="60" height="5" rx="2" fill={accent} />
        <rect x="8" y="28" width="68" height="5" rx="2" fill={textDark} />
        <rect x="8" y="36" width="84" height="2.5" rx="1" fill={textLight} />
        <rect x="8" y="41" width="70" height="2.5" rx="1" fill={textLight} />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={26 + i * 10}
            cy="56"
            r="4"
            fill={i < 3 ? accent : textLight}
          />
        ))}
        <rect x="8" y="64" width="24" height="2.5" rx="1" fill={textLight} />
        <rect x="68" y="64" width="24" height="2.5" rx="1" fill={textLight} />
        <rect x="20" y="72" width="60" height="10" rx="3" fill={accent} />
        <rect
          x="30"
          y="75"
          width="40"
          height="4"
          rx="1"
          fill="white"
          opacity="0.8"
        />
        <rect x="28" y="88" width="44" height="2" rx="1" fill={textLight} />
        <rect x="32" y="93" width="36" height="2" rx="1" fill={textLight} />
      </>
    ),
    dark: (
      <>
        <rect
          x="8"
          y="8"
          width="84"
          height="20"
          rx="3"
          fill={accent}
          opacity="0.25"
        />
        <rect
          x="20"
          y="13"
          width="60"
          height="8"
          rx="2"
          fill={accent}
          opacity="0.7"
        />
        <line
          x1="8"
          y1="32"
          x2="92"
          y2="32"
          stroke={accent}
          strokeWidth="0.8"
          opacity="0.6"
        />
        <rect x="8" y="38" width="84" height="3" rx="1" fill="#4a4560" />
        <rect x="8" y="44" width="70" height="3" rx="1" fill="#4a4560" />
        <rect x="8" y="50" width="78" height="3" rx="1" fill="#4a4560" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={8 + i * 28}
            y="60"
            width="24"
            height="18"
            rx="3"
            fill={accent}
            opacity={0.1 + i * 0.08}
          />
        ))}
        <rect
          x="20"
          y="84"
          width="60"
          height="10"
          rx="3"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
        />
        <rect
          x="28"
          y="87"
          width="44"
          height="4"
          rx="1"
          fill={accent}
          opacity="0.8"
        />
      </>
    ),
    digest: (
      <>
        <rect x="8" y="8" width="84" height="10" rx="2" fill={accent} />
        <rect
          x="24"
          y="11"
          width="52"
          height="4"
          rx="1"
          fill="white"
          opacity="0.7"
        />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x="8"
              y={23 + i * 22}
              width="84"
              height="18"
              rx="2"
              fill={textDark}
            />
            <rect
              x="12"
              y={27 + i * 22}
              width="40"
              height="4"
              rx="1"
              fill={textLight}
            />
            <rect
              x="12"
              y={33 + i * 22}
              width="56"
              height="2.5"
              rx="1"
              fill={textLight}
              opacity="0.5"
            />
          </g>
        ))}
        <rect x="24" y="90" width="52" height="2" rx="1" fill={textLight} />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "6px",
        display: "block",
      }}
    >
      <rect width="100" height="100" fill={bg} rx="4" />
      {thumbnails[layout] || null}
      {selected && (
        <>
          <rect width="100" height="100" rx="4" fill={accent} opacity="0.08" />
          <rect
            width="100"
            height="100"
            rx="4"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
          />
        </>
      )}
    </svg>
  );
}

//  Template card

function TemplateCard({ template, selected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer overflow-hidden rounded-md border-[1.5px] bg-(--white) transition-all duration-150 ${
        selected
          ? "shadow-[0_0_0_3px_var(--template-accent)]"
          : "border-(--border) hover:-translate-y-px hover:border-(--border-hover) hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
      }`}
      style={
        selected
          ? {
              borderColor: template.preview.accent,
              "--template-accent": `${template.preview.accent}22`,
            }
          : {}
      }
    >
      <div className="box-border aspect-square w-full bg-(--bg) p-2">
        <TemplateThumbnail
          layout={template.preview.layout}
          accent={template.preview.accent}
          selected={selected}
        />
      </div>

      <div className="border-t border-(--border) px-3 py-2.5">
        <div className="mb-1 flex items-center gap-1.5">
          <span
            className="rounded-full px-1.75 py-0.5 text-[11px] font-semibold tracking-[0.02em]"
            style={{
              background: template.tagColor + "18",
              color: template.tagColor,
            }}
          >
            {template.tag}
          </span>

          {selected && (
            <span
              className="ml-auto flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full"
              style={{ background: template.preview.accent }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          )}
        </div>

        <div className="mb-0.75 font-syne text-[12.5px] font-semibold text-(--text-main)">
          {template.name}
        </div>

        <div className="text-[11px] leading-normal text-(--text-muted)">
          {template.description}
        </div>
      </div>
    </div>
  );
}

//  Toolbar

const toolbarBtns = [
  { label: "B", style: { fontWeight: 700 } },
  { label: "I", style: { fontStyle: "italic" } },
  { label: "U", style: { textDecoration: "underline" } },
  { label: "H1", style: {} },
  { label: "H2", style: {} },
  {
    label: null,
    style: {},
    title: "List",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    label: null,
    style: {},
    title: "Link",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    label: null,
    style: {},
    title: "Image",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
];

function ToolbarBtn({ label, icon, title, style: btnStyle }) {
  return (
    <button
      title={title}
      style={btnStyle}
      className="flex min-w-7 items-center justify-center rounded-sm border border-(--border) bg-(--white) px-2.25 py-1 text-xs text-(--text-muted) transition-all duration-100 hover:border-(--orange-mid) hover:bg-(--orange-light) hover:text-(--orange)"
    >
      {label || icon}
    </button>
  );
}

//  Attachment item

function AttachItem({ name, size, onRemove }) {
  const ext = name.split(".").pop().toLowerCase();

  return (
    <div className="flex items-center gap-2.25 rounded-md bg-(--bg) px-3 py-2 text-[13px]">
      {ext === "pdf" ? icons.pdf : icons.img}

      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
        {name}
      </span>

      <span className="shrink-0 text-[11px] text-(--text-muted)">{size}</span>

      <button
        onClick={onRemove}
        className="flex rounded p-0.5 text-(--text-hint) transition-colors duration-100 hover:text-(--danger)"
      >
        {icons.x}
      </button>
    </div>
  );
}

const fakeFiles = [
  { name: "promo-deck.pdf", size: "3.1 MB" },
  { name: "data-sheet.pdf", size: "1.4 MB" },
  { name: "brand-logo.png", size: "220 KB" },
  { name: "offer-letter.pdf", size: "890 KB" },
];

//  Main export

export default function CampaignPage() {
  const router = useRouter();
  

  const [startTime, setStartTime] = useState("2024-08-01T09:00");
  const [endTime, setEndTime] = useState("2024-08-01T18:00");
  const [csvFile, setCsvFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState([
    { name: "product-brochure.pdf", size: "2.4 MB" },
    { name: "banner-image.jpg", size: "540 KB" },
  ]);
  const [fakeIdx, setFakeIdx] = useState(0);
  const [selectedTemplates, setSelectedTemplates] = useState([1, 3]);
  const fileInputRef = useRef(null);

  const getInterval = (count) => {
    if (!startTime || !endTime || !count) return null;
    const ms = new Date(endTime) - new Date(startTime);
    if (ms <= 0) return null;
    const sec = ms / 1000;
    const interval = (sec / count).toFixed(1);
    const hours = Math.round(ms / 3600000);
    return `1 email every ${interval}s · ${count.toLocaleString()} total over ${hours}h window`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile({
      name: file.name,
      count: Math.floor(Math.random() * 9000) + 10000,
    });
  };

  const removeAttachment = (idx) =>
    setAttachments((prev) => prev.filter((_, i) => i !== idx));

  const addFakeAttachment = () => {
    if (fakeIdx >= fakeFiles.length) return;
    setAttachments((prev) => [...prev, fakeFiles[fakeIdx]]);
    setFakeIdx((i) => i + 1);
  };

  const toggleTemplate = (id) =>
    setSelectedTemplates((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );

  const csvPct = csvFile ? Math.round((csvFile.count / 20000) * 100) : 0;
  const intervalText = csvFile ? getInterval(csvFile.count) : null;
  const selectedCount = selectedTemplates.length;


  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Schedule Time */}
      <Card>
        <CardTitle step="1" icon={icons.clock}>
          Schedule Time
        </CardTitle>

        <CardSub>
          Define start and end time, emails will be evenly distributed across
          this window.
        </CardSub>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Start Time</Label>
            <Input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div>
            <Label>End Time</Label>
            <Input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        {intervalText && (
          <div className="mt-3 flex items-start gap-1.75 rounded-md bg-(--orange-light) px-3 py-2.25 text-[12.5px] text-(--orange-dark)">
            <span className="mt-px shrink-0">{icons.info}</span>
            <span>{intervalText}</span>
          </div>
        )}
      </Card>

      {/* CSV Upload */}
      <Card>
        <CardTitle step="2" icon={icons.csv}>
          Upload Recipients
        </CardTitle>

        <CardSub>
          Upload a CSV with email addresses. Maximum 20,000 recipients per
          campaign.
        </CardSub>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-md border-[1.5px] border-dashed px-4 py-6 text-center transition-colors duration-150 ${
            csvFile
              ? "border-(--orange) bg-(--success-bg)"
              : "border-(--border) bg-(--bg) hover:border-(--orange) hover:bg-(--orange-light)"
          }`}
        >
          <div className="mb-2 flex justify-center">
            {csvFile ? icons.checkCircle : icons.upload("var(--text-hint)")}
          </div>

          <div className="text-[13px] text-(--text-muted)">
            {csvFile ? (
              <>
                <strong className="text-(--text-main)">
                  {csvFile.name}
                </strong>
                <br />
                <span className="text-[11.5px]">Click to replace</span>
              </>
            ) : (
              <>
                <strong className="text-(--text-main)">
                  Click to upload
                </strong>
                {" or drag & drop"}
                <br />
                <span className="text-[11.5px]">.CSV files only</span>
              </>
            )}
          </div>
        </div>

        {csvFile && (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md bg-(--orange-light) px-3 py-2.25 text-[13px] font-medium text-(--orange-dark)">
              {icons.users}

              <span>{csvFile.count.toLocaleString()} recipients loaded</span>

              <span className="ml-auto text-[11px] text-(--orange)">
                Max: 20,000
              </span>
            </div>

            <div className="mt-2 h-1.25 overflow-hidden rounded-full bg-(--border)">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${csvPct}%`,
                  background: csvPct > 90 ? "var(--danger)" : "var(--orange)",
                }}
              />
            </div>
          </>
        )}
      </Card>

      {/* Compose Email - Full width on all screens */}
      <div className="lg:col-span-2">
        <Card>
          <CardTitle step="3" icon={icons.mail}>
            Compose Email
          </CardTitle>

          <CardSub>
            Write your subject line and email body. Use the toolbar for formatting
            options.
          </CardSub>

          <div className="mb-3.5">
            <Label>Subject Line</Label>
            <Input
              type="text"
              placeholder="e.g. Exclusive offer just for you 🎁"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <Label>Email Body</Label>

            <div className="mb-2 flex flex-wrap items-center gap-1">
              {toolbarBtns.map((btn, i) => (
                <ToolbarBtn key={i} {...btn} />
              ))}

              <button className="mt-1 flex items-center gap-1.25 rounded-sm border border-(--orange-mid) bg-(--orange-light) px-3 py-1 text-xs font-medium text-(--orange) sm:ml-auto sm:mt-0">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="3" y="9" width="18" height="12" rx="2" />
                  <path d="M8 9V5a2 2 0 0 1 4 0v4" />
                </svg>
                Insert CTA Button
              </button>
            </div>

            <Textarea
              placeholder={`Write your email content here...\n\nHi {{first_name}},\n\nWe wanted to share something exciting with you...`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div className="border-t border-(--border) pt-5">
            <div className="mb-1.5 flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-2">
                {icons.layout}

                <span className="font-syne text-sm font-semibold text-(--text-main)">
                  Email Templates
                </span>

                {selectedCount > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-(--orange) px-1.5 text-[11px] font-bold text-white">
                    {selectedCount}
                  </span>
                )}
              </div>

              <div className="flex shrink-0 gap-1.5">
                {["Select All", "Clear"].map((label, i) => (
                  <button
                    key={label}
                    onClick={
                      i === 0
                        ? () =>
                            setSelectedTemplates(
                              EMAIL_TEMPLATES.map((t) => t.id)
                            )
                        : () => setSelectedTemplates([])
                    }
                    className={`rounded-sm border bg-(--bg) px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                      i === 0
                        ? "border-(--border) text-(--text-muted) hover:border-(--orange) hover:text-(--orange)"
                        : "border-(--border) text-(--text-muted) hover:border-(--danger) hover:text-(--danger)"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p className="mb-3.5 text-[12.5px] leading-normal text-(--text-muted)">
              Select one or more templates. Your email content will be distributed
              randomly across all selected templates.
            </p>

            {selectedCount > 1 && (
              <div className="mb-3.5 flex items-start gap-2 rounded-md bg-(--orange-light) px-3 py-2.25 text-[12.5px] text-(--orange-dark)">
                <span className="mt-px shrink-0 text-(--orange)">
                  {icons.shuffle}
                </span>

                <span>
                  Recipients will be <strong>randomly assigned</strong> across{" "}
                  <strong>{selectedCount} templates</strong> — each getting roughly{" "}
                  <strong>{Math.round(100 / selectedCount)}%</strong> of the send
                  volume.
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {EMAIL_TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  selected={selectedTemplates.includes(template.id)}
                  onToggle={() => toggleTemplate(template.id)}
                />
              ))}
            </div>

            {selectedCount === 0 && (
              <div className="mt-3 flex items-center gap-1.75 rounded-md border border-[#fecaca] bg-[#fef2f2] px-3 py-2.25 text-[12.5px] text-[#dc2626]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>

                Please select at least one template to continue.
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Attachments - Below Compose Email, full width */}
      <div className="lg:col-span-2">
        <Card>
          <CardTitle icon={icons.clip} extra="Upload · PDF, JPG, PNG">
            Attachments
          </CardTitle>

          <div className="mt-3.5 flex flex-col gap-2">
            {attachments.map((a, i) => (
              <AttachItem
                key={i}
                {...a}
                onRemove={() => removeAttachment(i)}
              />
            ))}
          </div>

          <button
            onClick={addFakeAttachment}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border-[1.5px] border-dashed border-(--border) bg-transparent px-2.25 py-2.25 text-[13px] font-normal text-(--text-muted) transition-all duration-150 hover:border-(--orange) hover:bg-(--orange-light) hover:text-(--orange)"
          >
            {icons.plus}
            Add Attachment
          </button>
        </Card>
      </div>

      {/* Launch bar - Full width */}
      <div className="lg:col-span-2">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="text-sm font-semibold">
                Ready to launch?
              </div>

              <div className="mt-0.75 text-xs text-(--text-muted)">
                {selectedCount > 0
                  ? `Emails will be sent using ${selectedCount} template${
                      selectedCount > 1 ? "s" : ""
                    } on your defined schedule.`
                  : "Select at least one template before launching."}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:ml-auto sm:flex-row">
              <button className="flex items-center justify-center gap-1.75 rounded-md border border-(--border) bg-transparent px-4 py-2 text-[13px] text-(--text-main) transition-colors hover:bg-(--bg)">
                {icons.save} Save Draft
              </button>

              <button
                onClick={() => router.push("/dashboard")}
                disabled={selectedCount === 0}
                className={`flex items-center justify-center gap-1.75 rounded-md px-5 py-2 text-[13px] font-medium transition-colors ${
                  selectedCount === 0
                    ? "cursor-not-allowed bg-(--border) text-(--text-muted)"
                    : "cursor-pointer bg-(--orange) text-white hover:bg-(--orange-dark)"
                }`}
              >
                {icons.rocket} Launch Campaign
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}