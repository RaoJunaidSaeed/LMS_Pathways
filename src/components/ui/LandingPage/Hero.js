import Link from 'next/link';
// In a real app, import Image from 'next/image'

const sideImage = './lms2.avif';

export default function HeroSplit() {
  return (
    <section className="relative  bg-linear-to-br from-blue-50 via-white to-blue-100 overflow-hidden py-16 md:py-24 px-6">
      <div className="absolute top-0 left-0  h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-200/40 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2  gap-12 items-center">
          <div className="space-y-8 text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100/80 text-blue-700 text-sm font-semibold mb-4 backdrop-blur-md border border-blue-200">
              🚀 Welcome to the Future of Learning
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Teach & Learn without limits on our{' '}
              <span className="text-blue-600 relative inline-block">
                LMS Platform
                <svg
                  className="absolute -bottom-2 w-full left-0 text-yellow-300"
                  height="10"
                  viewBox="0 0 200 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C56.5 1.5 146.5 1.5 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
              Our intuitive platform connects students with expert-led courses and gives teachers
              the tools they need to succeed.
            </p>

            <div className="flex gap-2 md:gap-4 pt-4">
              <Link
                href="/signup"
                className="px-4 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Start Learning
              </Link>
              <Link
                href="/teach"
                className="px-4 md:px-8 py-3 md:py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-full font-bold text-base md:text-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                Become Instructor
              </Link>
            </div>
          </div>

          {/* Right Column: Image with Glass Effect */}
          <div className="relative md:h-[500px]">
            {/* The "Glass" Frame behind the image */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-200/40 to-white/40 backdrop-blur-lg rounded-[30px] transform rotate-3 scale-105 border border-white/50 shadow-xl"></div>

            {/* The actual image container */}
            <div className="relative h-full w-full rounded-[30px] overflow-hidden shadow-2xl border-4 border-white scale-100 hover:scale-[1.02] transition-transform duration-500">
              <img
                src={sideImage}
                alt="Students collaborating"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Glass Card on top of image */}
            <div className="absolute -bottom-6 -left-3 md:-left-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                ✓
              </div>
              <div>
                <p className="font-bold text-gray-800">10k+ Students</p>
                <p className="text-sm text-gray-500">Active today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// const sideImage =
//   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// 😎😎😎📂📂🗃️🗃️🗃️✨✨🌟🌟❌❌❌💡💡💡🫂🫂🫂👤👤👤💎💎💎🗒️🗒️🗒️ℹ️ℹ️

// import Link from 'next/link';

// const bgImage = './lms1.avif';

// export default function Hero() {
//   return (
//     <section className="relative min-h-[600px] w-full flex items-center justify-center overflow-hidden">
//       {/* 1. The Background Image with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center z-0"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         {/* Dark gradient overlay to ensure text readability */}
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75"></div>
//       </div>

//       {/* Decorative blurry blobs behind the glass */}
//       <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//       <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

//       {/* 2. The Glassmorphism Content Card */}
//       <div className="relative z-10 container mx-auto px-6 text-center">
//         <div className="max-w-4xl mx-auto p-8 md:p-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl space-y-8">
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-sm">
//             Master New Skills with{' '}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
//               Expert-Led
//             </span>{' '}
//             Courses
//           </h1>

//           <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed">
//             Unlock your potential by learning from the best industry professionals. Join 10,000+
//             students and teachers on our modern LMS platform today.
//           </p>

//           <div className="pt-4">
//             <Link
//               href="/courses"
//               className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 border border-blue-400/50"
//             >
//               Explore Courses
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // const bgImage =
// //   'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
