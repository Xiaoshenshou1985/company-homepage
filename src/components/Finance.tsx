import { useEffect, useRef, useState } from 'react';

interface BarProps {
  label: string;
  value: string;
  pct: number;
  color: string;
  delay: number;
}

function AnimatedBar({ label, value, pct, color, delay }: BarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(pct), delay);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-white/70 text-sm">{label}</span>
        <span className="text-gold-400 font-bold text-lg">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-white/[0.04] overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

const financialData = [
  {
    label: '2025年营业收入',
    value: '1.48亿元',
    pct: 95,
    color: 'from-gold-400 to-amber-500',
    delay: 0,
  },
  {
    label: '营业收入同比增长',
    value: '+450%',
    pct: 90,
    color: 'from-emerald-400 to-teal-500',
    delay: 150,
  },
  {
    label: '2025年净利润',
    value: '254万元',
    pct: 45,
    color: 'from-blue-400 to-cyan-500',
    delay: 300,
  },
  {
    label: '净利润同比增长',
    value: '+474%',
    pct: 92,
    color: 'from-purple-400 to-violet-500',
    delay: 450,
  },
  {
    label: '总资产规模',
    value: '6572万元',
    pct: 65,
    color: 'from-rose-400 to-pink-500',
    delay: 600,
  },
];

const highlights = [
  { label: '注册资本', value: '5000万', icon: '◆' },
  { label: '子公司数量', value: '6家', icon: '■' },
  { label: '城市覆盖', value: '3城', icon: '▲' },
  { label: '成立年份', value: '2023', icon: '●' },
];

export default function Finance() {
  return (
    <section id="finance" className="py-24 md:py-32 bg-navy-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 scroll-reveal">
          <span className="text-gold-400 text-sm tracking-widest uppercase mb-4 block">FINANCIAL HIGHLIGHTS</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">财务亮点</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bar charts */}
          <div className="lg:col-span-2 scroll-reveal p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-lg font-bold mb-8 text-white/80">关键财务指标</h3>
            {financialData.map((d, i) => (
              <AnimatedBar
                key={i}
                label={d.label}
                value={d.value}
                pct={d.pct}
                color={d.color}
                delay={d.delay}
              />
            ))}
          </div>

          {/* Quick stats */}
          <div className="scroll-reveal space-y-4">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-gold-500/20 transition-colors duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/10 to-gold-600/10 flex items-center justify-center text-gold-400 text-lg group-hover:scale-110 transition-transform duration-300">
                    {h.icon}
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">{h.label}</div>
                    <div className="text-white font-bold text-2xl">{h.value}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Growth badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-500/5 to-amber-500/5 border border-gold-500/20">
              <div className="text-center">
                <div className="text-gold-400 text-xs tracking-widest mb-2">ANNUAL GROWTH</div>
                <div className="text-5xl font-bold text-gold-400 mb-1">450%</div>
                <div className="text-white/40 text-sm">2025年营收增长率</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
