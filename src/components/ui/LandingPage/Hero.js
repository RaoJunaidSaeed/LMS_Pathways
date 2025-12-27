import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server'; // 1. Import currentUser to get role
import { SignUpButton } from '@clerk/nextjs';

const sideImage = '/lms2.avif';

export default async function HeroSplit() {
  // 2. Fetch User Data
  const { userId } = await auth();
  const user = await currentUser();

  // 3. Define Logic: Where should they go?
  const role = user?.publicMetadata?.role;

  // If teacher, go to specific course manager. If student, go to main dashboard.
  const targetHref = role === 'teacher' ? '/teacher/courses' : '/student/dashboard';
  const buttonText = role === 'teacher' ? 'Instructor Dashboard' : 'Continue Learning';

  return (
    <section className="relative bg-linear-to-br from-blue-50 via-white to-blue-100 overflow-hidden py-16 md:py-24 px-6">
      <div className="absolute top-0 left-0 h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-200/40 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
              {userId ? (
                // IF LOGGED IN: Dynamic Button based on Role
                <Link
                  href={targetHref}
                  className="px-4 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {buttonText}
                </Link>
              ) : (
                // IF LOGGED OUT: Sign Up Modal
                <>
                  <SignUpButton mode="modal">
                    <button className="px-4 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer">
                      Start Learning
                    </button>
                  </SignUpButton>

                  <SignUpButton mode="modal">
                    <button className="px-4 md:px-8 py-3 md:py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-full font-bold text-base md:text-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                      Become Instructor
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative md:h-[500px]">
            <div className="absolute inset-0 bg-linear-to-br from-blue-200/40 to-white/40 backdrop-blur-lg rounded-[30px] transform rotate-3 scale-105 border border-white/50 shadow-xl"></div>
            <div className="relative h-full w-full rounded-[30px] overflow-hidden shadow-2xl border-4 border-white scale-100 hover:scale-[1.02] transition-transform duration-500">
              <img
                src={sideImage}
                alt="Students collaborating"
                className="w-full h-full object-cover"
              />
            </div>
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

// import Link from 'next/link';
// // In a real app, import Image from 'next/image'

// const sideImage = './lms2.avif';

// export default function HeroSplit() {
//   return (
//     <section className="relative  bg-linear-to-br from-blue-50 via-white to-blue-100 overflow-hidden py-16 md:py-24 px-6">
//       <div className="absolute top-0 left-0  h-full overflow-hidden z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full filter blur-[100px]"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-200/40 rounded-full filter blur-[100px]"></div>
//       </div>

//       <div className="container mx-auto relative z-10">
//         <div className="grid md:grid-cols-2  gap-12 items-center">
//           <div className="space-y-8 text-left">
//             <span className="inline-block py-1 px-3 rounded-full bg-blue-100/80 text-blue-700 text-sm font-semibold mb-4 backdrop-blur-md border border-blue-200">
//               🚀 Welcome to the Future of Learning
//             </span>

//             <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
//               Teach & Learn without limits on our{' '}
//               <span className="text-blue-600 relative inline-block">
//                 LMS Platform
//                 <svg
//                   className="absolute -bottom-2 w-full left-0 text-yellow-300"
//                   height="10"
//                   viewBox="0 0 200 10"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M2 8C56.5 1.5 146.5 1.5 198 8"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               </span>
//             </h1>

//             <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
//               Our intuitive platform connects students with expert-led courses and gives teachers
//               the tools they need to succeed.
//             </p>

//             <div className="flex gap-2 md:gap-4 pt-4">
//               <Link
//                 href="/sign-up"
//                 className="px-4 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
//               >
//                 Start Learning
//               </Link>
//               <Link
//                 href="/sign-up"
//                 className="px-4 md:px-8 py-3 md:py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-full font-bold text-base md:text-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
//               >
//                 Become Instructor
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: Image with Glass Effect */}
//           <div className="relative md:h-[500px]">
//             {/* The "Glass" Frame behind the image */}
//             <div className="absolute inset-0 bg-linear-to-br from-blue-200/40 to-white/40 backdrop-blur-lg rounded-[30px] transform rotate-3 scale-105 border border-white/50 shadow-xl"></div>

//             {/* The actual image container */}
//             <div className="relative h-full w-full rounded-[30px] overflow-hidden shadow-2xl border-4 border-white scale-100 hover:scale-[1.02] transition-transform duration-500">
//               <img
//                 src={sideImage}
//                 alt="Students collaborating"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Floating Glass Card on top of image */}
//             <div className="absolute -bottom-6 -left-3 md:-left-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3 animate-bounce-slow">
//               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
//                 ✓
//               </div>
//               <div>
//                 <p className="font-bold text-gray-800">10k+ Students</p>
//                 <p className="text-sm text-gray-500">Active today</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
