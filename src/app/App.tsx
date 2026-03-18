"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "./components/landing/animations";

/* ── Color tokens (từ Figma) ── */
const C = {
  primary:  "#f7ac3d",
  yellow:   "#FDBF00",
  burgundy: "#9F1D62",
  wine:     "#6d0236",
  wineDark: "#5b2642",
  dark:     "#2a2a2a",
  cream:    "#fff8f1",
  white:    "#ffffff",
  muted:    "#8d8d8d",
  body:     "#474747",
  border:   "#e0e0e0",
};

/* ── Images ── */
const IMG_HERO     = "https://images.unsplash.com/photo-1691058428276-59993d7b92e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1800&q=80";
const IMG_GPS      = "https://images.unsplash.com/photo-1764347923709-fc48487f2486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";
const IMG_STUDENT  = "https://images.unsplash.com/photo-1759674406719-baa59167036b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";
const IMG_WORKER   = "https://images.unsplash.com/photo-1605808444683-e386e3ff4f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";
const IMG_GROUP    = "https://images.unsplash.com/photo-1770563182398-e2e8d2a9501d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";

/* ── Sections ── */
const SECTIONS = [
  { id: "hero",     label: "Trang chủ" },
  { id: "problems", label: "Vấn đề" },
  { id: "solution", label: "Giải pháp" },
  { id: "audience", label: "Đối tượng" },
];

/* ─────────────────────────────────────────
   Shared atoms
───────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="40" height="24" viewBox="0 0 107 63" fill="none">
        <defs>
          <linearGradient id="gA" x1="15" x2="353" y1="36" y2="33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9F1D62" />
            <stop offset="1" stopColor="#00F2FF" />
          </linearGradient>
          <linearGradient id="gB" x1="5" x2="222" y1="45" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9F1D62" />
            <stop offset="1" stopColor="#00F2FF" />
          </linearGradient>
        </defs>
        <path d="M15 63 L62 0 L107 22 L88 63Z" fill="url(#gA)" opacity="0.9" />
        <path d="M5 63 L46 10 L94 32 L80 63Z" fill="url(#gB)" opacity="0.65" />
      </svg>
      <span style={{ color: C.primary, fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>
        Go<span style={{ color: "#fff" }}>Ticket</span>
      </span>
    </div>
  );
}

function Navbar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? C.dark : "transparent",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Logo />
        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onNav(s.id)}
              className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
              style={{
                color:      active === s.id ? C.dark : "rgba(255,255,255,0.85)",
                background: active === s.id ? C.primary : "transparent",
                fontWeight: active === s.id ? 700 : 400,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          className="hidden md:block px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:brightness-110"
          style={{ background: C.primary, color: C.dark }}
          onClick={() => onNav("hero")}
        >
          Xem demo
        </button>
      </div>
    </nav>
  );
}

function MobileDock({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <motion.div
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.25rem)] max-w-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-2xl px-2 py-2 flex items-center justify-between gap-1"
        style={{
          background: "rgba(42,42,42,0.86)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
        }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => onNav(s.id)}
            className="min-h-10 px-2.5 flex-1 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              color: active === s.id ? C.dark : "rgba(255,255,255,0.78)",
              background: active === s.id ? C.primary : "transparent",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* Highlight pill */
function Pill({ text, color = C.primary }: { text: string; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: color + "22", color, border: `1px solid ${color}44` }}
    >
      {text}
    </span>
  );
}

/* Section wrapper */
function Section({ id, bg, children }: { id: string; bg?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 md:py-24 px-4 scroll-mt-20" style={{ background: bg ?? C.cream }}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* Section heading */
function Heading({
  eyebrow, title, subtitle, center = false,
}: {
  eyebrow?: string; title: string; subtitle?: string; center?: boolean;
}) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <div className={`mb-3 ${center ? "flex justify-center" : ""}`}>
          <Pill text={eyebrow} color={C.primary} />
        </div>
      )}
      <h2
        className="text-2xl md:text-4xl font-black leading-tight mb-3"
        style={{ color: C.dark }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: C.muted, marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* Divider */
function GradientDivider() {
  return (
    <div
      className="h-px w-full my-12"
      style={{ background: `linear-gradient(90deg, transparent, ${C.primary}88, transparent)` }}
    />
  );
}

/* ─────────────────────────────────────────
   Section 1 — HERO
───────────────────────────────────────── */
function CounterBadge({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center px-4 md:px-6 py-3 md:py-4 rounded-2xl"
      style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)" }}
    >
      <span className="text-2xl md:text-3xl font-black" style={{ color: C.primary }}>{value}</span>
      <span className="text-xs text-white/70 mt-1 text-center leading-snug">{label}</span>
    </div>
  );
}

function HeroSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* background */}
      <motion.img
        src={IMG_HERO}
        alt="Vietnam highway"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 40%" }}
        animate={{ scale: [1.02, 1.06, 1.02] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, rgba(42,42,42,0.88) 0%, rgba(42,42,42,0.72) 50%, rgba(159,29,98,0.45) 100%)",
        }}
      />

      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />

      {/* content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 md:pt-28 pb-20 md:pb-16">
        <Reveal className="mb-5 flex gap-2 flex-wrap justify-center" y={14}>
          <Pill text="🚀 Ra mắt 2025" color={C.primary} />
          <Pill text="Tiên phong Hybrid Approach" color="#00F2FF" />
        </Reveal>

        <Reveal delay={0.08}>
          <h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-5 max-w-4xl"
          style={{ color: "#fff", letterSpacing: "-0.5px" }}
        >
          Hành trình vạn dặm,<br />
          <span style={{ color: C.primary }}>bắt đầu bằng một cú click.</span>
        </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-sm sm:text-base md:text-xl text-white/80 max-w-2xl mb-4 leading-relaxed">
          Nền tảng đặt vé xe khách liên tỉnh tiên phong kết hợp{" "}
          <strong className="text-white">tìm kiếm đa phương thức</strong> và{" "}
          <strong className="text-white">theo dõi vị trí thời gian thực.</strong>
        </p>
        </Reveal>

        {/* Speed claim */}
        <Reveal delay={0.2}>
          <div
          className="inline-flex items-center gap-2.5 md:gap-3 px-4 md:px-6 py-3 rounded-2xl mb-8 md:mb-10"
          style={{
            background: "rgba(247,172,61,0.15)",
            border: `1.5px solid ${C.primary}66`,
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="text-2xl">⚡</span>
          <span className="text-sm md:text-base font-bold text-white text-left md:text-center">
            Giảm thời gian đặt vé từ{" "}
            <span style={{ color: C.primary }}>5 phút</span>
            {" "}xuống dưới{" "}
            <span style={{ color: C.primary }}>60 giây!</span>
          </span>
        </div>
        </Reveal>

        <Reveal className="flex gap-3 md:gap-4 flex-wrap justify-center mb-12 md:mb-16" delay={0.26}>
          <button
            onClick={onCTA}
            className="min-h-12 w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base shadow-2xl hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: C.primary, color: C.dark }}
          >
            Khám phá GoTicket →
          </button>
          <button
            onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
            className="min-h-12 w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base border-2 text-white hover:bg-white/10 transition-all duration-200"
            style={{ borderColor: "rgba(255,255,255,0.4)" }}
          >
            Xem giải pháp
          </button>
        </Reveal>

        {/* Stats row */}
        <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full" delay={0.32}>
          <CounterBadge value="< 60s"   label="Thời gian đặt vé" />
          <CounterBadge value="200+"    label="Tuyến xe toàn quốc" />
          <CounterBadge value="GPS"     label="Theo dõi xe thực time" />
          <CounterBadge value="24/7"    label="Hoàn tiền tự động" />
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-white/40 text-xs">Cuộn xuống</span>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section 2 — PAIN POINTS
───────────────────────────────────────── */
const PAIN_POINTS = [
  {
    icon: "🔀",
    tag:  "Thao tác rườm rà",
    color: "#e53e3e",
    title: "Hành trình mua vé phân mảnh",
    body:
      "Khách hàng phải chắp vá qua nhiều ứng dụng rời rạc — Zalo hỏi giá, Facebook tìm tuyến, App ngân hàng chuyển khoản — mới mua được một tấm vé.",
    quote: "3 app · 7 bước · 1 tấm vé",
  },
  {
    icon: "📊",
    tag:  "Quá tải thông tin",
    color: "#d69e2e",
    title: "Mở nhiều tab để so sánh",
    body:
      "Khó khăn khi phải mở nhiều tab để so sánh giá và giờ khởi hành giữa các nhà xe, không có một nơi tổng hợp minh bạch duy nhất.",
    quote: "Tab 1, Tab 2, Tab 3... hết pin!",
  },
  {
    icon: "😰",
    tag:  "Uncertainty Anxiety",
    color: "#805ad5",
    title: "\"Xe đang ở đâu rồi?\"",
    body:
      "Luôn bất an với câu hỏi xe đang ở đâu khi phải chờ đợi tại bến xe hoặc lề đường ồn ào, không có thông tin vị trí thực tế.",
    quote: "Chờ 45 phút mà không biết còn bao lâu",
  },
  {
    icon: "💸",
    tag:  "Rủi ro hủy chuyến",
    color: "#e53e3e",
    title: "Sợ mất tiền khi có việc đột xuất",
    body:
      "Áp lực tâm lý khi có việc bận vì sợ không được hoàn tiền hoặc thủ tục hoàn vé quá phức tạp, mất nhiều thời gian xử lý.",
    quote: "Việc đột xuất = mất tiền oan",
  },
];

function PainCard({
  icon, tag, color, title, body, quote, index,
}: (typeof PAIN_POINTS)[0] & { index: number }) {
  return (
    <div
      className="relative rounded-2xl p-6 md:p-7 flex flex-col gap-4 group md:hover:-translate-y-1 transition-all duration-300"
      style={{
        background: "#fff",
        border: `1.5px solid ${color}33`,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* number */}
      <span
        className="absolute top-4 right-5 text-5xl font-black leading-none select-none"
        style={{ color: color + "18" }}
      >
        {index + 1}
      </span>

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: color + "15" }}
      >
        {icon}
      </div>

      <div>
        <Pill text={tag} color={color} />
      </div>

      <h3 className="text-lg font-black leading-snug" style={{ color: C.dark }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: C.body }}>{body}</p>

      <div
        className="mt-auto rounded-xl px-4 py-3 text-xs font-semibold italic"
        style={{ background: color + "0f", color, borderLeft: `3px solid ${color}` }}
      >
        "{quote}"
      </div>
    </div>
  );
}

