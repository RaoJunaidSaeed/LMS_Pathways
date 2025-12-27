import React from 'react';
import { Search, CreditCard, PlayCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server'; // 1. Import currentUser
import { SignUpButton } from '@clerk/nextjs';

export default async function HowItWorks() {
  // 2. Fetch User and Role
  const { userId } = await auth();
  const user = await currentUser();

  // 3. Determine Destination URL based on Role
  const role = user?.publicMetadata?.role;
  const targetHref = role === 'teacher' ? '/teacher/courses' : '/';

  const steps = [
    {
      id: 1,
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: 'Browse & Discover',
      desc: 'Search through thousands of expert-led courses. Filter by category, difficulty, or rating.',
    },
    {
      id: 2,
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      title: 'Secure Enrollment',
      desc: 'Purchase with confidence using our secure payment gateway. Get instant lifetime access.',
    },
    {
      id: 3,
      icon: <PlayCircle className="w-8 h-8 text-green-600" />,
      title: 'Start Learning',
      desc: 'Watch high-quality video lessons, solve coding challenges, and earn your certificate.',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl flex flex-col justify-center items-center mx-auto mb-16">
          <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-50 mb-4 px-3 py-1 rounded-full border border-blue-100">
            Easy Process
          </h2>
          <h3 className="text-2xl px-2 md:text-4xl font-extrabold text-gray-900">
            Start your journey in <span className="text-blue-600">3 simple steps</span>
          </h3>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-blue-200 via-purple-200 to-green-200 border-t-2 border-dashed border-gray-300 -z-10"></div>

          {steps.map((step) => (
            <div key={step.id} className="group flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-blue-50 flex items-center justify-center shadow-sm group-hover:border-blue-100 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 z-10 relative">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold border-4 border-white shadow-md z-20">
                  {step.id}
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          {userId ? (
            // IF LOGGED IN: Redirect based on Role
            <Link
              href={targetHref}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {role === 'teacher' ? 'Instructor Dashboard' : 'Continue Learning'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            // IF LOGGED OUT: Open Signup Modal
            <SignUpButton mode="modal">
              <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignUpButton>
          )}
        </div>
      </div>
    </section>
  );
}
