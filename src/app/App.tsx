"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "./components/landing/animations";

/* ── Color tokens (Figma GoTicket) ── */
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
};

/* ── Image assets ── */
const IMG_HERO    = "https://images.unsplash.com/photo-1691058428276-59993d7b92e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1800&q=80";
const IMG_GPS     = "https://images.unsplash.com/photo-1764347923709-fc48487f2486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";
const IMG_STUDENT = "https://images.unsplash.com/photo-1759674406719-baa59167036b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";
const IMG_WORKER  = "https://images.unsplash.com/photo-1605808444683-e386e3ff4f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";
const IMG_GROUP   = "https://images.unsplash.com/photo-1770563182398-e2e8d2a9501d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";
const IMG_HALONG  = "https://images.unsplash.com/photo-1769432415824-e4bc2ed9bfba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";
const IMG_REFUND  = "https://images.unsplash.com/photo-1658480023495-dc8cae9e781e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";

const SECTIONS = [
  { id: "hero",     label: "Trang chủ" },
  { id: "problems", label: "Vấn đề" },
  { id: "solution", label: "Giải pháp" },
  { id: "audience", label: "Đối tượng" },
];

/* ─────────────────────────────────────────
   Atoms
───────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="40" height="24" viewBox="0 0 107 63" fill="none">
        <defs>
          <linearGradient id="gA" x1="15" x2="353" y1="36" y2="33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9F1D62" /><stop offset="1" stopColor="#00F2FF" />
          </linearGradient>
          <linearGradient id="gB" x1="5" x2="222" y1="45" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9F1D62" /><stop offset="1" stopColor="#00F2FF" />
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
          className="hidden md:block px-5 py-2 rounded-lg text-sm font-bold transition-all hover:brightness-110"
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
      initial={{ opacity: 0, y: 24 }}
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

function Heading({
  eyebrow, title, subtitle, center = false,
}: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <div className={`mb-3 ${center ? "flex justify-center" : ""}`}>
          <Pill text={eyebrow} color={C.primary} />
        </div>
      )}
      <h2
        className="text-3xl md:text-5xl font-black leading-tight mb-3 tracking-[-0.02em]"
        style={{ color: C.dark }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className="text-lg md:text-xl leading-relaxed max-w-3xl"
          style={{ color: C.muted, margin: center ? "0 auto" : undefined }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function GradientDivider() {
  return (
    <div
      className="h-px w-full my-12"
      style={{ background: `linear-gradient(90deg, transparent, ${C.primary}88, transparent)` }}
    />
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center px-4 md:px-5 py-4 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      <span className="text-2xl font-black" style={{ color: C.primary }}>{value}</span>
      <span className="text-sm text-white/75 mt-1 text-center leading-snug">{label}</span>
    </div>
  );
}

function HeroSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col overflow-hidden scroll-mt-20">
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
        style={{ background: "linear-gradient(170deg,rgba(42,42,42,0.90) 0%,rgba(42,42,42,0.70) 50%,rgba(159,29,98,0.42) 100%)" }}
      />
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 md:pt-28 pb-20 md:pb-16">
        <Reveal className="mb-5 flex gap-2 flex-wrap justify-center" y={14}>
          <Pill text="🚀 Ra mắt 2025" color={C.primary} />
          <Pill text="Hybrid Approach — Tiên phong Việt Nam" color="#00F2FF" />
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-5 max-w-4xl" style={{ color: "#fff", letterSpacing: "-0.5px" }}>
            Hành trình vạn dặm,<br />
            <span style={{ color: C.primary }}>bắt đầu bằng một cú click.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-lg md:text-2xl text-white/85 max-w-3xl mb-4 leading-relaxed">
            Nền tảng đặt vé xe khách liên tỉnh tiên phong kết hợp{" "}
            <strong className="message-highlight">tìm kiếm đa phương thức</strong>,{" "}
            <strong className="message-highlight">theo dõi vị trí thời gian thực</strong>{" "}
            và <strong className="message-highlight">gợi ý hành trình thông minh.</strong>
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="inline-flex items-center gap-3 px-4 md:px-6 py-3 rounded-2xl mb-10"
            style={{ background: "rgba(247,172,61,0.15)", border: `1.5px solid ${C.primary}66`, backdropFilter: "blur(8px)" }}
          >
            <span className="text-2xl">⚡</span>
            <span className="text-base md:text-lg font-bold text-white text-left md:text-center">
              Giảm thời gian đặt vé từ <span style={{ color: C.primary }}>5 phút</span> xuống dưới <span style={{ color: C.primary }}>60 giây!</span>
            </span>
          </div>
        </Reveal>

        <Reveal className="flex gap-4 flex-wrap justify-center mb-14 md:mb-16" delay={0.26}>
          <button
            onClick={onCTA}
            className="min-h-12 px-8 py-4 rounded-xl font-bold text-base shadow-2xl hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: C.primary, color: C.dark }}
          >
            Khám phá GoTicket →
          </button>
          <button
            onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
            className="min-h-12 px-8 py-4 rounded-xl font-bold text-base border-2 text-white hover:bg-white/10 transition-all"
            style={{ borderColor: "rgba(255,255,255,0.4)" }}
          >
            Xem 6 tính năng
          </button>
        </Reveal>

        <Reveal className="grid grid-cols-2 md:grid-cols-6 gap-3 max-w-3xl w-full" delay={0.32}>
          <StatBadge value="< 60s"  label="Đặt vé" />
          <StatBadge value="200+"   label="Tuyến xe" />
          <StatBadge value="GPS"    label="Theo dõi xe" />
          <StatBadge value="24/7"   label="Hoàn tiền" />
          <StatBadge value="Auto"   label="Hủy vé" />
          <StatBadge value="AI"     label="Gợi ý điểm đến" />
        </Reveal>
      </div>
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
   PAIN POINTS  (6 pain ↔ 6 features)
───────────────────────────────────────── */
const PAINS = [
  {
    num: "01", icon: "🔀", color: "#e53e3e",
    tag: "Thao tác phân mảnh",
    title: "Mua vé qua 3 app, 7 bước",
    body: "Zalo hỏi giá → Facebook tìm tuyến → App ngân hàng chuyển khoản. Chắp vá, mất thời gian, dễ sai sót.",
    quote: "3 app · 7 bước · 1 tấm vé",
  },
  {
    num: "02", icon: "📊", color: "#d69e2e",
    tag: "Quá tải thông tin",
    title: "Mở chục tab để so sánh giá",
    body: "Không có nơi tổng hợp giá và lịch trình từ nhiều nhà xe. Người dùng phải tự mở và đối chiếu từng trang.",
    quote: "Tab 1, Tab 2, Tab 3... hết pin!",
  },
  {
    num: "03", icon: "😰", color: "#805ad5",
    tag: "Uncertainty Anxiety",
    title: "\"Xe đang ở đâu rồi?\"",
    body: "Không có thông tin vị trí thực tế. Hành khách chờ tại bến xe hoặc lề đường mà không biết còn bao lâu.",
    quote: "Chờ 45 phút mà không biết gì",
  },
  {
    num: "04", icon: "👨‍👩‍👧", color: "#2196f3",
    tag: "Đặt vé nhóm rắc rối",
    title: "Mua vé cho cả nhà = ác mộng",
    body: "Đặt riêng lẻ từng người, không quản lý tập trung, khó chia sẻ mã vé và đồng bộ lịch trình cho cả nhóm.",
    quote: "5 người · 5 đơn · 1 mớ hỗn độn",
  },
  {
    num: "05", icon: "💸", color: "#e53e3e",
    tag: "Rủi ro hủy chuyến",
    title: "Có việc đột xuất = mất tiền?",
    body: "Điều kiện hủy vé mơ hồ, quy trình hoàn tiền phức tạp, phải liên hệ qua nhiều kênh. Người dùng e ngại đặt sớm.",
    quote: "Hủy vé xong chờ hoàn tiền cả tháng",
  },
  {
    num: "06", icon: "🗺️", color: "#4caf50",
    tag: "Không biết đi đâu",
    title: "Muốn đi nhưng không biết chọn đâu",
    body: "Tự tìm kiếm địa điểm từ nhiều nguồn tốn thời gian, không biết điểm nào hợp sở thích, ngân sách và mùa du lịch.",
    quote: "Mở Google xong lại đóng vì quá nhiều lựa chọn",
  },
];

