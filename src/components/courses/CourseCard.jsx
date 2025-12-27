import Image from 'next/image';
import LinkTag from '../ui/LinkTag';
// import GlassCard from '@/components/ui/GlassCard';

export default function CourseCard({
  id,
  title,
  price,
  category,
  isPublished,
  imageUrl,
  chaptersLength,
  baseUrl = '/teacher/courses', // 🆕 Default to teacher, override for students
}) {
  return (
    <LinkTag path={`${baseUrl}/${id}`}>
      {/* Glass Effect Card
        - Hover: Scales slightly and glows
        - Layout: Flex Column to stack Image -> Content -> Footer 
      */}
      <div className="group hover:shadow-2xl transition overflow-hidden border border-slate-700 rounded-lg p-3 h-full bg-slate-900/40 backdrop-blur-md hover:bg-slate-800/60 hover:border-slate-600 flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-slate-800 border border-slate-700/50">
          {imageUrl ? (
            <Image
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              alt={title}
              src={imageUrl}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 bg-slate-800">
              <span className="text-4xl opacity-50">📷</span>
            </div>
          )}
        </div>

        {/* Content Section (Title, Category, Chapters) */}
        {/* 🛠️ FIX: Changed to 'flex-col' so items stack vertically */}
        <div className="flex flex-col pt-4 grow">
          <div className="text-lg md:text-base font-medium text-slate-200 group-hover:text-sky-400 transition line-clamp-2 leading-tight">
            {title}
          </div>

          <p className="text-xs text-slate-400 mt-2 font-light">{category || 'Uncategorized'}</p>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-400 bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700/50">
              <span>📘</span>
              <span>
                {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Section (Price & Status) */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/50">
          <p className="text-md md:text-sm font-medium text-slate-200">
            {price ? `$${price}` : 'Free'}
          </p>

          <div
            className={`text-xs px-2 py-1 rounded-full border ${
              isPublished
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
            }`}
          >
            {isPublished ? 'Published' : 'Draft'}
          </div>
        </div>
      </div>
    </LinkTag>
  );
}
