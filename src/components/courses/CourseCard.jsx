import Image from 'next/image'; // 1. Import Image component
import LinkTag from '../ui/LinkTag';

// 2. Add 'imageUrl' to the props list
export default function CourseCard({ id, title, price, category, isPublished, imageUrl }) {
  return (
    <LinkTag path={`/teacher/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full bg-white">
        {/* Image Container */}
        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-slate-200">
          {imageUrl ? (
            <Image fill className="object-cover" alt={title} src={imageUrl} />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">📷</div>
          )}
        </div>

        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-blue-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-slate-500">
            {category || 'Uncategorized'}
          </p>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <span>📘</span>
              <span>Chapters</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <p className="text-md md:text-sm font-medium text-slate-700">
              {price ? `$${price}` : 'Free'}
            </p>
            <div
              className={`text-xs px-2 py-1 rounded-full ${
                isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {isPublished ? 'Published' : 'Draft'}
            </div>
          </div>
        </div>
      </div>
    </LinkTag>
  );
}
