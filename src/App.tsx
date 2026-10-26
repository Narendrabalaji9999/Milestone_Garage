import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryNavStrip } from './components/CategoryNavStrip';
import { MainServicesGrid } from './components/MainServicesGrid';
import { CuratedServicesCarousel } from './components/CuratedServicesCarousel';
import { ThreeCarViewer } from './components/ThreeCarViewer';
import { HowMilestoneWorks } from './components/HowMilestoneWorks';
import { StatsCounterStrip } from './components/StatsCounterStrip';
import { OEMBrandsStrip } from './components/OEMBrandsStrip';
import { TrustCertifications } from './components/TrustCertifications';
import { CustomerSuccessStories } from './components/CustomerSuccessStories';
import { ServiceTracker } from './components/ServiceTracker';
import { PriceListTable } from './components/PriceListTable';
import { WhyMilestoneSection } from './components/WhyMilestoneSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Toast, ToastData } from './components/Toast';
import { CuratedServiceItem, HotspotInfo, DISPLAY_PHONE, WHATSAPP_PHONE_NUMBER, createWhatsAppUrl } from './types';
import { MessageCircle, PhoneCall, Sparkles } from 'lucide-react';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('car-services');
  const [selectedBrand, setSelectedBrand] = useState<string>('Hyundai');
  const [selectedModel, setSelectedModel] = useState<string>('Creta');
  const [enteredPhone, setEnteredPhone] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('Hyderabad - Madhura Nagar');
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);
  const [trackedBookingId, setTrackedBookingId] = useState<string>('MSG-482910');

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setIsBookingModalOpen(true);
  };

  const handleHeroCheckPrices = (brand: string, model: string, phone: string, area: string) => {
    setSelectedBrand(brand);
    setSelectedModel(model);
    setEnteredPhone(phone);
    setSelectedArea(area);
    setIsBookingModalOpen(true);
  };

  const handleSelectCurated = (item: CuratedServiceItem) => {
    setSelectedServiceId(item.id);
    setIsBookingModalOpen(true);
  };

  const handleSelectHotspotService = (hotspot: HotspotInfo) => {
    setSelectedServiceId(hotspot.servicePackageId);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirmed = (
    bookingId: string,
    details: { vehicle: string; service: string }
  ) => {
    setTrackedBookingId(bookingId);
    setActiveToast({
      id: Date.now().toString(),
      title: 'Booking Confirmed!',
      message: `Your service reservation is confirmed with Milestone Garage Madhura Nagar. Our service advisor will connect with you.`,
      bookingId,
      vehicle: details.vehicle,
      service: details.service,
      duration: 6500,
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Hero Section with Instant Price Estimator Card (Matches image_050c6a11.png & image_dca071dc.png) */}
      <HeroSection onCheckPrices={handleHeroCheckPrices} />

      {/* 3. Category Navigation Strip (Matches image_fe6f1178.png) */}
      <CategoryNavStrip />

      {/* 4. Car Services Available in Hyderabad (12 Cards Grid, matches image_fe6f1178.png) */}
      <MainServicesGrid onSelectService={(id) => handleOpenBooking(id)} />

      {/* 5. Curated Custom Services (Circular Carousel, matches image_c9e73d0d.png & image_75ecab0a.png) */}
      <CuratedServicesCarousel onSelectCurated={handleSelectCurated} />

      {/* 6. 3D Car Studio & Diagnostic Explorer (Pure Blue & White Studio) */}
      <section id="studio-3d" className="py-16 bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Interactive 3D Visualizer</span>
                <span className="text-blue-300">·</span>
                <span>Madhura Nagar Workshop Digital Twin</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
                Inspect Vehicle Mechanicals &amp; Part Health in 3D
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Rotate 360°, open the hood to inspect engine mechanicals, switch to exploded view, or view component
                diagnostics before your service.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={createWhatsAppUrl(
                  'Hi Milestone Garage! I am checking your 3D vehicle inspection tool and want to consult with a technician.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Expert (9581142497)</span>
              </a>
            </div>
          </div>

          <ThreeCarViewer
            onSelectHotspotService={handleSelectHotspotService}
            onBookDoorstep={(serviceId) => handleOpenBooking(serviceId)}
          />
        </div>
      </section>

      {/* 7. How Milestone Works? (4-Step Process, matches image_e37a5d31.png) */}
      <HowMilestoneWorks />

      {/* 8. Live "Track Your Service" Component (4 Stages: Received -> In Diagnostics -> Repairs Ongoing -> Ready for Delivery) */}
      <ServiceTracker
        initialBookingId={trackedBookingId}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 9. Stats Counter Strip (Matches image_1526f609.png) */}
      <StatsCounterStrip />

      {/* 10. Original Spare Parts Brand Strip (Matches image_ddc23a8e.png) */}
      <OEMBrandsStrip />

      {/* 11. Trust & Certifications Section (Verified Technicians, Genuine Parts Warranty, Transparent Pricing) */}
      <TrustCertifications />

      {/* 12. Car Services Price List in Hyderabad 2026 Table (Matches image_2d86a9a5.png) */}
      <PriceListTable onBookService={(service) => handleOpenBooking()} />

      {/* 13. Customer Success Stories Carousel (Hyderabad Verified Reviews) */}
      <CustomerSuccessStories onOpenBooking={() => handleOpenBooking()} />

      {/* 14. Why Choose Milestone In Hyderabad & Top Services (Matches image_b7ed33af.png & image_46a29de8.png) */}
      <WhyMilestoneSection />

      {/* 13. Common Car Service Questions In Hyderabad FAQ (Matches image_3620863d.png) */}
      <FAQSection />

      {/* 14. Multi-Column Footer with Madhura Nagar Address & Contacts (Matches image_3c1c8414.png) */}
      <Footer />

      {/* 15. Pinned Floating WhatsApp Action Hub (+91 9581142497) */}
      <WhatsAppFloatingButton onOpenBooking={() => handleOpenBooking()} />

      {/* 16. Doorstep Booking Modal with Toast Trigger on Submission */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedServiceId={selectedServiceId}
        preselectedBrand={selectedBrand}
        preselectedModel={selectedModel}
        preselectedPhone={enteredPhone}
        preselectedArea={selectedArea}
        onBookingSuccess={handleBookingConfirmed}
      />

      {/* 17. Toast Notification System */}
      <Toast toast={activeToast} onClose={() => setActiveToast(null)} />
    </div>
  );
}
