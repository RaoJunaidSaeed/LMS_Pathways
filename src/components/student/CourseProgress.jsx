export default function CourseProgress({ value, variant }) {
  // Styles based on variant
  const colorClass = variant === 'success' ? 'bg-emerald-500' : 'bg-sky-500';

  return (
    <div className="p-4">
      <div className="h-2 w-[200px] bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
        <div
          className={`h-full transition-all duration-500 ease-in-out ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p
        className={`font-medium mt-2 ml-2 text-sm ${
          variant === 'success' ? 'text-emerald-400' : 'text-sky-400'
        }`}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
}
