import React from 'react';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  PackageCheck,
  Percent,
  Wrench,
  Sparkles,
  Paintbrush,
  ThermometerSnowflake,
  Disc,
  BatteryCharging,
  Eye,
  Layers,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { createWhatsAppUrl, GARAGE_ADDRESS } from '../types';

export const WhyMilestoneSection: React.FC = () => {
  return (
    <section id="why-milestone" className="py-16 bg-white text-slate-900 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Header matching image_b7ed33af.png */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Why Choose Milestone In Hyderabad?
          </h2>
          <div className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 max-w-4xl">
            <p>
              Hyderabad isn&apos;t just about biryani, Charminar, IT parks, and fast-growing suburbs. Living here isn&apos;t
              just about enjoying the city; it also means dealing with the everyday hustle of traffic. From the packed lanes
              of the City markets to the long waits at traffic signals especially in the peak office hours, driving becomes
              part of daily life. Whether it&apos;s rushing to the office, or swinging by Inorbit Mall, your car is always
              your partner on the road. But honestly, driving in Hyderabad can be tiring. There&apos;s long traffic, sudden
              rains, and lots of stop-and-go driving. All this conditions slowly affect your car&apos;s mileage, comfort, and
              overall condition. If you don&apos;t get your car checked on time, small problems can become big and expensive.
              That&apos;s why searching for a &quot;car service near me in Hyderabad&quot; really matters.
            </p>
            <p>
              The tough part? Finding a reliable and nearby car service isn&apos;t always simple. Local garages often lack modern
              tools, use low-quality parts, and rarely provide warranties. That&apos;s where Milestone Garage makes the
              difference. Located centrally in Madhura Nagar with free pick-up and drop across Hyderabad, we bring 150+ car
              repair and maintenance services to your doorstep, from routine oil changes, brake checks, and wheel balancing
              to major jobs like clutch replacement, engine diagnostics, and breakdown support. All this will cost 40% less
              than authorised service centres, with free pick-up and drop, and warranty on services. So, if you want a car
              service that&apos;s smart, affordable, and fits your lifestyle, Milestone Garage is the answer.
            </p>
          </div>
        </div>

        {/* 6 Key Reasons matching image_b7ed33af.png */}
        <div className="pt-4 border-t border-blue-100">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight mb-6">
            Why is Milestone the Best Car Service Centre in Hyderabad?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/20 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                    1. Free Pick-Up and Drop
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Driving across Hyderabad for a car service can waste hours. You may be stuck near Gachibowli one moment
                    and crawling through traffic at Jubilee Hills the next. With us, you don&apos;t need to step out, we pick
                    up your car, service it, and drop it back. You carry on with your day, while we handle the rest.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/20 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                    2. Warranty on All Services
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Hyderabad roads may look smooth but can be tricky. One unexpected pothole or sudden bump, and something
                    in your car may act up. That&apos;s why every Milestone service comes with a warranty of up to 6 months. If
                    an issue arises after servicing, just call us.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/20 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                    3. 50+ Checkpoints Before Service
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Before we begin, our mechanics inspect your car at 50+ important points. This helps us find hidden issues
                    like worn-out brakes, loose belts, or tyre problems. You get a detailed health report, and only after your
                    approval do we start working.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/20 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <PackageCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                    4. Only Genuine OEM/OES Parts
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Hyderabad weather can switch from blazing sun to heavy rain quickly. To make sure your car keeps up, we
                    only use genuine OEM/OES spare parts. These are the same parts recommended by car companies which are
                    durable, reliable, and safe.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/20 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <Percent className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                    5. Up to 40% Less Costing
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Why pay extra at authorized dealerships? At Milestone Garage, you get expert service, quality parts,
                    free pick-up and drop, and complete inspection, all at 40% lower prices compared to others.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/20 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                    6. Certified Mechanics
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Cars in Hyderabad range from hatchbacks parked in Kukatpally to luxury sedans in Banjara Hills. For this,
                    we have certified master mechanics, who are trained to handle every car irrespective of its make or model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Services detailed section matching image_b7ed33af.png & image_46a29de8.png */}
        <div className="pt-8 border-t border-blue-100">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight mb-6">
            Top Services at Milestone Garage&apos;s Workshops in Hyderabad
          </h3>

          <div className="space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">1. Car Spa and Cleaning (Coming Soon)</h4>
              <p className="mt-0.5">
                Roads nearby to areas like Gachibowli and Madhapur can leave your car covered in dust and pollution within
                days. Our car spa includes a full wash, polishing, and deep interior cleaning, so that your car looks spotless
                and feels fresh every time.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">2. Denting and Painting</h4>
              <p className="mt-0.5">
                Small accidents or parking scratches are common in busy areas like Abids or Koti. Our denting and painting
                service reshapes panels, fixes dents, and adds a smooth repaint, restoring your car&apos;s original shine and
                making it look as good as new.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">3. General Car Service</h4>
              <p className="mt-0.5">
                If you daily commute to very long distances, suppose from Secunderabad to Hitech City, in that case
                servicing your car regularly is very important. Our general service covers oil change, brake inspection,
                filter cleaning, and fluid top-ups, ensuring your car performs smoothly and avoids sudden breakdowns.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">4. Car Inspection</h4>
              <p className="mt-0.5">
                Planning a road trip from Hyderabad to Warangal or Nalgonda? A full car inspection helps you travel
                stress-free. We check the engine, brakes, tyres, suspension, and fluids, providing a detailed health report so
                you&apos;re confident before hitting the highway.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">5. Car AC Repair and Service</h4>
              <p className="mt-0.5">
                Summers in Banjara Hills or Begumpet can be unbearable without proper cooling. Our AC service checks for
                leaks, cleans the condenser, and refills refrigerant, making sure your air conditioning works perfectly, even
                in Hyderabad&apos;s hottest afternoons.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">6. Suspension and Shocker Repairs</h4>
              <p className="mt-0.5">
                Driving over uneven roads near Uppal or Mehdipatnam can take a toll on your suspension. We fix shocks, arms,
                and steering racks, improving comfort and road safety.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">7. Tyre and Wheel Care</h4>
              <p className="mt-0.5">
                Daily commutes between Kukatpally and Hitech City cause fast tyre wear and misalignment. Our tyre and wheel
                care service includes alignment, rotation, balancing, and replacements to keep your car stable and smooth on
                both city roads and highways.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">8. Battery Services</h4>
              <p className="mt-0.5">
                Cold mornings in Secunderabad or after long parking hours near Ameerpet, your car may struggle to start. Our
                battery service checks battery life, fixes wiring issues, or replaces the unit so your car powers up
                instantly.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">9. Detailing Services (Coming Soon)</h4>
              <p className="mt-0.5">
                With heavy traffic and dust around Charminar or LB Nagar, cars often lose their shine. Our detailing service
                restores the faded shine of your car, removes swirl marks, and includes deep-cleaning of the interior.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">10. Windshield and Light Repairs</h4>
              <p className="mt-0.5">
                Chipped windshields from stone hits especially near roads of the Outer Ring Road or weak headlights during
                foggy winter mornings can be risky. We repair or replace windshields, headlamps, and taillights.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-blue-950 text-sm sm:text-base">11. Clutch and Body Repairs</h4>
              <p className="mt-0.5">
                Stop-and-go traffic near Miyapur or Panjagutta puts pressure on your clutch. If gear shifts feel heavy, our
                service replaces or repairs the clutch. We also fix body parts like doors, bumpers, and panels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
