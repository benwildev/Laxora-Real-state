'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import CanvasBackground from '@/components/CanvasBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import SearchFilter from '@/components/SearchFilter';
import FeaturedProperties from '@/components/FeaturedProperties';
import AgentSpotlight from '@/components/AgentSpotlight';
import NeighborhoodsMap from '@/components/NeighborhoodsMap';
import TestimonialsInvestments from '@/components/TestimonialsInvestments';
import FaqAccordion from '@/components/FaqAccordion';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

// Interactive Modals & Toast
import ScheduleTourModal from '@/components/Modals/ScheduleTourModal';
import PropertyDetailModal from '@/components/Modals/PropertyDetailModal';
import VideoTourModal from '@/components/Modals/VideoTourModal';
import AgentProfileModal from '@/components/Modals/AgentProfileModal';
import NeighborhoodModal from '@/components/Modals/NeighborhoodModal';
import ToastNotification from '@/components/ToastNotification';

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Filter State
  const [filters, setFilters] = useState(null);

  // Modal States
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedPropertyForTour, setSelectedPropertyForTour] = useState(null);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const handleOpenTour = (property = null) => {
    setSelectedPropertyForTour(property);
    setIsTourModalOpen(true);
  };

  const handleExploreNeighborhood = (name) => {
    setFilters({ location: name });
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast('Filtered By Area', `Displaying available luxury portfolios in ${name}.`);
  };

  return (
    <main className="main-wrapper">
      {/* 1. Preloader Screen */}
      <Preloader progress={loadProgress} isLoaded={isLoaded} />

      {/* 2. Background Mansion Canvas (Continuous Instant 120 FPS Scroll Scrub) */}
      <CanvasBackground
        onProgress={(pct) => setLoadProgress(pct)}
        onLoaded={() => setIsLoaded(true)}
      />

      {/* 3. Main Luxury Real Estate Page Content */}
      <div className="content-body">
        <Navbar
          onOpenTourModal={() => handleOpenTour()}
          onFilterSelect={(f) => setFilters(f)}
        />

        <Hero
          onOpenTourModal={() => handleOpenTour()}
        />

        <TrustBar />

        <SearchFilter
          onFilterChange={(f) => setFilters(f)}
        />

        <FeaturedProperties
          filters={filters}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onToast={showToast}
          onResetFilters={() => setFilters(null)}
        />

        <AgentSpotlight
          onOpenAgentModal={() => setIsAgentModalOpen(true)}
        />

        <NeighborhoodsMap
          onSelectNeighborhood={(n) => setSelectedNeighborhood(n)}
          onToast={showToast}
        />

        <TestimonialsInvestments
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onOpenTourModal={() => handleOpenTour()}
          onToast={showToast}
        />

        <FaqAccordion />

        <CtaBanner
          onOpenTourModal={() => handleOpenTour()}
        />

        <Footer
          onToast={showToast}
          onOpenTourModal={() => handleOpenTour()}
        />
      </div>

      {/* 4. Global Interactive Modals */}
      <ScheduleTourModal
        isOpen={isTourModalOpen}
        initialProperty={selectedPropertyForTour}
        onClose={() => setIsTourModalOpen(false)}
        onBooked={({ title, message }) => showToast(title, message, 'success')}
      />

      <PropertyDetailModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleTour={(p) => handleOpenTour(p)}
        onSavedToast={(t, m) => showToast(t, m, 'success')}
      />

      <VideoTourModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onScheduleTour={(p) => handleOpenTour(p)}
      />

      <AgentProfileModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        onScheduleConsultation={({ title, message }) => showToast(title, message, 'success')}
      />

      <NeighborhoodModal
        neighborhood={selectedNeighborhood}
        isOpen={!!selectedNeighborhood}
        onClose={() => setSelectedNeighborhood(null)}
        onExploreProperties={handleExploreNeighborhood}
      />

      {/* 5. Luxury Toast Notification Banner */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </main>
  );
}
