import React from 'react';
import {
  UserCheck,
  ShieldCheck,
  BadgePercent,
  CheckCircle2,
  Award,
  FileCheck2,
  Lock,
  ThumbsUp
} from 'lucide-react';

export const TrustCertifications: React.FC = () => {
  const trustCards = [
    {
      id: 'technicians',
      title: 'Verified Technicians',
      badge: 'Certified Experts',
      icon: UserCheck,
      description:
        'NSDC & ASE certified master mechanics with extensive multi-brand experience. Every technician is background-verified, continually trained on modern vehicle ECUs, and equipped with enterprise diagnostic tools.',
      points: [
        '8+ Years Average Master Experience',
        'Multi-Brand Electronic OBD-II Certified',
        'Personal Customer Service Advisor for Each Job',
      ],
    },
    {
      id: 'warranty',
      title: 'Genuine Parts Warranty',
      badge: '100% Authentic',
      icon: ShieldCheck,
      description:
        'We strictly install certified OEM & OES spare parts directly sourced from Tier-1 global manufacturers (Bosch, Brembo, Mahle, Valeo, Amaron) with holographic tamper seals.',
      points: [
        'Up to 6 Months / 10,000 km Warranty',
        'Manufacturer Hologram Sealed Packaging',
        'Old Removed Parts Returned to Customer',
      ],
    },
    {
      id: 'pricing',
      title: 'Transparent Pricing',
      badge: 'Zero Hidden Costs',
      icon: BadgePercent,
      description:
        'Receive an upfront, itemized digital quotation on WhatsApp before we begin any work. No surprise additions or inflated dealer overheads. Test drive your car and pay only when fully satisfied.',
      points: [
        'Up to 40% Lower Than Authorised Dealerships',
        'Detailed Digital Inspection PDF on WhatsApp',
        'Pay After Test Drive & Work Completion',
      ],
    },
  ];

  return (
    <section id="trust-certifications" className="py-16 bg-white border-b border-blue-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="w-16 h-1 bg-blue-600 mb-3" />
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Guaranteed Assurance</span>
            <span className="text-blue-300">·</span>
            <span>Hyderabad Consumer Protection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
            Trust &amp; Certifications
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            At Milestone Garage, trust isn&apos;t just a promise — it is backed by verified certifications, strict parts
            authentication, and 100% transparent pricing across every mile.
          </p>
        </div>

        {/* 3 Core Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white border-2 border-blue-100 hover:border-blue-500 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 group"
              >
                <div>
                  {/* Top Bar with Small Icon and Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {/* Small Icon */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-blue-950 group-hover:text-blue-700 transition-colors">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Bullet points */}
                  <div className="mt-4 pt-4 border-t border-blue-50 space-y-2">
                    {card.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Assurance Note */}
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-blue-700 font-semibold">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Backed by Milestone Care Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Micro-Certifications Accreditation Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-blue-50/60 border border-blue-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <span className="text-xs sm:text-sm font-extrabold text-blue-950 block">ISO 9001:2015</span>
            <span className="text-[11px] text-slate-500 font-medium">Standardized Workshop Procedures</span>
          </div>

          <div className="p-2">
            <span className="text-xs sm:text-sm font-extrabold text-blue-950 block">100% Sealed OEM</span>
            <span className="text-[11px] text-slate-500 font-medium">Holographic Anti-Counterfeit</span>
          </div>

          <div className="p-2">
            <span className="text-xs sm:text-sm font-extrabold text-blue-950 block">Eco-Safe Disposal</span>
            <span className="text-[11px] text-slate-500 font-medium">Zero-Contamination Fluid Recycling</span>
          </div>

          <div className="p-2">
            <span className="text-xs sm:text-sm font-extrabold text-blue-950 block">Pay After Test Drive</span>
            <span className="text-[11px] text-slate-500 font-medium">UPI / Card / Cashless Acceptance</span>
          </div>
        </div>
      </div>
    </section>
  );
};
