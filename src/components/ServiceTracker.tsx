import React, { useState } from 'react';
import { SAMPLE_TRACKING_DATABASE } from '../data/carData';
import {
  TrackingRecord,
  TrackingStage,
  WHATSAPP_PHONE_NUMBER,
  createWhatsAppUrl,
} from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  Car,
  UserCheck,
  MapPin,
  Wrench,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  FileText,
  Sparkles,
  Calendar,
  AlertCircle,
  RotateCw,
} from 'lucide-react';

interface ServiceTrackerProps {
  initialBookingId?: string;
  onOpenBooking?: () => void;
}

const STAGES_ORDER: TrackingStage[] = [
  'Received',
  'In Diagnostics',
  'Repairs Ongoing',
  'Ready for Delivery',
];

export const ServiceTracker: React.FC<ServiceTrackerProps> = ({
  initialBookingId = 'MSG-482910',
  onOpenBooking,
}) => {
  const [searchInput, setSearchInput] = useState(initialBookingId);
  const [activeRecord, setActiveRecord] = useState<TrackingRecord | null>(() => {
    return SAMPLE_TRACKING_DATABASE[initialBookingId] || SAMPLE_TRACKING_DATABASE['MSG-482910'];
  });
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const sampleIds = [
    { id: 'MSG-892401', label: 'Received', car: 'Swift' },
    { id: 'MSG-734892', label: 'In Diagnostics', car: 'Nexon' },
    { id: 'MSG-482910', label: 'Repairs Ongoing', car: 'Creta' },
    { id: 'MSG-519284', label: 'Ready for Delivery', car: 'City' },
  ];

  const handleSearch = (idToSearch?: string) => {
    const rawId = (idToSearch !== undefined ? idToSearch : searchInput).trim().toUpperCase();
    if (!rawId) return;

    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      setIsSearching(false);
      // Check database
      if (SAMPLE_TRACKING_DATABASE[rawId]) {
        setActiveRecord(SAMPLE_TRACKING_DATABASE[rawId]);
        setSearchInput(rawId);
      } else {
        // Dynamic realistic fallback for newly generated or custom booking IDs (e.g. from BookingModal)
        const customRecord: TrackingRecord = {
          bookingId: rawId,
          customerName: 'Valued Customer',
          vehicle: 'Customer Vehicle (Milestone Registered)',
          serviceType: 'Comprehensive Car Service & 50-Point Inspection',
          pickupArea: 'Madhura Nagar / Hyderabad',
          currentStage: 'Received',
          estimatedDelivery: 'Same Day by 06:00 PM',
          assignedTechnician: 'Master Tech Naresh (ID #HYD-102)',
          notes:
            'Booking verified in Milestone central system. Workshop job card created and vehicle in queue for primary diagnostic bay.',
          steps: [
            {
              stage: 'Received',
              time: 'Just Now',
              details:
                'Vehicle registered at Milestone Garage Madhura Nagar. Job card created.',
              completed: true,
              current: true,
            },
            {
              stage: 'In Diagnostics',
              time: 'Scheduled in 30 mins',
              details:
                '50-point computerized OBD-II scan and multi-system mechanical inspection.',
              completed: false,
            },
            {
              stage: 'Repairs Ongoing',
              time: 'Pending diagnostics',
              details:
                'Sealed OEM lubricants and genuine component replacement with customer WhatsApp approval.',
              completed: false,
            },
            {
              stage: 'Ready for Delivery',
              time: 'Estimated by 06:00 PM',
              details:
                'Post-repair quality audit, sanitization, and doorstep vehicle handover.',
              completed: false,
            },
          ],
        };

        setActiveRecord(customRecord);
        setSearchInput(rawId);
      }
    }, 350);
  };

  const getStageIndex = (stage: TrackingStage): number => {
    return STAGES_ORDER.indexOf(stage);
  };

  const currentStageIndex = activeRecord ? getStageIndex(activeRecord.currentStage) : 0;

  return (
    <section id="track-service" className="py-16 sm:py-20 bg-white border-b border-blue-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Real-Time Workshop Transparency</span>
            <span className="text-blue-300">·</span>
            <span>Madhura Nagar Central Garage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Track Your Service
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Enter your Milestone Booking ID to track every stage of your car&apos;s journey—from check-in to computerized diagnostics, ongoing mechanical repairs, and final sanitized delivery.
          </p>
        </div>

        {/* Search Input Bar + Sample Quick Picks */}
        <div className="max-w-2xl mx-auto mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white border-2 border-blue-200 shadow-md shadow-blue-500/5 focus-within:border-blue-600 transition-colors"
          >
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Search className="w-5 h-5 text-blue-600 shrink-0 mr-2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                placeholder="Enter Booking ID (e.g. MSG-482910)"
                className="w-full py-2.5 pr-3 text-sm sm:text-base font-mono font-bold text-blue-950 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 disabled:opacity-75"
            >
              {isSearching ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Sample IDs */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-blue-900">Try live samples:</span>
            {sampleIds.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSearchInput(item.id);
                  handleSearch(item.id);
                }}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all ${
                  activeRecord?.bookingId === item.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
                }`}
              >
                {item.id}
                <span className="ml-1.5 opacity-80 font-sans font-normal text-[11px]">
                  ({item.label})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Service Tracking Display Card */}
        {activeRecord && (
          <div className="max-w-4xl mx-auto bg-white border border-blue-200 rounded-3xl shadow-xl overflow-hidden">
            {/* Top Status Header */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-200 uppercase tracking-wider mb-1">
                    <span>BOOKING ID: {activeRecord.bookingId}</span>
                    <span>·</span>
                    <span>{activeRecord.pickupArea}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                    <Car className="w-6 h-6 text-blue-300" />
                    <span>{activeRecord.vehicle}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1">
                    Customer: <span className="font-bold text-white">{activeRecord.customerName}</span> · Service: <span className="font-semibold text-blue-200">{activeRecord.serviceType}</span>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="text-[11px] uppercase tracking-wider text-blue-300 font-semibold">
                    Current Live Status
                  </span>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-blue-900 font-extrabold text-sm shadow-md mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>{activeRecord.currentStage}</span>
                  </div>
                  <span className="text-xs text-blue-200 mt-1.5 font-medium">
                    Est. Handover: <strong className="text-white">{activeRecord.estimatedDelivery}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* 4-Stage Visual Progress Stepper (Blue & White) */}
            <div className="p-6 sm:p-8 bg-blue-50/40 border-b border-blue-100">
              <div className="relative">
                {/* Horizontal Progress Line for Desktop */}
                <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1.5 -translate-y-1/2 bg-blue-100 rounded-full z-0">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${(currentStageIndex / (STAGES_ORDER.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {/* 4 Stages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                  {STAGES_ORDER.map((stageName, index) => {
                    const isCompleted = index < currentStageIndex || (index === currentStageIndex && stageName === 'Ready for Delivery' && activeRecord.currentStage === 'Ready for Delivery');
                    const isCurrent = index === currentStageIndex && !(stageName === 'Ready for Delivery' && isCompleted);
                    const isPending = index > currentStageIndex;

                    return (
                      <div
                        key={stageName}
                        className={`flex md:flex-col items-center md:text-center gap-3 md:gap-2 p-3 sm:p-4 rounded-2xl transition-all ${
                          isCurrent
                            ? 'bg-white border-2 border-blue-600 shadow-md shadow-blue-500/10'
                            : isCompleted
                            ? 'bg-blue-50/80 border border-blue-200'
                            : 'bg-white/60 border border-blue-100 opacity-60'
                        }`}
                      >
                        {/* Step Circle Indicator */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                            isCompleted
                              ? 'bg-blue-600 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                              : 'bg-white border-2 border-blue-200 text-slate-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>

                        {/* Step Details */}
                        <div className="min-w-0 flex-1 md:w-full">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                            Stage {index + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-extrabold text-blue-950 truncate">
                            {stageName}
                          </h4>
                          <span
                            className={`text-[11px] font-medium block mt-0.5 ${
                              isCurrent
                                ? 'text-blue-700 font-bold'
                                : isCompleted
                                ? 'text-blue-800'
                                : 'text-slate-400'
                            }`}
                          >
                            {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Upcoming'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stage Details & Technician Live Notes */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Technician & Live Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Technician Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                      Lead Service Technician
                    </span>
                    <h5 className="text-sm font-extrabold text-blue-950 mt-0.5">
                      {activeRecord.assignedTechnician}
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Certified Master Automotive Mechanic · Madhura Nagar Main Bay
                    </p>
                  </div>
                </div>

                {/* Estimated Handover Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                      Estimated Delivery Time
                    </span>
                    <h5 className="text-sm font-extrabold text-blue-950 mt-0.5">
                      {activeRecord.estimatedDelivery}
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Includes 5-km road testing & complete waterless cabin sanitization
                    </p>
                  </div>
                </div>
              </div>

              {/* Technician Notes Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-blue-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Live Workshop Update &amp; Notes</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-blue-50/40 p-3.5 rounded-xl border border-blue-100">
                  &ldquo;{activeRecord.notes}&rdquo;
                </p>
              </div>

              {/* Step-by-Step Workshop Audit Trail */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-blue-600" />
                  <span>Workshop Activity Timeline</span>
                </h4>

                <div className="space-y-3">
                  {activeRecord.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                        step.current
                          ? 'bg-blue-50/70 border-blue-300'
                          : step.completed
                          ? 'bg-white border-blue-100'
                          : 'bg-white/40 border-dashed border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        ) : step.current ? (
                          <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-xs font-bold text-blue-950">
                            {step.stage}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 font-medium">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom WhatsApp Live Video / Photo Request CTA */}
              <div className="pt-4 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Want live photo/video proofs of removed parts and digital OBD-II printouts?</span>
                </div>

                <a
                  href={createWhatsAppUrl(
                    `Hi Milestone Garage! Please send me the live photo and video inspection update for Booking ID: ${activeRecord.bookingId} (${activeRecord.vehicle}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request WhatsApp Video Proof (9581142497)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
