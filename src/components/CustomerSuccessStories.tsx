import React, { useState, useEffect, useRef } from 'react';
import { HYDERABAD_TESTIMONIALS } from '../data/carData';
import { TestimonialItem, createWhatsAppUrl } from '../types';
import {
  Star,
  Quote,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Car,
  MapPin,
  Wrench,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface CustomerSuccessStoriesProps {
  onOpenBooking?: () => void;
}

export const CustomerSuccessStories: React.FC<CustomerSuccessStoriesProps> = ({ onOpenBooking }) => {
  const testimonials = HYDERABAD_TESTIMONIALS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive cards per view: 1 on mobile, 2 on md, 3 on lg/xl
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAutoPlaying, maxIndex]);

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 border-b border-blue-100 relative overflow-hidden">
      {/* Decorative Blue Background Accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Hyderabad Verified Feedback</span>
              <span className="text-blue-300">·</span>
              <span>4.9 / 5 Rating</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
              Customer Success Stories
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Read transparent experiences from car owners across Madhura Nagar, Banjara Hills, Gachibowli,
              and Ameerpet who trust Milestone Garage for regular servicing, diagnostics, and repairs.
            </p>
          </div>

          {/* Carousel Navigation Controls (Strict Blue & White) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-xs font-semibold text-blue-900 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-xs hidden sm:block">
              Showing <span className="font-bold text-blue-600">{currentIndex + 1} - {Math.min(currentIndex + cardsPerView, testimonials.length)}</span> of {testimonials.length}
            </div>

            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center shadow-xs transition-all duration-200 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-xl bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20 transition-all duration-200 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-3"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <div className="h-full flex flex-col justify-between bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 relative group">
                  {/* Top Quote Icon Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
                      <Quote className="w-4 h-4" />
                    </div>

                    {/* Star Rating (Crisp Blue) */}
                    <div className="flex items-center gap-1 bg-blue-50/70 border border-blue-200 px-2.5 py-1 rounded-full">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                      ))}
                      <span className="text-[11px] font-bold text-blue-900 ml-1">5.0</span>
                    </div>
                  </div>

                  {/* Customer Quote */}
                  <blockquote className="text-slate-700 text-sm leading-relaxed mb-6 italic relative">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Service Performed Tag */}
                  <div className="mb-5 pt-3 border-t border-blue-50 flex items-center gap-2">
                    <div className="p-1 rounded-md bg-blue-100/70 text-blue-700">
                      <Wrench className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-semibold text-blue-800 line-clamp-1">
                      {item.serviceDone}
                    </span>
                  </div>

                  {/* Author Info */}
                  <div className="pt-4 border-t border-blue-100/80 flex items-center justify-between gap-3 mt-auto">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-blue-950 truncate">{item.name}</h4>
                        {item.verified && (
                          <span
                            title="Verified Hyderabad Customer"
                            className="inline-flex items-center text-blue-600"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                        <span className="truncate">{item.area}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-medium text-blue-700 mt-1">
                        <Car className="w-3 h-3 text-blue-500 shrink-0" />
                        <span className="truncate">{item.carModel}</span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-[10px] font-semibold text-slate-400 block">{item.date}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 mt-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-blue-600" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-blue-600' : 'w-2.5 bg-blue-200 hover:bg-blue-300'
              }`}
            />
          ))}
        </div>

        {/* Bottom Direct CTA Bar */}
        <div className="mt-12 bg-blue-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-800">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Ready to Experience Milestone Garage Service?
            </h3>
            <p className="text-blue-200 text-xs sm:text-sm mt-1 max-w-xl">
              Free doorstep pickup across Hyderabad, transparent digital diagnostic reports, and up to 40% savings compared to authorized dealerships.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={createWhatsAppUrl(
                'Hi Milestone Garage! I read your customer reviews and want to schedule a service for my car in Hyderabad.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span>WhatsApp Us: 9581142497</span>
            </a>

            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm font-bold border border-blue-400 shadow-md transition-all hover:scale-[1.02] active:scale-95"
              >
                <Wrench className="w-4 h-4" />
                <span>Book Service Online</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
