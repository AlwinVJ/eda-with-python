export function DiscountVsProfitCardVisual() {
  return (
    <div className="relative aspect-video w-full h-full select-none overflow-hidden bg-card transition-transform duration-300 group-hover:scale-[1.02]">
      <svg
        viewBox="0 0 400 225"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Retail Discount vs Profit Analysis visualization showing 20% loss threshold"
      >
        <defs>
          <linearGradient id="dvp-trend-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="26%" stopColor="#f59e0b" />
            <stop offset="55%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>

          <linearGradient id="dvp-profit-zone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="dvp-loss-zone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.16" />
          </linearGradient>

          <filter id="dvp-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle grid background */}
        <rect width="400" height="225" className="fill-card" />

        {/* Profitable zone (<= 20% discount, positive profit) */}
        <rect x="52" y="32" width="80" height="64" rx="4" fill="url(#dvp-profit-zone-grad)" />

        {/* Loss-making zone (> 20% discount, negative profit) */}
        <rect x="132" y="96" width="240" height="92" rx="4" fill="url(#dvp-loss-zone-grad)" />

        {/* Horizontal grid lines */}
        <line
          x1="52"
          y1="64"
          x2="372"
          y2="64"
          className="stroke-border/40"
          strokeDasharray="3 3"
          strokeWidth="1"
        />
        <line
          x1="52"
          y1="128"
          x2="372"
          y2="128"
          className="stroke-border/40"
          strokeDasharray="3 3"
          strokeWidth="1"
        />
        <line
          x1="52"
          y1="160"
          x2="372"
          y2="160"
          className="stroke-border/40"
          strokeDasharray="3 3"
          strokeWidth="1"
        />

        {/* Zero baseline (Profit = $0) */}
        <line
          x1="52"
          y1="96"
          x2="372"
          y2="96"
          className="stroke-foreground/30"
          strokeWidth="1.25"
        />

        {/* Vertical grid lines */}
        <line x1="52" y1="32" x2="52" y2="188" className="stroke-border/50" strokeWidth="1" />
        <line
          x1="212"
          y1="32"
          x2="212"
          y2="188"
          className="stroke-border/30"
          strokeDasharray="3 3"
          strokeWidth="1"
        />
        <line
          x1="292"
          y1="32"
          x2="292"
          y2="188"
          className="stroke-border/30"
          strokeDasharray="3 3"
          strokeWidth="1"
        />
        <line
          x1="372"
          y1="32"
          x2="372"
          y2="188"
          className="stroke-border/30"
          strokeDasharray="3 3"
          strokeWidth="1"
        />

        {/* 20% Threshold dividing line */}
        <line
          x1="132"
          y1="24"
          x2="132"
          y2="190"
          stroke="#f59e0b"
          strokeDasharray="4 3"
          strokeWidth="1.75"
        />

        {/* 20% Cliff threshold badge */}
        <rect
          x="105"
          y="9"
          width="54"
          height="16"
          rx="3"
          className="fill-amber-500/20 stroke-amber-500/60"
          strokeWidth="1"
        />
        <text
          x="132"
          y="21"
          textAnchor="middle"
          className="text-[9px] font-bold tracking-wider fill-amber-600 dark:fill-amber-400"
        >
          20% CLIFF
        </text>

        {/* Profitable zone label */}
        <text
          x="60"
          y="46"
          className="text-[8.5px] font-bold tracking-wider fill-emerald-600 dark:fill-emerald-400 uppercase"
        >
          Profitable (≤20%)
        </text>
        <text x="60" y="56" className="text-[8px] fill-muted-foreground">
          +33.8% avg margin
        </text>

        {/* Loss zone label */}
        <text
          x="264"
          y="172"
          className="text-[8.5px] font-bold tracking-wider fill-rose-600 dark:fill-rose-400 uppercase"
        >
          Loss Zone (&gt;20%)
        </text>
        <text x="264" y="182" className="text-[8px] fill-muted-foreground">
          -60.5% avg margin
        </text>

        {/* Scatterplot Points: Profitable clusters (<=20% discount) */}
        <circle cx="52" cy="52" r="3" fill="#10b981" fillOpacity="0.85" />
        <circle cx="52" cy="68" r="2.5" fill="#10b981" fillOpacity="0.75" />
        <circle cx="52" cy="44" r="3.2" fill="#10b981" fillOpacity="0.8" />
        <circle cx="62" cy="58" r="2.2" fill="#10b981" fillOpacity="0.8" />
        <circle cx="70" cy="78" r="2.8" fill="#10b981" fillOpacity="0.75" />
        <circle cx="76" cy="48" r="3" fill="#10b981" fillOpacity="0.85" />
        <circle cx="86" cy="64" r="2.4" fill="#10b981" fillOpacity="0.8" />
        <circle cx="94" cy="54" r="3" fill="#10b981" fillOpacity="0.85" />
        <circle cx="104" cy="72" r="2.8" fill="#10b981" fillOpacity="0.75" />
        <circle cx="112" cy="62" r="2.6" fill="#10b981" fillOpacity="0.8" />
        <circle cx="122" cy="78" r="3" fill="#10b981" fillOpacity="0.8" />
        <circle cx="128" cy="88" r="2.8" fill="#10b981" fillOpacity="0.75" />

        {/* Scatterplot Points: Loss clusters (>20% discount) */}
        <circle cx="142" cy="106" r="2.6" fill="#ef4444" fillOpacity="0.8" />
        <circle cx="152" cy="118" r="3" fill="#ef4444" fillOpacity="0.8" />
        <circle cx="164" cy="132" r="3.2" fill="#ef4444" fillOpacity="0.85" />
        <circle cx="176" cy="114" r="2.5" fill="#ef4444" fillOpacity="0.75" />
        <circle cx="188" cy="142" r="3" fill="#ef4444" fillOpacity="0.85" />
        <circle cx="202" cy="154" r="3" fill="#ef4444" fillOpacity="0.85" />
        <circle cx="214" cy="138" r="2.5" fill="#ef4444" fillOpacity="0.75" />
        <circle cx="226" cy="160" r="3.5" fill="#ef4444" fillOpacity="0.9" />
        <circle cx="244" cy="148" r="3" fill="#ef4444" fillOpacity="0.85" />
        <circle cx="258" cy="168" r="3.2" fill="#ef4444" fillOpacity="0.85" />
        <circle cx="274" cy="156" r="2.7" fill="#ef4444" fillOpacity="0.75" />
        <circle cx="292" cy="172" r="3.2" fill="#ef4444" fillOpacity="0.9" />
        <circle cx="312" cy="166" r="3" fill="#ef4444" fillOpacity="0.85" />
        <circle cx="332" cy="178" r="3.2" fill="#ef4444" fillOpacity="0.85" />
        <circle cx="352" cy="174" r="3" fill="#ef4444" fillOpacity="0.85" />
        <circle cx="370" cy="180" r="3.2" fill="#ef4444" fillOpacity="0.9" />

        {/* Downward Profitability Trend Curve */}
        <path
          d="M 52,56 C 82,62 108,76 132,94 C 158,114 186,138 232,154 C 282,168 328,174 372,178"
          fill="none"
          stroke="url(#dvp-trend-grad)"
          strokeWidth="2.75"
          filter="url(#dvp-glow)"
          strokeLinecap="round"
        />

        {/* Y-Axis Labels */}
        <text x="46" y="67" textAnchor="end" className="text-[8px] fill-muted-foreground font-mono">
          +$100
        </text>
        <text
          x="46"
          y="99"
          textAnchor="end"
          className="text-[8px] font-bold fill-foreground/70 font-mono"
        >
          $0
        </text>
        <text
          x="46"
          y="131"
          textAnchor="end"
          className="text-[8px] fill-muted-foreground font-mono"
        >
          -$100
        </text>
        <text
          x="46"
          y="163"
          textAnchor="end"
          className="text-[8px] fill-muted-foreground font-mono"
        >
          -$200
        </text>

        {/* X-Axis Labels */}
        <text
          x="52"
          y="202"
          textAnchor="middle"
          className="text-[8.5px] fill-muted-foreground font-mono"
        >
          0%
        </text>
        <text
          x="132"
          y="202"
          textAnchor="middle"
          className="text-[8.5px] font-bold fill-amber-600 dark:fill-amber-400 font-mono"
        >
          20%
        </text>
        <text
          x="212"
          y="202"
          textAnchor="middle"
          className="text-[8.5px] fill-muted-foreground font-mono"
        >
          40%
        </text>
        <text
          x="292"
          y="202"
          textAnchor="middle"
          className="text-[8.5px] fill-muted-foreground font-mono"
        >
          60%
        </text>
        <text
          x="372"
          y="202"
          textAnchor="middle"
          className="text-[8.5px] fill-muted-foreground font-mono"
        >
          80%
        </text>

        {/* Axis titles */}
        <text
          x="372"
          y="216"
          textAnchor="end"
          className="text-[8px] uppercase tracking-wider fill-muted-foreground font-medium"
        >
          Discount Rate →
        </text>
        <text
          x="52"
          y="22"
          textAnchor="start"
          className="text-[8px] uppercase tracking-wider fill-muted-foreground font-medium"
        >
          ↑ Profit ($)
        </text>

        {/* Top-Right Analytics Badge */}
        <g>
          <rect
            x="248"
            y="9"
            width="124"
            height="17"
            rx="3"
            className="fill-card/90 stroke-border/70"
            strokeWidth="0.75"
          />
          <text
            x="310"
            y="21"
            textAnchor="middle"
            className="text-[8.5px] font-semibold tracking-tight fill-muted-foreground"
          >
            Pearson r = -0.86 (Margin)
          </text>
        </g>
      </svg>
    </div>
  );
}
