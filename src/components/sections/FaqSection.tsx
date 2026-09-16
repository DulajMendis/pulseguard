'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface FaqItemData {
  id: number;
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  const toggleFlip = (id: number) => {
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const faqs: FaqItemData[] = [
    {
      id: 1,
      question: 'What systems and software do you architect?',
      answer:
        'I specialize in production DMC operating systems, high-concurrency backend services (NestJS / Node.js / PostgreSQL), GIS transit platforms, developer observability cockpits, and sub-100ms interaction systems.',
    },
    {
      id: 2,
      question: 'What is your operational role at Connaissance De Ceylan?',
      answer:
        'I serve as Manager of Sustainability and System Administration at CDC (Sri Lanka’s premier Destination Management Company), overseeing enterprise infrastructure, digital transformation, and Travex itinerary operations.',
    },
    {
      id: 3,
      question: 'How do you guarantee database and financial integrity?',
      answer:
        'Through strict PostgreSQL ACID transactions, integer-based currency math (preventing floating point drift), guarded state machines, and zero-drift Prisma migrations backed by ~100 automated test suites.',
    },
    {
      id: 4,
      question: 'Do you work with international teams and remote ventures?',
      answer:
        'Yes. Based in Colombo, Sri Lanka (Asia/Colombo, UTC+05:30), I collaborate globally with deep asynchronous discipline, reproducible Docker environments, and clear architecture documentation.',
    },
    {
      id: 5,
      question: 'How are advisory and engineering engagements structured?',
      answer:
        'I partner on a fixed-scope milestone or ongoing strategic systems advisory basis. Every engagement has clear deliverables, defined schema invariants, and zero ambiguous billing.',
    },
    {
      id: 6,
      question: 'How do we kick off a mission or system redesign?',
      answer:
        'Use the "Project request" button or email dulaj.mendis.sri@gmail.com directly. We align on your architectural bottlenecks and begin with an operational discovery deep-dive.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#f5f5f7] dark:bg-[#161617]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header - Centered matching screen recording */}
        <div className="text-center space-y-2">
          <h3 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] text-[#1d1d1f] dark:text-white leading-[1.08]">
            Frequently asked questions
          </h3>
        </div>

        {/* 3D Flipping Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((faq) => {
            const isFlipped = flippedIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                onClick={() => toggleFlip(faq.id)}
                className={`faq-item cursor-pointer select-none group min-h-[130px] ${
                  isFlipped ? 'is-flipped' : ''
                }`}
              >
                <div className="faq-card-inner">
                  {/* Front View (Question) */}
                  <div className="faq-front justify-between bg-white dark:bg-[#1c1c1e] rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-7">
                    <h4 className="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-white pr-4 leading-snug tracking-[-0.02em]">
                      {faq.question}
                    </h4>
                    <div className="w-8 h-8 rounded-full bg-[#f5f5f7] dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-[#1d1d1f] dark:text-slate-300 group-hover:bg-[#006ddb] group-hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Back View (Answer) */}
                  <div className="faq-back justify-between bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-7">
                    <p className="text-sm sm:text-[15px] text-[#1d1d1f]/75 dark:text-slate-300 leading-relaxed pr-4 font-normal">
                      {faq.answer}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-[#f5f5f7] dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-[#1d1d1f] dark:text-slate-300 group-hover:bg-[#006ddb] group-hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