function ProblemsSection() {
  return (
    <Section id="problems" bg="#fff">
      <Reveal>
        <Heading
          eyebrow="😤 Vấn đề hiện tại"
          title="Tại sao đặt vé xe vẫn còn<br/><span style='color:#9F1D62'>quá phức tạp?</span>"
          subtitle="4 điểm đau lớn nhất mà hành khách Việt Nam đang phải chịu đựng mỗi ngày khi di chuyển liên tỉnh."
        />
      </Reveal>

      <Stagger className="grid md:grid-cols-2 gap-5">
        {PAIN_POINTS.map((p, i) => (
          <StaggerItem key={p.tag}>
            <PainCard {...p} index={i} />
          </StaggerItem>
        ))}
      </Stagger>

      {/* Summary banner */}
      <Reveal delay={0.08}>
        <div
          className="mt-10 rounded-2xl p-6 md:p-7 flex flex-col md:flex-row items-center gap-5"
          style={{
            background: `linear-gradient(135deg, ${C.dark} 0%, ${C.burgundy} 100%)`,
          }}
        >
          <div className="text-5xl flex-shrink-0">🎯</div>
          <div>
            <div className="font-black text-white text-xl mb-1">GoTicket ra đời để giải quyết đúng 4 vấn đề này.</div>
            <div className="text-white/70 text-sm leading-relaxed">
              Bằng mô hình <strong className="text-white">Hybrid Approach</strong> độc đáo — kết hợp tìm kiếm tổng hợp,
              định vị GPS thời gian thực và hoàn tiền tự động — chúng tôi đưa trải nghiệm đặt vé lên một tầm cao hoàn toàn mới.
            </div>
          </div>
          <button
            onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
            className="min-h-11 flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all"
            style={{ background: C.primary, color: C.dark }}
          >
            Xem giải pháp →
          </button>
        </div>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 3 — SOLUTION
───────────────────────────────────────── */
const FEATURES = [
  {
    icon: "🔍",
    label: "Search-First",
    accent: C.primary,
    title: "Tìm kiếm & So sánh minh bạch",
    body:
      "Giao diện tổng hợp dạng danh sách giúp bạn dễ dàng so sánh giá vé, giờ chạy của hàng trăm nhà xe chỉ trên một màn hình duy nhất. Không còn nhảy qua lại giữa các app.",
    solves: "Giải quyết: Quá tải thông tin",
    img: null,
  },
  {
    icon: "📍",
    label: "Map-Centric",
    accent: "#2196f3",
    title: "Định vị xe thời gian thực",
    body:
      "Tích hợp bản đồ GPS, cập nhật vị trí xe liên tục. Bạn biết chính xác khi nào xe đến điểm đón, xóa bỏ hoàn toàn sự chờ đợi trong vô vọng.",
    solves: "Giải quyết: Uncertainty Anxiety",
    img: IMG_GPS,
  },
  {
    icon: "⚡",
    label: "Auto-Refund",
    accent: "#4caf50",
    title: "Hoàn tiền tự động & Khắc phục sự cố",
    body:
      "Quy trình hủy vé tự động hóa và minh bạch. Hỗ trợ hoàn tiền nhanh chóng giúp bạn luôn làm chủ lịch trình trong mọi tình huống khẩn cấp.",
    solves: "Giải quyết: Rủi ro hủy chuyến",
    img: null,
  },
  {
    icon: "🤝",
    label: "Group Booking",
    accent: C.burgundy,
    title: "Đặt vé nhóm & Chia sẻ dễ dàng",
    body:
      "Quản lý giỏ hàng thông minh, hỗ trợ mua vé cho gia đình/nhóm bạn và chia sẻ lộ trình thời gian thực cho tất cả thành viên chỉ bằng một link.",
    solves: "Giải quyết: Thao tác phân mảnh",
    img: IMG_GROUP,
  },
];

function FeatureCard({
  icon, label, accent, title, body, solves, img, reverse,
}: (typeof FEATURES)[0] & { reverse?: boolean }) {
  return (
    <div
      className={`rounded-3xl overflow-hidden flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} shadow-sm md:hover:shadow-xl transition-shadow duration-300`}
      style={{ background: "#fff", border: `1.5px solid ${accent}22` }}
    >
      {/* text */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: accent + "18" }}
          >
            {icon}
          </div>
          <Pill text={label} color={accent} />
        </div>
        <h3 className="text-xl font-black leading-snug" style={{ color: C.dark }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: C.body }}>{body}</p>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold w-fit"
          style={{ background: accent + "12", color: accent }}
        >
          ✅ {solves}
        </div>
      </div>

      {/* visual */}
      <div
        className="w-full md:w-72 h-44 md:h-auto flex-shrink-0 flex items-center justify-center relative overflow-hidden"
        style={{ background: img ? undefined : accent + "0d" }}
      >
        {img ? (
          <img src={img} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-8xl opacity-20">{icon}</span>
        )}
        {/* accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}00)` }}
        />
      </div>
    </div>
  );
}

/* Hybrid badge */
function HybridBadge() {
  return (
    <div
      className="rounded-2xl p-6 md:p-8 mb-12 md:mb-14 flex flex-col md:flex-row items-center gap-6"
      style={{
        background: `linear-gradient(135deg, ${C.cream} 0%, #fff 100%)`,
        border: `2px solid ${C.primary}44`,
        boxShadow: `0 0 40px ${C.primary}18`,
      }}
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: C.primary + "22" }}>
        🧬
      </div>
      <div className="flex-1">
        <div className="font-black text-xl mb-1" style={{ color: C.dark }}>
          Mô hình "Tiếp cận lai" — <span style={{ color: C.primary }}>Hybrid Approach</span>
        </div>
        <div className="text-sm leading-relaxed" style={{ color: C.body }}>
          GoTicket không chỉ là một app đặt vé thông thường. Chúng tôi kết hợp độc đáo{" "}
          <strong>Search-First</strong> (tổng hợp & so sánh như OTA), <strong>Map-Centric</strong> (tracking GPS như Grab)
          và <strong>Auto-Refund</strong> (hoàn tiền tức thì) vào một nền tảng duy nhất — tạo ra trải nghiệm chưa từng có
          trong lĩnh vực xe khách Việt Nam.
        </div>
      </div>
      <div className="flex gap-3 flex-wrap justify-center md:justify-end flex-shrink-0">
        <Pill text="Search-First" color={C.primary} />
        <Pill text="Map-Centric" color="#2196f3" />
        <Pill text="Auto-Refund" color="#4caf50" />
        <Pill text="Group Booking" color={C.burgundy} />
      </div>
    </div>
  );
}

function SolutionSection() {
  return (
    <Section id="solution" bg={C.cream}>
      <Reveal>
        <Heading
          eyebrow="✨ Giải pháp của GoTicket"
          title='GoTicket giải quyết triệt để<br/><span style="color:#f7ac3d">4 nỗi đau</span> bằng 4 tính năng cốt lõi'
          subtitle="Mỗi tính năng được thiết kế có chủ đích để phản hồi trực tiếp một pain point cụ thể của người dùng Việt Nam."
        />
      </Reveal>
      <Reveal delay={0.06}>
        <HybridBadge />
      </Reveal>
      <Stagger className="flex flex-col gap-6">
        {FEATURES.map((f, i) => (
          <StaggerItem key={f.label}>
            <FeatureCard {...f} reverse={i % 2 === 1} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 4 — TARGET AUDIENCE
───────────────────────────────────────── */
const AUDIENCES = [
  {
    icon: "🎓",
    label: "Sinh viên",
    color: "#2196f3",
    img: IMG_STUDENT,
    headline: "Săn vé rẻ, đi tiết kiệm",
    pains: ["Ngân sách eo hẹp, cần tối ưu chi phí", "Hay di chuyển về quê dịp lễ tết"],
    gains: [
      "Dễ dàng lọc theo giá rẻ nhất, so sánh nhanh các nhà xe",
      "Tìm xe tiện chuyến qua bản đồ theo dõi vị trí thực",
      "Thông báo khuyến mãi & vé sớm tự động qua app",
    ],
  },
  {
    icon: "💼",
    label: "Người đi làm bận rộn",
    color: C.primary,
    img: IMG_WORKER,
    headline: "Đặt vé trong 60 giây, ra bến đúng giờ",
    pains: ["Lịch trình dày đặc, không có nhiều thời gian", "Cần căn đúng giờ, không muốn chờ lâu"],
    gains: [
      "Thao tác chốt vé cực nhanh — dưới 60 giây từ tìm đến mua",
      "GPS tracking căn thời gian ra bến xe chính xác",
      "Hủy vé/hoàn tiền tự động khi có việc đột xuất",
    ],
  },
  {
    icon: "👨‍👩‍👧‍👦",
    label: "Người đặt hộ (Power Users)",
    color: C.burgundy,
    img: IMG_GROUP,
    headline: "Quản lý vé cho cả gia đình, nhóm bạn",
    pains: ["Thường xuyên mua vé cho người thân", "Cần gửi mã vé cho nhiều người khác nhau"],
    gains: [
      "Giao diện quản lý thông minh, đặt nhiều vé một lần",
      "Chia sẻ mã vé và lộ trình thực time cho từng người",
      "Lịch sử tập trung, dễ tra cứu tất cả đơn hàng",
    ],
  },
];

function AudienceCard({
  icon, label, color, img, headline, pains, gains,
}: typeof AUDIENCES[0]) {
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col md:hover:shadow-xl transition-shadow duration-300"
      style={{ background: "#fff", border: `1.5px solid ${color}33` }}
    >
      {/* image header */}
      <div className="relative h-44 overflow-hidden">
        <img src={img} alt={label} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(0deg, ${color}cc 0%, transparent 60%)` }}
        />
        <div className="absolute bottom-4 left-5 flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">Dành cho</div>
            <div className="text-lg font-black text-white leading-tight">{label}</div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="p-5 md:p-6 flex flex-col gap-5 flex-1">
        <h3 className="text-lg font-black leading-snug" style={{ color: C.dark }}>{headline}</h3>

        {/* Pain → Gain */}
        <div className="rounded-xl p-4 flex flex-col gap-2" style={{ background: color + "0a", border: `1px solid ${color}22` }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>Nỗi đau</div>
          {pains.map((p) => (
            <div key={p} className="flex gap-2 text-sm" style={{ color: C.body }}>
              <span style={{ color: "#e53e3e" }}>✗</span> {p}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>GoTicket mang lại</div>
          {gains.map((g) => (
            <div key={g} className="flex gap-2 text-sm items-start" style={{ color: C.body }}>
              <span className="flex-shrink-0 mt-0.5" style={{ color }}>✓</span> {g}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function AudienceSection() {
  return (
    <Section id="audience" bg="#fff">
      <Reveal>
        <Heading
          eyebrow="👥 Đối tượng mục tiêu"
          title='GoTicket phù hợp với <span style="color:#f7ac3d">ai?</span>'
          subtitle="Ba nhóm người dùng cốt lõi với nhu cầu riêng biệt — GoTicket có giải pháp tối ưu cho từng người."
          center
        />
      </Reveal>
      <Stagger className="grid md:grid-cols-3 gap-5 md:gap-6">
        {AUDIENCES.map((a) => (
          <StaggerItem key={a.label}>
            <AudienceCard {...a} />
          </StaggerItem>
        ))}
      </Stagger>

      <GradientDivider />

      {/* CTA block */}
      <Reveal delay={0.08}>
        <div
          className="rounded-3xl p-7 md:p-10 text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.burgundy} 100%)` }}
        >
          {/* decorative circle */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: C.primary }}
          />
          <div className="relative">
            <div className="text-5xl mb-4">🚌</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Sẵn sàng khởi hành?</h3>
            <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
              Tham gia cùng hàng nghìn hành khách đang trải nghiệm cách đặt vé xe khách thông minh nhất Việt Nam.
            </p>
            <div className="text-white/60 text-sm font-semibold">
              Trang giới thiệu dự án - không mở đặt vé trực tiếp.
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Footer
───────────────────────────────────────── */
function Footer({ onNav }: { onNav: (id: string) => void }) {
  const TEAM_MEMBERS = [
    { name: "Cao Đức Trung (Trưởng nhóm)", email: "23010018@st.phenikaa-uni.edu.vn" },
    { name: "Nguyễn Thành Nhân", email: "23010011@st.phenikaa-uni.edu.vn" },
    { name: "Lê Đức Long", email: "23010016@st.phenikaa-uni.edu.vn" },
    { name: "Nguyễn Khắc Đạt", email: "23010079@st.phenikaa-uni.edu.vn" },
  ];

  return (
    <footer style={{ background: C.dark }} className="pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 pb-10" style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
          {/* brand */}
          <div className="md:col-span-2">
            <Logo />
            <p className="text-sm leading-relaxed mt-4 max-w-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              Nền tảng đặt vé xe khách liên tỉnh tiên phong tại Việt Nam. Tiện lợi · Nhanh gọn · Minh bạch.
            </p>
            <div className="flex gap-3 mt-5">
              {["Facebook", "Zalo", "YouTube"].map((s) => (
                <button
                  key={s}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold hover:opacity-80 transition-opacity"
                  style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                >
                  {s[0]}
                </button>
              ))}
            </div>
          </div>
          {/* nav links */}
          <div>
            <div className="font-bold text-white mb-4 text-sm">Điều hướng</div>
            <div className="flex flex-col gap-2">
              {SECTIONS.map((s) => (
                <button key={s.id} onClick={() => onNav(s.id)} className="text-sm text-left hover:underline" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          {/* contact */}
          <div>
            <div className="font-bold text-white mb-4 text-sm">Nhóm GoTicket</div>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              {TEAM_MEMBERS.map((member) => (
                <div key={member.email} className="flex flex-col gap-0.5">
                  <span>{member.name}</span>
                  <span style={{ color: "rgba(255,255,255,0.45)" }}>{member.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 pb-6" style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
          <div className="font-bold text-white mb-4 text-sm">Thành viên dự án</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-sm font-semibold text-white leading-snug">{member.name}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{member.email}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          <span>© 2025 GoTicket   -  Giao diện người máy</span>
          <span>Thiết kế bởi Figma · Xây dựng bằng React + Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: C.cream }}>
      <Navbar active={activeSection} onNav={scrollTo} />
      <MobileDock active={activeSection} onNav={scrollTo} />
      <HeroSection onCTA={() => scrollTo("problems")} />
      <ProblemsSection />
      <SolutionSection />
      <AudienceSection />
      <Reveal>
        <Footer onNav={scrollTo} />
      </Reveal>
    </div>
  );
}
