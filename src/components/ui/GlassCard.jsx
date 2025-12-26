export default function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`
        rounded-xl 
        border border-white/10 
        bg-black/20 
        backdrop-blur-lg 
        shadow-2xl 
        p-6 
        transition-all 
        duration-300 
        hover:border-white/20
        hover:bg-black/30
        ${className}
      `}
    >
      {children}
    </div>
  );
}
