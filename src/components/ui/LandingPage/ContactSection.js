'use client';

import React from 'react';
import { Send, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" id="contact">
      {/* Background Decor (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            {/* <Mail className="w-3 h-3" /> */}
            Contact Support
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Send us a Message
          </h2>
          <p className="text-gray-500 px-3 mt-4 text-base md:text-lg">
            Have a question about a course? Fill out the form below and we'll get back to you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Name Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputGroup label="First Name" placeholder="Jane" type="text" />
              <InputGroup label="Last Name" placeholder="Doe" type="text" />
            </div>

            {/* Contact Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputGroup label="Email Address" placeholder="jane@example.com" type="email" />
              <InputGroup
                label="Phone Number (Optional)"
                placeholder="+1 (555) 000-0000"
                type="tel"
              />
            </div>

            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                I need help with...
              </label>
              <div className="flex flex-wrap gap-4">
                <RadioOption name="subject" label="Course Enrollment" defaultChecked />
                <RadioOption name="subject" label="Technical Issue" />
                <RadioOption name="subject" label="Instructor Inquiry" />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us more about your inquiry..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-gray-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:-translate-y-1 hover:shadow-blue-500/40">
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// --- Helper Components ---

function InputGroup({ label, placeholder, type }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
      />
    </div>
  );
}

function RadioOption({ name, label, defaultChecked }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-transparent hover:border-blue-200 transition-colors">
      <input
        type="radio"
        name={name}
        defaultChecked={defaultChecked}
        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-600 font-medium">{label}</span>
    </label>
  );
}
