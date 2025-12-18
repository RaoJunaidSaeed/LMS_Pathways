import Link from 'next/link';

export default function LinkTag({ path, children }) {
  return (
    <Link
      href={path}
      className="text-gray-600 hover:text-gray-700 transition-all  transform hover:-translate-y-0.5 text-lg cursor-pointer font-medium "
    >
      {children}
    </Link>
  );
}
