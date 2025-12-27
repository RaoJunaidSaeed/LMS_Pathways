'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string'; // Make sure to run: npm install query-string

// Icon mapping (optional - adds icons to your categories)
const iconMap = {
  Music: '🎵',
  Photography: '📷',
  Fitness: '💪',
  Accounting: '📊',
  'Computer Science': '💻',
  Filming: '🎥',
  Engineering: '⚙️',
};

export default function Categories({ items }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get('categoryId');
  const currentTitle = searchParams.get('title');

  const onClick = (categoryId) => {
    const isSelected = currentCategoryId === categoryId;

    // Toggle: If clicking the same one, remove it. If new, set it.
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : categoryId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {items.map((item) => {
        const isSelected = currentCategoryId === item.name; // Assuming filtering by Name

        return (
          <button
            key={item._id}
            onClick={() => onClick(item.name)}
            className={`
              flex items-center text-xs font-medium px-3 py-2 rounded-full transition whitespace-nowrap border
              ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-600 shadow-[0_0_10px_rgba(14,165,233,0.3)]'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
              }
            `}
          >
            {/* Show icon if mapped, otherwise hidden */}
            {iconMap[item.name] && <span className="mr-2">{iconMap[item.name]}</span>}
            {item.name}
          </button>
        );
      })}
    </div>
  );
}
