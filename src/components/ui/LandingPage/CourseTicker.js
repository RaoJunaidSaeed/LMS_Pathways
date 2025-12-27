import React from 'react';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import CourseCarousel from '@/components/ui/LandingPage/CourseCarousel'; // Adjust path if needed

export default async function CourseTicker() {
  // 1. Fetch Real Data from DB
  await connectDB();

  const courses = await Course.find({ isPublished: true })
    .sort({ createdAt: -1 }) // Show newest courses first
    .limit(10) // Limit to 10 items for performance
    .lean();

  // Serialization for Next.js (Convert _id and dates to strings)
  const serializedCourses = JSON.parse(JSON.stringify(courses));

  return (
    <section className="py-20 bg-gray-50 flex justify-center flex-col items-center overflow-hidden relative">
      {/* Header Section */}
      <div className="container text-center max-w-3xl mx-auto px-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
          Popular Content
        </div>
        <div className="flex flex-col justify-between items-center gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Trending Courses <span className="text-blue-600">This Week</span>
            </h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg font-medium">
              Explore our highest-rated sessions and start learning from the best.
            </p>
          </div>

          <Link
            href="/courses"
            className="group relative inline-flex items-center gap-3 px-6 md:px-8 py-2 md:py-4 bg-white text-blue-600 font-medium md:font-bold rounded-full shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <span>View All Courses</span>
            <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* 2. Pass Data to Client Carousel */}
      <CourseCarousel courses={serializedCourses} />
    </section>
  );
}

// 'use client';

// import React, { useCallback, useState } from 'react';
// import Link from 'next/link';
// import useEmblaCarousel from 'embla-carousel-react';
// import AutoScroll from 'embla-carousel-auto-scroll';
// import { getYouTubeThumbnail } from '@/lib/utils';

// const topCourses = [
//   {
//     id: 1,
//     title: 'React Mastery',
//     price: '$49',
//     videoLink: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
//   },
//   { id: 2, title: 'Next.js Guide', price: '$59', videoLink: 'https://youtu.be/ZVnjOPwW4ZA' },
//   {
//     id: 3,
//     title: 'Python for AI',
//     price: '$69',
//     videoLink: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
//   },
//   {
//     id: 4,
//     title: 'UI/UX Design',
//     price: '$39',
//     videoLink: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
//   },
// ];

// export default function CourseTicker() {
//   // 1. Setup Embla Carousel with AutoScroll Plugin
//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     {
//       loop: true, // Enables infinite looping
//       dragFree: true, // Allows smooth dragging without snapping to slides
//     },
//     [
//       AutoScroll({
//         playOnInit: true,
//         speed: 1, // Adjust speed (higher = faster)
//         stopOnInteraction: false, // Keeps scrolling after you let go
//         stopOnMouseEnter: true, // Stops when mouse hovers (Desktop)
//       }),
//     ]
//   );

//   return (
//     <section className="py-20 bg-gray-50 flex justify-center flex-col items-center overflow-hidden relative">
//       {/* Header Section */}
//       <div className="container text-center max-w-3xl mx-auto px-4 mb-12">
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
//           Popular Content
//         </div>
//         <div className="flex flex-col justify-between items-center gap-8">
//           <div className="max-w-2xl">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
//               Trending Courses <span className="text-blue-600">This Week</span>
//             </h2>
//             <p className="text-gray-500 mt-3 text-base md:text-lg font-medium">
//               Explore our highest-rated sessions and start learning from the best.
//             </p>
//           </div>

//           <Link
//             href="/courses"
//             className="group relative inline-flex items-center gap-3 px-6 md:px-8 py-2 md:py-4 bg-white text-blue-600 font-medium md:font-bold rounded-full shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//           >
//             <span>View All Courses</span>
//             <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
//               <svg
//                 className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* 2. EMBLA CAROUSEL WRAPPER
//          The structure is very specific: Viewport (Overflow hidden) -> Container (Flex) -> Slides
//       */}
//       <div className="relative w-[85%] md:w-[90%]  mask-gradient">
//         <div className="overflow-hidden" ref={emblaRef}>
//           <div className="flex touch-pan-y gap-6 px-4">
//             {/* Note: We typically don't need manual duplication logic [...arr, ...arr] here
//                 because Embla's 'loop: true' handles it. However, if you have very few items
//                 (less than screen width), duplicating them ensures the loop works smoothly. */}

//             {[...topCourses, ...topCourses, ...topCourses].map((course, index) => {
//               const thumbnailUrl = getYouTubeThumbnail(course.videoLink, 'hq');
//               return (
//                 <div
//                   key={`${course.id}-${index}`}
//                   className="flex-[0_0_auto] min-w-0" // Critical for Embla: Prevents crushing
//                 >
//                   <div className="w-72 group relative bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing">
//                     {/* Thumbnail */}
//                     <div className="h-40 w-full rounded-xl overflow-hidden relative mb-4 bg-gray-200">
//                       <img
//                         src={thumbnailUrl}
//                         alt={course.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" // pointer-events-none prevents dragging the image itself
//                         onError={(e) => {
//                           e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image';
//                         }}
//                       />
//                       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
//                         <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//                           <svg
//                             className="w-5 h-5 text-blue-600 ml-1"
//                             fill="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path d="M8 5v14l11-7z" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="px-2 pb-2">
//                       <h3 className="font-bold text-lg text-gray-900 truncate">{course.title}</h3>
//                       <div className="flex justify-between items-center mt-2">
//                         <p className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-sm">
//                           {course.price}
//                         </p>
//                         <span className="text-gray-400 text-sm">Video Lesson</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* We keep the mask gradient for the fade effect */
//         .mask-gradient {
//           mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
//           -webkit-mask-image: linear-gradient(
//             to right,
//             transparent,
//             black 5%,
//             black 95%,
//             transparent
//           );
//         }
//       `}</style>
//     </section>
//   );
// }
