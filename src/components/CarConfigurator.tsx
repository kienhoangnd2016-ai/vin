import React, { useState, useEffect } from 'react';
import { VINFAST_VEHICLES, Vehicle, VehicleVersion, VehicleColor } from '../data/vinfastData';
import { formatVNDExact, formatVND } from '../utils/formatters';
import { Check, Copy, Share2, Heart, Calendar, FileText, Sparkles } from 'lucide-react';

interface CarConfiguratorProps {
  initialVehicle?: Vehicle | null;
  onSaveToGarage: (config: any) => void;
  onOpenTestDrive: (vehicle: Vehicle, configNote?: string) => void;
  onRequestQuote: (vehicle: Vehicle, configNote?: string) => void;
}

export const CarConfigurator: React.FC<CarConfiguratorProps> = ({
  initialVehicle,
  onSaveToGarage,
  onOpenTestDrive,
  onRequestQuote,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    initialVehicle || VINFAST_VEHICLES.find((v) => v.id === 'vf-7') || VINFAST_VEHICLES[3]
  );

  const [selectedVersion, setSelectedVersion] = useState<VehicleVersion>(
    selectedVehicle.versions[selectedVehicle.versions.length - 1] || selectedVehicle.versions[0]
  );

  const [selectedColor, setSelectedColor] = useState<VehicleColor>(
    selectedVehicle.colors[0]
  );

  const [selectedInterior, setSelectedInterior] = useState(
    selectedVehicle.interiorTrims[0]
  );

  const [selectedWheel, setSelectedWheel] = useState(
    selectedVehicle.wheelOptions[0]
  );

  const [isBatteryIncluded, setIsBatteryIncluded] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Update sub-selections when user picks a different vehicle model
  const handleVehicleChange = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedVersion(vehicle.versions[vehicle.versions.length - 1] || vehicle.versions[0]);
    setSelectedColor(vehicle.colors[0]);
    setSelectedInterior(vehicle.interiorTrims[0]);
    setSelectedWheel(vehicle.wheelOptions[0]);
  };

  useEffect(() => {
    if (initialVehicle) {
      handleVehicleChange(initialVehicle);
    }
  }, [initialVehicle]);

  // Dynamic price calculation
  const basePrice = isBatteryIncluded
    ? selectedVersion.priceWithBattery
    : selectedVersion.priceNoBattery;
  const wheelPrice = selectedWheel.price || 0;
  const totalPrice = basePrice + wheelPrice;

  const handleShareConfig = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSave = () => {
    const configData = {
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      versionName: selectedVersion.name,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      interior: selectedInterior.name,
      wheel: selectedWheel.name,
      isBatteryIncluded,
      totalPrice,
      savedAt: new Date().toISOString(),
    };
    onSaveToGarage(configData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const configSummaryNote = `${selectedVehicle.name} (${selectedVersion.name}) - Màu: ${selectedColor.name} - Nội thất: ${selectedInterior.name} - Mâm: ${selectedWheel.name} - Giá dự kiến: ${formatVNDExact(totalPrice)}`;

  return (
    <section id="configurator" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO TÙY BIẾN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            XÂY DỰNG CHIẾC XE CỦA BẠN
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            Lựa chọn phiên bản, màu sơn ngoại thất, phong cách nội thất và trang bị mâm xe để tạo nên chiếc VinFast độc bản dành riêng cho bạn.
          </p>
        </div>

        {/* Model Selection Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/10">
          {VINFAST_VEHICLES.map((vehicle) => {
            const isSelected = selectedVehicle.id === vehicle.id;
            return (
              <button
                key={vehicle.id}
                onClick={() => handleVehicleChange(vehicle)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#087EBD] text-white shadow-lg shadow-[#087EBD]/25'
                    : 'bg-[#0D1117] text-[#9DA7B3] hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <span>{vehicle.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isSelected ? 'bg-black/20 text-white' : 'bg-white/5 text-[#9DA7B3]'}`}>
                  {formatVND(vehicle.priceFrom)}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Configurator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Column: Dynamic Car Showcase & Interactive Customizers */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Live Interactive Vehicle Display Box */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#0D1117] border border-white/10 shadow-2xl flex items-center justify-center group">
              <img
                src={selectedVehicle.image}
                alt={`${selectedVehicle.name} ${selectedColor.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Dynamic Color Atmospheric Reflection Tint */}
              <div
                className="absolute inset-0 mix-blend-color opacity-25 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Contrast Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090C]/90 via-transparent to-[#07090C]/30 pointer-events-none" />

              {/* Active Color & Specs Overlay */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#07090C]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/30"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-xs font-semibold text-white">
                  {selectedColor.name}
                </span>
              </div>

              {/* Bottom Quick Bar on Car */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-[#E8EBEF] z-10">
                <div className="flex items-center gap-3 bg-[#07090C]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                  <span className="text-[#9DA7B3]">Động cơ:</span>
                  <span className="font-bold text-white">{selectedVersion.powerHp} HP</span>
                  <span className="text-white/20">|</span>
                  <span className="text-[#9DA7B3]">Quãng đường:</span>
                  <span className="font-bold text-white">{selectedVersion.rangeKm} km</span>
                </div>
                <div className="hidden sm:block text-[11px] text-[#9DA7B3] bg-[#07090C]/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg">
                  *Ảnh phối cảnh mô phỏng
                </div>
              </div>
            </div>

            {/* Customization Controls Accordion / Tabs */}
            <div className="bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-7">
              
              {/* 1. Chọn Phiên Bản (Version) */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-3">
                  01. CHỌN PHIÊN BẢN (VERSION)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedVehicle.versions.map((ver) => {
                    const isVerActive = selectedVersion.id === ver.id;
                    return (
                      <button
                        key={ver.id}
                        onClick={() => setSelectedVersion(ver)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isVerActive
                            ? 'bg-[#087EBD]/15 border-[#087EBD] shadow-[0_0_15px_rgba(8,126,189,0.2)]'
                            : 'bg-[#111720] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-sm text-white">
                            {ver.name}
                          </span>
                          {isVerActive && <Check className="w-4 h-4 text-[#087EBD]" />}
                        </div>
                        <div className="mt-2 text-xs font-bold text-[#E8EBEF]">
                          {formatVND(isBatteryIncluded ? ver.priceWithBattery : ver.priceNoBattery)}
                        </div>
                        <div className="mt-2 text-[11px] text-[#9DA7B3] flex items-center gap-2">
                          <span>{ver.powerHp} HP</span>
                          <span>·</span>
                          <span>{ver.rangeKm} km</span>
                          <span>·</span>
                          <span>{ver.drivetrain}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pin Option: Kèm Pin vs Thuê Pin */}
              <div className="p-4 bg-[#111720] border border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Chính sách Pin
                  </span>
                  <span className="text-[11px] text-[#9DA7B3]">
                    {isBatteryIncluded ? 'Mua trọn bộ kèm pin LFP/CATL' : 'Gói thuê pin linh hoạt tiết kiệm chi phí ban đầu'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-[#07090C] rounded-lg border border-white/10">
                  <button
                    onClick={() => setIsBatteryIncluded(false)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      !isBatteryIncluded ? 'bg-[#171F29] text-white' : 'text-[#9DA7B3] hover:text-white'
                    }`}
                  >
                    Thuê Pin
                  </button>
                  <button
                    onClick={() => setIsBatteryIncluded(true)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      isBatteryIncluded ? 'bg-[#087EBD] text-white shadow-sm' : 'text-[#9DA7B3] hover:text-white'
                    }`}
                  >
                    Kèm Pin
                  </button>
                </div>
              </div>

              {/* 2. Màu Sơn Ngoại Thất (Exterior Color) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold tracking-widest text-[#087EBD] uppercase">
                    02. MÀU SƠN NGOẠI THẤT
                  </label>
                  <span className="text-xs font-semibold text-[#E8EBEF]">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {selectedVehicle.colors.map((color) => {
                    const isColorActive = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        aria-label={color.name}
                        title={color.name}
                        className={`relative w-11 h-11 rounded-full border-2 transition-all p-0.5 ${
                          isColorActive
                            ? 'border-[#087EBD] scale-110 shadow-[0_0_12px_rgba(8,126,189,0.5)]'
                            : 'border-white/20 hover:border-white/60'
                        }`}
                      >
                        <span
                          className="w-full h-full rounded-full block shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        {isColorActive && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Màu Nội Thất (Interior Trim) */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-3">
                  03. NỘI THẤT & CHẤT LIỆU
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedVehicle.interiorTrims.map((trim) => {
                    const isTrimActive = selectedInterior.id === trim.id;
                    return (
                      <button
                        key={trim.id}
                        onClick={() => setSelectedInterior(trim)}
                        className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                          isTrimActive
                            ? 'bg-[#087EBD]/15 border-[#087EBD]'
                            : 'bg-[#111720] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-white/30 shrink-0"
                          style={{ backgroundColor: trim.colorHex }}
                        />
                        <span className="text-xs font-semibold text-white text-left">
                          {trim.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Mâm Xe (Wheels) */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-3">
                  04. TRANG BỊ MÂM XE
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedVehicle.wheelOptions.map((wheel) => {
                    const isWheelActive = selectedWheel.id === wheel.id;
                    return (
                      <button
                        key={wheel.id}
                        onClick={() => setSelectedWheel(wheel)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                          isWheelActive
                            ? 'bg-[#087EBD]/15 border-[#087EBD]'
                            : 'bg-[#111720] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="text-left">
                          <span className="text-xs font-semibold text-white block">
                            {wheel.name}
                          </span>
                          <span className="text-[11px] text-[#9DA7B3]">
                            Kích thước {wheel.inch} inch
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#E8EBEF]">
                          {wheel.price > 0 ? `+${formatVND(wheel.price)}` : 'Tiêu chuẩn'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Sticky Summary Specification & Conversion Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <span className="text-xs font-bold tracking-widest text-[#087EBD] uppercase">
                  CẤU HÌNH CỦA BẠN
                </span>
                <span className="text-xs font-semibold text-[#9DA7B3]">
                  Mã: {selectedVehicle.slug.toUpperCase()}
                </span>
              </div>

              {/* Selected Attributes List */}
              <div className="space-y-3.5 text-xs text-[#C7CDD4] border-b border-white/10 pb-6 mb-6">
                
                <div className="flex items-center justify-between">
                  <span className="text-[#9DA7B3]">Mẫu xe:</span>
                  <span className="font-bold text-white">{selectedVehicle.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9DA7B3]">Phiên bản:</span>
                  <span className="font-semibold text-white">{selectedVersion.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9DA7B3]">Chính sách Pin:</span>
                  <span className="font-semibold text-white">
                    {isBatteryIncluded ? 'Đã bao gồm Pin' : 'Thuê Pin VinFast'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9DA7B3]">Màu ngoại thất:</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full border border-white/30"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <span className="font-semibold text-white">{selectedColor.name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9DA7B3]">Nội thất:</span>
                  <span className="font-semibold text-white">{selectedInterior.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9DA7B3]">Mâm xe:</span>
                  <span className="font-semibold text-white">{selectedWheel.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9DA7B3]">Tầm hoạt động ước tính:</span>
                  <span className="font-semibold text-white tabular-nums">{selectedVersion.rangeKm} km</span>
                </div>

              </div>

              {/* Total Price Display */}
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-wider text-[#9DA7B3] block mb-1">
                  GIÁ DỰ KIẾN (VAT)
                </span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {formatVNDExact(totalPrice)}
                </div>
                <p className="text-[11px] text-[#9DA7B3] mt-1">
                  Chưa bao gồm ưu đãi đặc quyền & lệ phí trước bạ (xe điện được miễn 100%).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                
                <button
                  onClick={() => onOpenTestDrive(selectedVehicle, configSummaryNote)}
                  className="w-full py-3.5 px-4 text-xs font-bold tracking-wider text-white bg-[#087EBD] hover:bg-[#0A96D8] rounded-xl transition-all shadow-lg shadow-[#087EBD]/25 flex items-center justify-center gap-2 uppercase"
                >
                  <Calendar className="w-4 h-4" />
                  <span>ĐĂNG KÝ LÁI THỬ VỚI CẤU HÌNH NÀY</span>
                </button>

                <button
                  onClick={() => onRequestQuote(selectedVehicle, configSummaryNote)}
                  className="w-full py-3 px-4 text-xs font-semibold tracking-wider text-[#F5F7FA] bg-[#111720] hover:bg-[#171F29] border border-white/15 hover:border-white/30 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#087EBD]" />
                  <span>NHẬN BÁO GIÁ CHI TIẾT & ƯU ĐÃI</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="py-2.5 px-3 text-xs font-medium text-[#C7CDD4] hover:text-white bg-[#111720] hover:bg-[#171F29] border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#087EBD]" />
                    <span>{savedSuccess ? 'Đã Lưu!' : 'Lưu Cấu Hình'}</span>
                  </button>

                  <button
                    onClick={handleShareConfig}
                    className="py-2.5 px-3 text-xs font-medium text-[#C7CDD4] hover:text-white bg-[#111720] hover:bg-[#171F29] border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Đã Copy Link!' : 'Chia Sẻ'}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
