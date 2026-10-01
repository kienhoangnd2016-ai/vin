import React, { useState } from 'react';
import { VINFAST_VEHICLES, VINFAST_CHARGING_STATIONS, PLANNED_TRIPS, Vehicle, ChargingStation, PlannedTrip } from '../data/vinfastData';
import { Navigation, Zap, BatteryCharging, Clock, MapPin, CheckCircle2, Filter } from 'lucide-react';

export const EVRoutePlanner: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<PlannedTrip>(PLANNED_TRIPS[0]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    VINFAST_VEHICLES.find((v) => v.id === 'vf-7') || VINFAST_VEHICLES[3]
  );
  const [startBatteryPercent, setStartBatteryPercent] = useState<number>(90); // 90%
  const [stationFilter, setStationFilter] = useState<'all' | 'super_fast' | 'active'>('all');

  // Route energy calculation:
  // Required energy = (distance / 100) * efficiency
  const requiredKwh = (selectedTrip.distanceKm / 100) * selectedVehicle.efficiencyKwhPer100Km;
  const startKwh = (selectedVehicle.batteryCapacity * startBatteryPercent) / 100;
  const remainingKwh = startKwh - requiredKwh;
  const remainingPercent = Math.round((remainingKwh / selectedVehicle.batteryCapacity) * 100);
  const needsCharging = remainingPercent < 15;

  const filteredStations = VINFAST_CHARGING_STATIONS.filter((st) => {
    if (stationFilter === 'super_fast') return st.powerKw >= 250;
    if (stationFilter === 'active') return st.status === 'active';
    return true;
  });

  return (
    <section id="route-planner" className="py-24 bg-[#07090C] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#111720] border border-white/10 text-xs font-semibold text-[#087EBD] uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>MẠNG LƯỚI TRẠM SẠC V-GREEN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            CHUYẾN ĐI TIẾP THEO CỦA BẠN
          </h2>
          <p className="text-sm sm:text-base text-[#9DA7B3] mt-2">
            Lập kế hoạch hành trình thông minh, tính toán mức tiêu hao pin thực tế và định vị các điểm sạc siêu nhanh 250kW trên mọi cung đường Việt Nam.
          </p>
        </div>

        {/* 2-Column Planner Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Route Selector & Vehicle Status */}
          <div className="lg:col-span-5 bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
            
            {/* Trip Destination Selector */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-3">
                01. CHỌN TUYẾN ĐƯỜNG MẪU
              </label>
              <div className="space-y-2">
                {PLANNED_TRIPS.map((trip) => {
                  const isTripActive = selectedTrip.id === trip.id;
                  return (
                    <button
                      key={trip.id}
                      onClick={() => setSelectedTrip(trip)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isTripActive
                          ? 'bg-[#087EBD]/15 border-[#087EBD] shadow-[0_0_15px_rgba(8,126,189,0.2)]'
                          : 'bg-[#111720] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {trip.name}
                        </span>
                        <span className="text-[11px] text-[#9DA7B3] mt-0.5">
                          {trip.distanceKm} km · Dự kiến {trip.estimatedHours}h
                        </span>
                      </div>
                      {isTripActive && <CheckCircle2 className="w-4 h-4 text-[#087EBD] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Selector */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#087EBD] uppercase mb-2">
                02. MẪU XE ĐIỀU HÀNH
              </label>
              <select
                value={selectedVehicle.id}
                onChange={(e) => {
                  const found = VINFAST_VEHICLES.find((v) => v.id === e.target.value);
                  if (found) setSelectedVehicle(found);
                }}
                className="w-full text-xs font-semibold text-white bg-[#111720] border border-white/15 rounded-xl px-3.5 py-2.5 focus:border-[#087EBD] focus:outline-none"
              >
                {VINFAST_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} (Pin {v.batteryCapacity} kWh · {v.rangeKm} km)
                  </option>
                ))}
              </select>
            </div>

            {/* Battery Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#9DA7B3] uppercase">
                  Mức Pin Xuất Phát
                </span>
                <span className="font-display text-sm font-bold text-emerald-400 tabular-nums">
                  {startBatteryPercent}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={startBatteryPercent}
                onChange={(e) => setStartBatteryPercent(Number(e.target.value))}
                className="w-full h-2 bg-[#171F29] rounded-lg appearance-none cursor-pointer accent-[#087EBD]"
              />
              <div className="flex justify-between text-[11px] text-[#9DA7B3] mt-1.5">
                <span>20%</span>
                <span>50%</span>
                <span>80%</span>
                <span>100% (Sạc đầy)</span>
              </div>
            </div>

            {/* Route Simulation Summary Result Box */}
            <div className="p-4 bg-[#111720] border border-white/10 rounded-xl space-y-3">
              <span className="text-xs font-bold text-white uppercase block">
                Kết Quả Mô Phỏng Năng Lượng
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#9DA7B3] block text-[10px]">Tiêu hao dự kiến:</span>
                  <span className="font-bold text-white tabular-nums">{requiredKwh.toFixed(1)} kWh</span>
                </div>
                <div>
                  <span className="text-[#9DA7B3] block text-[10px]">Mức pin tại đích:</span>
                  <span
                    className={`font-bold tabular-nums ${
                      remainingPercent >= 20 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {remainingPercent > 0 ? `${remainingPercent}%` : 'Cần sạc trên đường'}
                  </span>
                </div>
              </div>

              {/* Status Alert */}
              {needsCharging ? (
                <div className="text-[11px] text-amber-300 bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-lg flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Khuyến nghị dừng sạc 15 phút tại trạm siêu nhanh 250kW giữa hành trình.
                  </span>
                </div>
              ) : (
                <div className="text-[11px] text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Đủ năng lượng đến thẳng điểm đích mà không cần dừng sạc giữa đường!
                  </span>
                </div>
              )}

              {/* Recommended Stops list */}
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] text-[#9DA7B3] uppercase block mb-1">Điểm sạc khuyến nghị:</span>
                <p className="text-xs text-[#E8EBEF]">{selectedTrip.recommendedStops[0]}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dark Futuristic Map Representation & Station Hub Cards */}
          <div className="lg:col-span-7 bg-[#0D1117] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
            
            {/* Filter Bar */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                TRẠM SẠC V-GREEN ĐANG HOẠT ĐỘNG
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-[#07090C] rounded-lg border border-white/10">
                <button
                  onClick={() => setStationFilter('all')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    stationFilter === 'all' ? 'bg-[#171F29] text-white' : 'text-[#9DA7B3] hover:text-white'
                  }`}
                >
                  Tất Cả
                </button>
                <button
                  onClick={() => setStationFilter('super_fast')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    stationFilter === 'super_fast' ? 'bg-[#087EBD] text-white font-bold' : 'text-[#9DA7B3] hover:text-white'
                  }`}
                >
                  Siêu Nhanh 250kW
                </button>
              </div>
            </div>

            {/* Stylized Visual Dark Map Canvas */}
            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-[#07090C] border border-white/10 flex items-center justify-center p-4">
              
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#087ebd20_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Vietnam stylized highway contour line */}
              <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 600 240" fill="none">
                <path
                  d="M 50 180 Q 200 40 350 120 T 550 80"
                  stroke="#087EBD"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Glowing Station Pins */}
              {filteredStations.slice(0, 5).map((st, i) => {
                const positions = [
                  { x: '18%', y: '45%' },
                  { x: '35%', y: '65%' },
                  { x: '52%', y: '30%' },
                  { x: '70%', y: '55%' },
                  { x: '88%', y: '35%' },
                ];
                const pos = positions[i] || { x: '50%', y: '50%' };

                return (
                  <div
                    key={st.id}
                    className="absolute flex flex-col items-center group cursor-pointer z-10"
                    style={{ left: pos.x, top: pos.y }}
                  >
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#087EBD] border-2 border-white shadow-[0_0_18px_#087EBD]">
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="hidden group-hover:block absolute bottom-8 bg-[#07090C]/95 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-white whitespace-nowrap border border-white/15 shadow-xl">
                      {st.name} ({st.powerKw} kW)
                    </div>
                  </div>
                );
              })}

              {/* Center Map Overlay Label */}
              <div className="absolute bottom-3 left-3 bg-[#07090C]/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[11px] text-[#C7CDD4] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#087EBD] animate-ping" />
                <span>Mạng lưới 150.000+ cổng sạc V-Green toàn quốc</span>
              </div>
            </div>

            {/* Detailed Stations List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {filteredStations.map((station) => (
                <div
                  key={station.id}
                  className="p-3.5 rounded-xl bg-[#111720] border border-white/5 hover:border-[#087EBD]/40 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#07090C] border border-white/10 flex items-center justify-center text-[#087EBD] shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">
                        {station.name}
                      </h4>
                      <p className="text-[11px] text-[#9DA7B3] mt-0.5">
                        {station.address}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#087EBD]/20 text-[#087EBD] border border-[#087EBD]/30">
                      {station.powerKw} kW
                    </span>
                    <span className="block text-[11px] text-emerald-400 mt-1">
                      Còn {station.portsAvailable}/{station.totalPorts} cổng trống
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