function PainCard({ num, icon, color, tag, title, body, quote }: typeof PAINS[0]) {
  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-3 md:hover:-translate-y-1 transition-all duration-300"
      style={{ background: "#fff", border: `1.5px solid ${color}30`, boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
    >
      <span className="absolute top-4 right-5 text-5xl font-black select-none" style={{ color: color + "18" }}>{num}</span>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: color + "15" }}>
        {icon}
      </div>
      <Pill text={tag} color={color} />
      <h3 className="font-black text-lg leading-snug" style={{ color: C.dark }}>{title}</h3>
      <p className="text-base leading-relaxed" style={{ color: C.body }}>{body}</p>
      <div className="mt-auto rounded-xl px-4 py-2.5 text-xs font-semibold italic" style={{ background: color + "0f", color, borderLeft: `3px solid ${color}` }}>
        "{quote}"
      </div>
    </div>
  );
}

function ProblemsSection() {
  return (
    <section id="problems" className="py-16 md:py-24 px-4 scroll-mt-20" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Heading
            eyebrow="😤 6 Vấn đề thực tế"
            title={`Tại sao đặt vé xe vẫn còn<br/><span style="color:#9F1D62">quá khó chịu?</span>`}
            subtitle="6 điểm đau lớn nhất mà hành khách Việt Nam đang phải chịu đựng mỗi ngày — GoTicket giải quyết triệt để từng vấn đề."
          />
        </Reveal>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAINS.map((p) => (
            <StaggerItem key={p.num}>
              <PainCard {...p} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.08}>
          <div
            className="mt-10 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-5"
            style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.burgundy} 100%)` }}
          >
            <div className="text-5xl flex-shrink-0">🎯</div>
            <div>
              <div className="font-black text-white text-xl mb-1">GoTicket thiết kế 6 tính năng cốt lõi — giải quyết đúng 6 vấn đề trên.</div>
              <div className="text-white/80 text-base leading-relaxed">
                Mô hình <strong className="message-highlight">Hybrid Approach</strong> độc đáo: tổng hợp tìm kiếm + GPS thời gian thực +
                hủy/hoàn tự động + gợi ý hành trình thông minh — tất cả trong một nền tảng duy nhất.
              </div>
            </div>
            <button
              onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
              className="min-h-11 flex-shrink-0 px-6 py-3 rounded-xl font-bold text-base hover:brightness-110 transition-all"
              style={{ background: C.primary, color: C.dark }}
            >
              Xem 6 tính năng →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SOLUTION  (6 features)
───────────────────────────────────────── */
const FEATURES = [
  {
    num: "01",
    icon: "🔍",
    label: "Search-First",
    accent: C.primary,
    solveNum: "01 + 02",
    title: "Tìm kiếm & So sánh minh bạch",
    body: "Giao diện tổng hợp dạng danh sách giúp bạn dễ dàng so sánh giá vé, giờ chạy và loại xe của hàng trăm nhà xe chỉ trên một màn hình duy nhất. Không còn nhảy qua lại giữa các app hay mở chục tab.",
    solves: "Giải quyết vấn đề 01 & 02",
    img: null,
  },
  {
    num: "02",
    icon: "📍",
    label: "Map-Centric",
    accent: "#2196f3",
    solveNum: "03",
    title: "Định vị xe thời gian thực (GPS)",
    body: "Tích hợp bản đồ GPS cập nhật vị trí xe liên tục. Bạn biết chính xác xe đang ở đâu, còn bao nhiêu phút đến điểm đón — xóa bỏ hoàn toàn nỗi bất an khi chờ đợi ngoài đường.",
    solves: "Giải quyết vấn đề 03",
    img: IMG_GPS,
  },
  {
    num: "03",
    icon: "🤝",
    label: "Group Booking",
    accent: C.burgundy,
    solveNum: "04",
    title: "Đặt vé nhóm & Chia sẻ lộ trình",
    body: "Quản lý giỏ hàng thông minh cho nhiều người trong cùng một đơn. Chia sẻ mã vé và lộ trình thời gian thực cho từng thành viên nhóm chỉ với một link — đặt cho cả gia đình nhanh như đặt cho 1 người.",
    solves: "Giải quyết vấn đề 04",
    img: IMG_GROUP,
  },
  {
    num: "04",
    icon: "⚡",
    label: "Flash Booking",
    accent: "#ff6b35",
    solveNum: "01",
    title: "Đặt vé siêu tốc — dưới 60 giây",
    body: "Toàn bộ quy trình từ chọn chuyến đến xác nhận thanh toán được tối giản tối đa. Hỗ trợ lưu thông tin, đặt lại chuyến cũ và thanh toán một chạm — phù hợp với người bận rộn cần đặt vé nhanh.",
    solves: "Giải quyết vấn đề 01",
    img: null,
  },
  {
    num: "05",
    icon: "🔄",
    label: "Auto-Refund",
    accent: "#4caf50",
    solveNum: "05",
    title: "Hủy vé & Hoàn tiền minh bạch",
    body: "Chính sách hủy vé rõ ràng theo từng mốc thời gian. Quy trình hoàn tiền tự động hóa hoàn toàn — không cần gọi điện, không cần chờ nhân viên xử lý. Hỗ trợ đổi chuyến linh hoạt khi có việc đột xuất.",
    solves: "Giải quyết vấn đề 05",
    img: IMG_REFUND,
  },
  {
    num: "06",
    icon: "🗺️",
    label: "Smart Suggest",
    accent: "#9c27b0",
    solveNum: "06",
    title: "Gợi ý địa điểm du lịch phù hợp",
    body: "Hệ thống gợi ý thông minh dựa trên sở thích, ngân sách và thời gian của bạn. Khám phá điểm đến hấp dẫn, đọc cẩm nang du lịch và đặt vé xe ngay trong cùng một nền tảng — từ cảm hứng đến chuyến đi.",
    solves: "Giải quyết vấn đề 06",
    img: IMG_HALONG,
  },
];

function FeatureCard({
  num, icon, label, accent, title, body, solves, img, reverse,
}: typeof FEATURES[0] & { reverse?: boolean }) {
  return (
    <div
      className={`rounded-3xl overflow-hidden flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} md:hover:shadow-xl transition-shadow duration-300`}
      style={{ background: "#fff", border: `1.5px solid ${accent}22`, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
    >
      {/* text */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: accent + "18" }}>
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <Pill text={label} color={accent} />
            <span className="text-xs font-black" style={{ color: accent + "88" }}>#{num}</span>
          </div>
        </div>
        <h3 className="text-2xl font-black leading-snug" style={{ color: C.dark }}>{title}</h3>
        <p className="text-base leading-relaxed" style={{ color: C.body }}>{body}</p>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold w-fit"
          style={{ background: accent + "12", color: accent }}
        >
          ✅ {solves}
        </div>
      </div>
      {/* visual */}
      <div
        className="w-full md:w-72 h-52 md:h-auto flex-shrink-0 flex items-center justify-center relative overflow-hidden"
        style={{ background: img ? undefined : accent + "0c" }}
      >
        {img
          ? <img src={img} alt={title} className="w-full h-full object-cover" />
          : <span className="text-9xl opacity-10">{icon}</span>
        }
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}00)` }} />
      </div>
    </div>
  );
}

