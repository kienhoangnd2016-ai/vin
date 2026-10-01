/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickActionBar } from './components/QuickActionBar';
import { CarFinderWizard } from './components/CarFinderWizard';
import { VehicleShowcase } from './components/VehicleShowcase';
import { CarConfigurator } from './components/CarConfigurator';
import { VehicleComparison } from './components/VehicleComparison';
import { LoanCalculator } from './components/LoanCalculator';
import { OwnershipCostCalculator } from './components/OwnershipCostCalculator';
import { EVRoutePlanner } from './components/EVRoutePlanner';
import { AICarAdvisor } from './components/AICarAdvisor';
import { Experience360 } from './components/Experience360';
import { TechnologySection } from './components/TechnologySection';
import { PromotionsSection } from './components/PromotionsSection';
import { TestDriveSection } from './components/TestDriveSection';
import { TestDriveModal } from './components/TestDriveModal';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { GarageDrawer } from './components/GarageDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { ArticlesSection } from './components/ArticlesSection';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';
import { VINFAST_VEHICLES, Vehicle, Promotion } from './data/vinfastData';

export default function App() {
  // Favorites & Garage State with LocalStorage persistence
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vinfast_favorites');
      return saved ? JSON.parse(saved) : ['vf-7', 'vf-3'];
    } catch {
      return ['vf-7', 'vf-3'];
    }
  });

  const [savedConfigs, setSavedConfigs] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('vinfast_configs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Panels State
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);

  // Cross-component coordination state
  const [testDriveVehicle, setTestDriveVehicle] = useState<Vehicle | null>(null);
  const [testDriveNote, setTestDriveNote] = useState<string>('');
  const [configuratorVehicle, setConfiguratorVehicle] = useState<Vehicle | null>(null);
  const [comparisonCarIds, setComparisonCarIds] = useState<string[]>(['vf-6', 'vf-7', 'vf-8']);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    try {
      localStorage.setItem('vinfast_favorites', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteIds]);

  useEffect(() => {
    try {
      localStorage.setItem('vinfast_configs', JSON.stringify(savedConfigs));
    } catch (e) {
      console.error(e);
    }
  }, [savedConfigs]);

  const handleToggleFavorite = (vehicleId: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(vehicleId);
      const vehicle = VINFAST_VEHICLES.find((v) => v.id === vehicleId);
      if (exists) {
        showToast(`Đã bỏ lưu ${vehicle?.name || 'xe'} khỏi Garage.`);
        return prev.filter((id) => id !== vehicleId);
      } else {
        showToast(`Đã thêm ${vehicle?.name || 'xe'} vào Garage của bạn!`);
        return [...prev, vehicleId];
      }
    });
  };

  const handleSaveConfig = (config: any) => {
    setSavedConfigs((prev) => [config, ...prev]);
    showToast(`Đã lưu cấu hình ${config.vehicleName} vào Garage!`);
  };

  const handleOpenTestDrive = (vehicle?: Vehicle, note?: string) => {
    setTestDriveVehicle(vehicle || null);
    setTestDriveNote(note || '');
    setIsTestDriveOpen(true);
  };

  const handleOpenConfigurator = (vehicle: Vehicle) => {
    setConfiguratorVehicle(vehicle);
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLoan = (vehicle: Vehicle) => {
    const el = document.getElementById('loan-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCompareVehicles = (carIds: string[]) => {
    setComparisonCarIds(carIds);
    const el = document.getElementById('comparison');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPromotion = (promo: Promotion) => {
    handleOpenTestDrive(undefined, `Đăng ký nhận thông tin ưu đãi: ${promo.title}`);
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-[#F5F7FA] selection:bg-[#087EBD]/30 selection:text-white flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-[#111720] border border-[#087EBD] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#087EBD] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Header */}
      <Header
        favoritesCount={favoriteIds.length + savedConfigs.length}
        onOpenGarage={() => setIsGarageOpen(true)}
        onOpenTestDrive={() => handleOpenTestDrive()}
        onOpenAdvisor={() => {
          const el = document.getElementById('ai-advisor');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        isAdminOpen={isAdminOpen}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onExploreVehicles={() => {
            const el = document.getElementById('vehicles');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCarFinder={() => {
            const el = document.getElementById('car-finder');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTestDrive={() => handleOpenTestDrive(VINFAST_VEHICLES.find((v) => v.id === 'vf-7'))}
        />

        {/* 2. Quick Action Bar */}
        <QuickActionBar
          onOpenTestDrive={() => handleOpenTestDrive()}
        />

        {/* 3. Section "Tìm Chiếc Xe Dành Cho Bạn" (6-Step Interactive Wizard) */}
        <CarFinderWizard
          onSelectVehicle={(v) => setDetailVehicle(v)}
          onCompareVehicles={handleCompareVehicles}
          onOpenTestDrive={(v) => handleOpenTestDrive(v)}
        />

        {/* 4. Dòng Xe (Vehicle Showcase Grid with Segment Filters) */}
        <VehicleShowcase
          onSelectVehicle={(v) => setDetailVehicle(v)}
          onOpenConfigurator={handleOpenConfigurator}
          onOpenTestDrive={(v) => handleOpenTestDrive(v)}
          onToggleFavorite={handleToggleFavorite}
          favoriteIds={favoriteIds}
        />

        {/* 5. Car Configurator ("Xây dựng chiếc xe của bạn") */}
        <CarConfigurator
          initialVehicle={configuratorVehicle}
          onSaveToGarage={handleSaveConfig}
          onOpenTestDrive={(v, note) => handleOpenTestDrive(v, note)}
          onRequestQuote={(v, note) => handleOpenTestDrive(v, `Yêu cầu báo giá chi tiết: ${note}`)}
        />

        {/* 6. So Sánh Xe & Phân Tích AI */}
        <VehicleComparison
          initialCarIds={comparisonCarIds}
          onOpenTestDrive={(v) => handleOpenTestDrive(v)}
          onOpenConfigurator={handleOpenConfigurator}
        />

        {/* 7. Calculator Trả Góp */}
        <LoanCalculator
          onRequestFinanceAdvice={(v, summary) =>
            handleOpenTestDrive(v, `Tư vấn phương án tài chính trả góp: ${summary}`)
          }
        />

        {/* 8. Chi Phí Sử Dụng 5 Năm */}
        <OwnershipCostCalculator />

        {/* 9. Trải Nghiệm Chi Tiết 360 / Hotspots */}
        <Experience360 />

        {/* 10. EV Route Planner & Mạng Lưới Trạm Sạc V-Green */}
        <EVRoutePlanner />

        {/* 11. AI Car Advisor ("Trợ lý xe thông minh") */}
        <AICarAdvisor
          onOpenTestDrive={(v) => handleOpenTestDrive(v)}
        />

        {/* 12. Công Nghệ Đột Phá */}
        <TechnologySection />

        {/* 13. Ưu Đãi Độc Quyền */}
        <PromotionsSection
          onSelectPromotion={handleSelectPromotion}
        />

        {/* 14. Đăng Ký Lái Thử In-Page Form */}
        <TestDriveSection
          preselectedVehicle={testDriveVehicle}
          onSuccessLead={() => showToast('Đã đăng ký lái thử thành công!')}
        />

        {/* 15. Tin Tức & Hướng Dẫn Sạc */}
        <ArticlesSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bar */}
      <MobileStickyCta
        onOpenAdvisor={() => {
          const el = document.getElementById('ai-advisor');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTestDrive={() => handleOpenTestDrive()}
      />

      {/* Modals & Overlays */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        preselectedVehicle={testDriveVehicle}
        configNote={testDriveNote}
        onSuccessLead={() => showToast('Đăng ký lịch hẹn thành công!')}
      />

      <VehicleDetailModal
        vehicle={detailVehicle}
        onClose={() => setDetailVehicle(null)}
        onOpenConfigurator={(v) => {
          setDetailVehicle(null);
          handleOpenConfigurator(v);
        }}
        onOpenTestDrive={(v) => {
          setDetailVehicle(null);
          handleOpenTestDrive(v);
        }}
        onOpenLoan={(v) => {
          setDetailVehicle(null);
          handleOpenLoan(v);
        }}
        isFavorite={detailVehicle ? favoriteIds.includes(detailVehicle.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <GarageDrawer
        isOpen={isGarageOpen}
        onClose={() => setIsGarageOpen(false)}
        favoriteIds={favoriteIds}
        savedConfigs={savedConfigs}
        onRemoveFavorite={handleToggleFavorite}
        onRemoveConfig={(idx) => {
          setSavedConfigs((prev) => prev.filter((_, i) => i !== idx));
          showToast('Đã xóa cấu hình khỏi Garage.');
        }}
        onOpenTestDrive={(v) => handleOpenTestDrive(v)}
        onOpenConfigurator={handleOpenConfigurator}
        onCompareVehicles={handleCompareVehicles}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectVehicle={(v) => setDetailVehicle(v)}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
