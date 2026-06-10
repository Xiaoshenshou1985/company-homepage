import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * end);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-gold-400 tabular-nums">
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </div>
  );
}

const metrics = [
  { value: 1.48, suffix: '亿', prefix: '¥', label: '2025年营收', decimals: 2 },
  { value: 6, suffix: '家', prefix: '', label: '旗下子公司', decimals: 0 },
  { value: 3, suffix: '城', prefix: '', label: '城市布局', decimals: 0 },
  { value: 450, suffix: '%', prefix: '+', label: '营收增长率', decimals: 0 },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center hero-pattern overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/90 to-navy-950" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold-500/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-500/5 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Company name */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-400 text-sm tracking-wider">HONGBANG GROUP</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <span className="text-white">宏邦</span>
          <span className="text-gold-400">集团</span>
        </h1>

        <p className="animate-fade-in-up text-xl md:text-2xl text-white/60 mb-4 tracking-[0.3em]" style={{ animationDelay: '0.6s', opacity: 0 }}>
          科技驱动 · 产业协同 · 价值创造
        </p>

        <p className="animate-fade-in-up text-base text-white/40 mb-16 max-w-2xl mx-auto" style={{ animationDelay: '0.8s', opacity: 0 }}>
          湖北宏邦商务服务有限公司 — 立足武汉，辐射全国，以科技创新为引擎，构建产业协同新生态
        </p>

        {/* Key metrics */}
        <div className="animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto" style={{ animationDelay: '1s', opacity: 0 }}>
          {metrics.map((metric, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-gold-500/20 transition-colors duration-300">
              <AnimatedCounter
                end={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                decimals={metric.decimals}
              />
              <div className="text-white/40 text-sm mt-2">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-up mt-20" style={{ animationDelay: '1.4s', opacity: 0 }}>
          <a href="#overview" className="inline-flex flex-col items-center text-white/30 hover:text-gold-400 transition-colors">
            <span className="text-xs mb-2 tracking-widest">向下滚动</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