function SolutionSection() {
  return (
    <section id="solution" className="py-16 md:py-24 px-4 scroll-mt-20" style={{ background: C.cream }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Heading
            eyebrow="✨ 6 Tính năng cốt lõi"
            title={`GoTicket giải quyết triệt để<br/><span style="color:#f7ac3d">đúng 6 vấn đề</span> trên`}
            subtitle="Mỗi tính năng được thiết kế có chủ đích, phản hồi trực tiếp một pain point cụ thể — không có tính năng nào là thừa."
          />
        </Reveal>

        {/* Hybrid model badge */}
        <Reveal delay={0.06}>
          <div
            className="rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-center gap-5"
            style={{ background: "#fff", border: `2px solid ${C.primary}44`, boxShadow: `0 0 40px ${C.primary}14` }}
          >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: C.primary + "20" }}>🧬</div>
          <div className="flex-1">
            <div className="font-black text-xl mb-1" style={{ color: C.dark }}>
              Mô hình <span style={{ color: C.primary }}>"Hybrid Approach"</span> — Tích hợp toàn diện
            </div>
            <div className="text-base leading-relaxed" style={{ color: C.body }}>
              GoTicket không đơn thuần là app đặt vé. Chúng tôi tích hợp <strong>Search-First</strong> (OTA),{" "}
              <strong>Map-Centric</strong> (GPS tracking), <strong>Auto-Refund</strong> (tự động hóa),{" "}
              <strong>Group Booking</strong> (quản lý nhóm), <strong>Flash Booking</strong> (đặt siêu tốc){" "}
              và <strong>Smart Suggest</strong> (AI gợi ý) — tất cả trên một nền tảng duy nhất.
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-center flex-shrink-0 max-w-xs">
            {["Search-First", "Map-Centric", "Auto-Refund", "Group Booking", "Flash Booking", "Smart Suggest"].map((t, i) => (
              <Pill key={t} text={t} color={[C.primary,"#2196f3",C.burgundy,"#ff6b35","#4caf50","#9c27b0"][i]} />
            ))}
          </div>
          </div>
        </Reveal>

        {/* Feature matrix header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.primary}44, transparent)` }} />
          <span className="text-sm font-bold px-4" style={{ color: C.muted }}>Chi tiết 6 tính năng</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${C.primary}44)` }} />
        </div>

        <Stagger className="flex flex-col gap-5">
          {FEATURES.map((f, i) => (
            <StaggerItem key={f.num}>
              <FeatureCard {...f} reverse={i % 2 === 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   TARGET AUDIENCE
───────────────────────────────────────── */
const AUDIENCES = [
  {
    icon: "🎓",
    label: "Sinh viên",
    color: "#2196f3",
    img: IMG_STUDENT,
    headline: "Săn vé rẻ, đi tiết kiệm hơn",
    pains: ["Ngân sách eo hẹp, cần tối ưu chi phí", "Hay về quê dịp lễ, vé nhanh hết"],
    gains: [
      "Lọc theo giá rẻ nhất, so sánh nhà xe nhanh (tính năng 01)",
      "Theo dõi xe GPS — biết đúng lúc nào ra bến (tính năng 02)",
      "Nhận gợi ý điểm đến phù hợp ngân sách sinh viên (tính năng 06)",
    ],
  },
  {
    icon: "💼",
    label: "Người đi làm bận rộn",
    color: C.primary,
    img: IMG_WORKER,
    headline: "Chốt vé 60 giây, ra bến đúng giờ",
    pains: ["Lịch trình dày, không có nhiều thời gian", "Sợ có việc đột xuất mà mất tiền vé"],
    gains: [
      "Flash Booking — đặt vé dưới 60 giây (tính năng 04)",
      "Theo dõi vị trí xe, căn giờ ra bến chính xác (tính năng 02)",
      "Hủy vé & hoàn tiền tự động khi bận đột xuất (tính năng 05)",
    ],
  },
  {
    icon: "👨‍👩‍👧‍👦",
    label: "Người đặt hộ (Power Users)",
    color: C.burgundy,
    img: IMG_GROUP,
    headline: "Quản lý vé cả gia đình, nhóm bạn",
    pains: ["Hay mua vé cho nhiều người cùng lúc", "Khó gửi mã vé, đồng bộ lịch trình cho cả nhóm"],
    gains: [
      "Group Booking — đặt nhiều vé một lần, quản lý tập trung (tính năng 03)",
      "Chia sẻ lộ trình và mã vé cho từng người bằng 1 link (tính năng 03)",
      "Gợi ý hành trình nhóm theo ngân sách và sở thích (tính năng 06)",
    ],
  },
];

function AudienceCard({ icon, label, color, img, headline, pains, gains }: typeof AUDIENCES[0]) {
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col md:hover:shadow-xl transition-shadow duration-300"
      style={{ background: "#fff", border: `1.5px solid ${color}30` }}
    >
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img src={img} alt={label} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(0deg,${color}cc 0%,transparent 60%)` }} />
        <div className="absolute bottom-4 left-5 flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">Dành cho</div>
            <div className="text-lg font-black text-white leading-tight">{label}</div>
          </div>
        </div>
      </div>
      <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
        <h3 className="font-black text-xl leading-snug" style={{ color: C.dark }}>{headline}</h3>
        <div className="rounded-xl p-4 flex flex-col gap-1.5" style={{ background: color + "0a", border: `1px solid ${color}20` }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color }}>Nỗi đau</div>
          {pains.map((p) => (
            <div key={p} className="flex gap-2 text-sm" style={{ color: C.body }}>
              <span style={{ color: "#e53e3e", flexShrink: 0 }}>✗</span>{p}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color }}>GoTicket mang lại</div>
          {gains.map((g) => (
            <div key={g} className="flex gap-2 text-sm items-start" style={{ color: C.body }}>
              <span className="flex-shrink-0 mt-0.5" style={{ color }}>✓</span>{g}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AudienceSection() {
  return (
    <section id="audience" className="py-16 md:py-24 px-4 scroll-mt-20" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Heading
            eyebrow="👥 Đối tượng mục tiêu"
            title={`GoTicket phù hợp với <span style="color:#f7ac3d">ai?</span>`}
            subtitle="3 nhóm người dùng cốt lõi với nhu cầu riêng biệt. Mỗi nhóm được GoTicket phục vụ bằng tập hợp tính năng phù hợp nhất."
            center
          />
        </Reveal>
        <Stagger className="grid md:grid-cols-3 gap-6 mb-12">
          {AUDIENCES.map((a) => (
            <StaggerItem key={a.label}>
              <AudienceCard {...a} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Feature × Audience matrix */}
        <Reveal delay={0.06}>
          <div
            className="rounded-2xl p-6 mb-12 overflow-x-auto"
            style={{ background: C.cream, border: `1.5px solid ${C.primary}33` }}
          >
          <div className="font-black text-base mb-5" style={{ color: C.dark }}>Ma trận tính năng × Đối tượng</div>
          <table className="w-full text-sm border-collapse" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                <th className="text-left py-2 pr-4 font-bold" style={{ color: C.muted, fontSize: 12 }}>Tính năng</th>
                {["🎓 Sinh viên", "💼 Người đi làm", "👨‍👩‍👧‍👦 Power Users"].map((h) => (
                  <th key={h} className="text-center py-2 px-3 font-bold" style={{ color: C.dark, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "🔍 Tìm kiếm & So sánh", vals: [true, true, true] },
                { name: "📍 GPS Thời gian thực",  vals: [true, true, false] },
                { name: "🤝 Đặt vé nhóm",         vals: [false, false, true] },
                { name: "⚡ Flash Booking <60s",   vals: [false, true, false] },
                { name: "🔄 Hủy vé & Hoàn tiền",  vals: [true, true, true] },
                { name: "🗺️ Gợi ý địa điểm",       vals: [true, false, true] },
              ].map((row, ri) => (
                <tr key={row.name} style={{ background: ri % 2 === 0 ? "rgba(247,172,61,0.04)" : "transparent" }}>
                  <td className="py-2.5 pr-4 font-semibold text-xs" style={{ color: C.dark }}>{row.name}</td>
                  {row.vals.map((v, vi) => (
                    <td key={vi} className="text-center py-2.5 px-3 text-base">
                      {v ? <span style={{ color: "#4caf50" }}>✓</span> : <span style={{ color: "#ddd" }}>—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Reveal>

        <GradientDivider />

        {/* CTA */}
        <Reveal delay={0.1}>
          <div
            className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.burgundy} 100%)` }}
          >
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: C.primary }} />
          <div className="relative">
            <div className="text-5xl mb-4">🚌</div>
            <h3 className="text-3xl font-black text-white mb-3">Sẵn sàng khởi hành?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Trải nghiệm nền tảng đặt vé xe khách thông minh nhất Việt Nam. Tìm kiếm, đặt vé, theo dõi và hoàn tiền — tất cả trong một ứng dụng.
            </p>
            <div className="text-white/60 text-sm font-semibold">
              Trang giới thiệu dự án - không mở đặt vé trực tiếp.
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER
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
        <div className="grid md:grid-cols-4 gap-8 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="md:col-span-2">
            <Logo />
            <p className="text-sm leading-relaxed mt-4 max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Nền tảng đặt vé xe khách liên tỉnh tiên phong tại Việt Nam.<br />Tiện lợi · Nhanh gọn · Minh bạch.
            </p>
            <div className="flex gap-2 mt-5 flex-wrap">
              {["🔍 Search-First","📍 Map-Centric","🔄 Auto-Refund","🗺️ Smart Suggest"].map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-md" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-white mb-4 text-sm">Điều hướng</div>
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => onNav(s.id)} className="block text-sm mb-2 text-left hover:underline" style={{ color: "rgba(255,255,255,0.45)" }}>
                {s.label}
              </button>
            ))}
          </div>
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
        <div className="pt-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
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
      { threshold: 0.25 }
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
      <Footer onNav={scrollTo} />
    </div>
  );
}
