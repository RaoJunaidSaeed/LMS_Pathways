import React from 'react';
import { GraduationCap, Clock, Award, Users, LayoutDashboard, Code2 } from 'lucide-react';

export default function Features() {
  const features = [
    // 1. Mentorship
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Expert Instructors',
      desc: 'Learn directly from senior engineers and industry leaders from top tech companies.',
      color: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    },
    // 2. Accessibility
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Lifetime Access',
      desc: 'Buy once, keep forever. Revisit lessons whenever you need a refresher, even years later.',
      color: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    },
    // 3. Practical Learning (New)
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Project-Based Learning',
      desc: 'Don’t just watch. Build real-world applications and add them to your professional portfolio.',
      color: 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white',
    },
    // 4. Analytics (New)
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: 'Progress Tracking',
      desc: 'Visual dashboards to track your daily streaks, completed modules, and skill acquisition.',
      color: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
    },
    // 5. Community (New)
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Student Community',
      desc: 'Join our Discord server. Connect with peers, find coding partners, and get help 24/7.',
      color: 'bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white',
    },
    // 6. Credibility
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Recognized Certificates',
      desc: 'Earn a verifiable certificate of completion to boost your LinkedIn profile and resume.',
      color: 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-500 group-hover:text-white',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" className="text-gray-300" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Why Choose Us
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
            Reinventing the way you{' '}
            <span className="text-blue-600 decoration-4 decoration-blue-200 underline underline-offset-4">
              Learn
            </span>
          </h2>
          <p className="text-base md:text-xl font-medium text-gray-500">
            We don't just sell courses. We provide a complete ecosystem to help you go from beginner
            to pro.
          </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-default"
            >
              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-50 rounded-2xl transition-colors pointer-events-none"></div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${f.color}`}
              >
                {f.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {f.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>

              {/* Hover Link Arrow */}
              {/* <div className="mt-6 flex items-center text-blue-600 font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 cursor-pointer">
                Learn more
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
