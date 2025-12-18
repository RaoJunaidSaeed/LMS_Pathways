'use client';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans">
      {/* 1. Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white">Join our newsletter</h3>
              <p className="text-slate-400 text-sm mt-1">
                Get the latest course updates and study tips.
              </p>
            </div>

            <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand & Socials */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-blue-500">Edu</span>Platform.
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Empowering students worldwide with affordable, high-quality education. Join the
            revolution today.
          </p>
          <div className="flex gap-4">
            <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
            <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
            <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
            <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-6">Explore</h3>
          <ul className="space-y-4">
            <FooterLink href="/courses" text="All Courses" />
            <FooterLink href="/mentors" text="Our Mentors" />
            <FooterLink href="/pricing" text="Pricing Plans" />
            <FooterLink href="/blog" text="Tech Blog" />
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h3 className="text-white font-bold mb-6">Company</h3>
          <ul className="space-y-4">
            <FooterLink href="/about" text="About Us" />
            <FooterLink href="/privacy" text="Privacy Policy" />
            <FooterLink href="/terms" text="Terms of Service" />
            <FooterLink href="/cookie" text="Cookie Settings" />
          </ul>
        </div>

        {/* Column 4: Contact Info (Moved from Contact Section) */}
        <div>
          <h3 className="text-white font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-sm">123 Education Lane, Tech City, CA 94043</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-500 shrink-0" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-500 shrink-0" />
              <span className="text-sm">support@eduplatform.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} EduPlatform Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="#" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

function FooterLink({ href, text }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 hover:text-blue-400 transition-colors"
      >
        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        {text}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
