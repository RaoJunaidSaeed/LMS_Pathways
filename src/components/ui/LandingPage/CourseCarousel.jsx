'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Link from 'next/link';

export default function CourseCarousel({ courses }) {
  // Setup Embla Carousel with AutoScroll Plugin
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  // Fallback if no courses exist
  if (!courses || courses.length === 0) return null;

  // Duplicate items if there are too few to loop smoothly
  const carouselItems = courses.length < 5 ? [...courses, ...courses, ...courses] : courses;

  return (
    <div className="relative w-[85%] md:w-[90%] mask-gradient">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6 px-4">
          {carouselItems.map((course, index) => (
            <div key={`${course._id}-${index}`} className="flex-[0_0_auto] min-w-0">
              <Link href={`/student/courses/${course._id}`}>
                <div className="w-72 group relative bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing">
                  {/* Thumbnail */}
                  <div className="h-40 w-full rounded-xl overflow-hidden relative mb-4 bg-gray-200">
                    <img
                      src={course.imageUrl || 'https://placehold.co/600x400?text=Course'}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-5 h-5 text-blue-600 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-2 pb-2">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{course.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-sm">
                        {course.price ? `$${course.price}` : 'Free'}
                      </p>
                      <span className="text-gray-400 text-sm">{course.category || 'Course'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }
      `}</style>
    </div>
  );
}
