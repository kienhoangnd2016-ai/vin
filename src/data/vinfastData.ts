export interface VehicleColor {
  id: string;
  name: string;
  hex: string;
  isPopular?: boolean;
}

export interface VehicleVersion {
  id: string;
  name: string;
  priceNoBattery: number;
  priceWithBattery: number;
  powerHp: number;
  torqueNm: number;
  rangeKm: number;
  drivetrain: string;
  accel: string;
  features: string[];
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  segment: string;
  category: 'urban' | 'crossover' | 'flagship';
  seats: number;
  priceFrom: number;
  priceTo: number;
  batteryCapacity: number; // kWh
  rangeKm: number; // km
  powerHp: number;
  powerKw: number;
  torqueNm: number;
  acceleration0to100: number; // s
  topSpeed: number; // km/h
  drivetrain: string;
  dimensions: string; // D x R x C (mm)
  wheelbase: number; // mm
  groundClearance: number; // mm
  chargingTimeFast: string; // e.g. "36 phút (10-70%)"
  efficiencyKwhPer100Km: number;
  image: string;
  interiorImage?: string;
  highlightSpecs: {
    range: string;
    power: string;
    accel: string;
    seats: string;
  };
  features: string[];
  safetyRating: string;
  airbags: number;
  versions: VehicleVersion[];
  colors: VehicleColor[];
  interiorTrims: { id: string; name: string; colorHex: string }[];
  wheelOptions: { id: string; name: string; inch: number; price: number }[];
  whyBuyReasons: string[];
}

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  city: string;
  powerKw: number;
  type: 'super_fast' | 'fast' | 'standard';
  portsAvailable: number;
  totalPorts: number;
  status: 'active' | 'busy' | 'maintenance';
  lat: number;
  lng: number;
  is24h: boolean;
}

export interface PlannedTrip {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedHours: number;
  elevationTrend: string;
  recommendedStops: string[];
}

export interface Promotion {
  id: string;
  title: string;
  badge: string;
  period: string;
  summary: string;
  details: string[];
  appliesTo: string[];
  ctaText: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'TIN XE' | 'CÔNG NGHỆ' | 'KINH NGHIỆM SỬ DỤNG' | 'XE ĐIỆN' | 'HƯỚNG DẪN SẠC' | 'TÀI CHÍNH / MUA XE';
  readTime: string;
  publishedDate: string;
  snippet: string;
  content: string;
}

export const VINFAST_VEHICLES: Vehicle[] = [
  {
    id: 'vf-3',
    slug: 'vf-3',
    name: 'VinFast VF 3',
    tagline: 'Mini SUV Đột Phá — Định Hình Phong Cách Cá Nhân',
    segment: 'Mini SUV Đô Thị',
    category: 'urban',
    seats: 4,
    priceFrom: 240000000,
    priceTo: 322000000,
    batteryCapacity: 18.64,
    rangeKm: 210,
    powerHp: 43,
    powerKw: 32,
    torqueNm: 110,
    acceleration0to100: 12.5,
    topSpeed: 100,
    drivetrain: 'RWD (Cầu sau)',
    dimensions: '3.190 x 1.679 x 1.622 mm',
    wheelbase: 2075,
    groundClearance: 191,
    chargingTimeFast: '36 phút (10 - 70%)',
    efficiencyKwhPer100Km: 8.8,
    image: '/src/assets/images/vinfast_vf7_hero_1790823902996.jpg', // Fallback or photorealistic studio asset
    interiorImage: '/src/assets/images/vinfast_interior_cockpit_1790823932531.jpg',
    highlightSpecs: {
      range: '210 km',
      power: '43 HP',
      accel: '12.5s',
      seats: '4 Chỗ',
    },
    features: [
      'Màn hình giải trí cảm ứng trung tâm 10 inch sắc nét',
      'Khoảng sáng gầm xe 191 mm vượt trội, leo vỉa hè và lội nước linh hoạt',
      'Mâm xe thể thao 16 inch nổi bật trong phân khúc',
      'Cần số điện tử sau vô-lăng hiện đại',
      'Chi phí sạc điện siêu tiết kiệm: chỉ ~20.000 VNĐ / 100 km',
      'Tùy biến phối màu nóc xe và thân xe 2 tông màu thời thượng',
    ],
    safetyRating: 'Tiêu chuẩn an toàn ASEAN NCAP',
    airbags: 1,
    versions: [
      {
        id: 'vf-3-battery-rental',
        name: 'VF 3 (Thuê Pin)',
        priceNoBattery: 240000000,
        priceWithBattery: 240000000,
        powerHp: 43,
        torqueNm: 110,
        rangeKm: 210,
        drivetrain: 'RWD',
        accel: '12.5s',
        features: ['Bảo hành pin trọn đời bởi VinFast', 'Gói thuê pin linh hoạt theo tháng', 'Sạc tiện lợi tại nhà hoặc trạm V-Green'],
      },
      {
        id: 'vf-3-with-battery',
        name: 'VF 3 (Kèm Pin)',
        priceNoBattery: 322000000,
        priceWithBattery: 322000000,
        powerHp: 43,
        torqueNm: 110,
        rangeKm: 210,
        drivetrain: 'RWD',
        accel: '12.5s',
        features: ['Sở hữu toàn diện xe và pin LFP bền bỉ', 'Không phát sinh cước thuê pin hàng tháng', 'Chi phí nuôi xe gần như bằng không'],
      },
    ],
    colors: [
      { id: 'c-yellow', name: 'Vàng Nắng (Solar Yellow)', hex: '#E5A93C', isPopular: true },
      { id: 'c-cyan', name: 'Xanh Lam Nhạt (Zenith Blue)', hex: '#3E8DBA' },
      { id: 'c-red', name: 'Đỏ Nhiệt Huyết (Crimson Red)', hex: '#B51B27' },
      { id: 'c-white', name: 'Trắng Tinh Khôi (Brahminy White)', hex: '#E5E8EC' },
      { id: 'c-black', name: 'Đen Huyền Bí (Jet Black)', hex: '#111419' },
    ],
    interiorTrims: [
      { id: 'int-black', name: 'Đen Thể Thao (Urban Black)', colorHex: '#181A1D' },
      { id: 'int-grey', name: 'Xám Tối Giản (Granite Slate)', colorHex: '#3A3F47' },
    ],
    wheelOptions: [
      { id: 'wh-16-std', name: 'Mâm Thép Khí Động Học 16"', inch: 16, price: 0 },
      { id: 'wh-16-alloy', name: 'Mâm Đúc Hợp Kim 16" Sơn Bạc Ánh Kim', inch: 16, price: 6000000 },
    ],
    whyBuyReasons: [
      'Ngân sách khởi điểm dưới 300 triệu, dễ dàng sở hữu ô tô đầu tiên.',
      'Kích thước nhỏ gọn, dễ luồn lách và quay đầu trong ngõ nhỏ đô thị.',
      'Chi phí vận hành rẻ hơn xe máy tay ga.',
    ],
  },
  {
    id: 'vf-5-plus',
    slug: 'vf-5-plus',
    name: 'VinFast VF 5 Plus',
    tagline: 'SUV Đô Thị Thông Minh — Sự Lựa Chọn Kinh Tế Vượt Trội',
    segment: 'A-SUV Đô Thị',
    category: 'urban',
    seats: 5,
    priceFrom: 468000000,
    priceTo: 548000000,
    batteryCapacity: 37.23,
    rangeKm: 326,
    powerHp: 134,
    powerKw: 100,
    torqueNm: 135,
    acceleration0to100: 10.9,
    topSpeed: 130,
    drivetrain: 'FWD (Cầu trước)',
    dimensions: '3.967 x 1.723 x 1.578 mm',
    wheelbase: 2514,
    groundClearance: 182,
    chargingTimeFast: '30 phút (10 - 70%)',
    efficiencyKwhPer100Km: 11.4,
    image: '/src/assets/images/vinfast_vf7_hero_1790823902996.jpg',
    interiorImage: '/src/assets/images/vinfast_interior_cockpit_1790823932531.jpg',
    highlightSpecs: {
      range: '326 km',
      power: '134 HP',
      accel: '10.9s',
      seats: '5 Chỗ',
    },
    features: [
      'Hệ thống giám sát hành trình và cảnh báo điểm mù thông minh',
      'Cảnh báo phương tiện cắt ngang khi lùi (RCTA)',
      'Bảng đồng hồ kỹ thuật số 7 inch và màn hình cảm ứng trung tâm 8 inch',
      'Động cơ 134 mã lực mạnh nhất trong phân khúc xe hạng A',
      '6 túi khí bảo vệ toàn diện người lái và hành khách',
      'Hệ thống phanh tái sinh năng lượng giúp tăng quãng đường di chuyển',
    ],
    safetyRating: 'ASEAN NCAP 4 sao',
    airbags: 6,
    versions: [
      {
        id: 'vf-5-plus-rental',
        name: 'VF 5 Plus (Thuê Pin)',
        priceNoBattery: 468000000,
        priceWithBattery: 468000000,
        powerHp: 134,
        torqueNm: 135,
        rangeKm: 326,
        drivetrain: 'FWD',
        accel: '10.9s',
        features: ['Thuê pin trọn gói an tâm', '6 túi khí an toàn', 'Cảnh báo điểm mù BSM'],
      },
      {
        id: 'vf-5-plus-battery',
        name: 'VF 5 Plus (Kèm Pin)',
        priceNoBattery: 548000000,
        priceWithBattery: 548000000,
        powerHp: 134,
        torqueNm: 135,
        rangeKm: 326,
        drivetrain: 'FWD',
        accel: '10.9s',
        features: ['Bao gồm trọn bộ xe và pin LFP', 'Miễn phí bảo dưỡng ban đầu', 'Phù hợp gia đình trẻ & di chuyển hàng ngày'],
      },
    ],
    colors: [
      { id: 'c-blue', name: 'Xanh VinFast (VinFast Blue)', hex: '#087EBD', isPopular: true },
      { id: 'c-white', name: 'Trắng Tinh Khôi (Brahminy White)', hex: '#E5E8EC' },
      { id: 'c-red', name: 'Đỏ Huyền Ảo (Crimson Red)', hex: '#A81C26' },
      { id: 'c-silver', name: 'Bạc Ánh Kim (Desat Silver)', hex: '#B8C0C8' },
      { id: 'c-orange', name: 'Cam Năng Động (Sunset Orange)', hex: '#E06428' },
    ],
    interiorTrims: [
      { id: 'int-black-orange', name: 'Đen viền Cam thể thao', colorHex: '#22252B' },
      { id: 'int-black', name: 'Đen sang trọng thuần túy', colorHex: '#16181C' },
    ],
    wheelOptions: [
      { id: 'wh-17-alloy', name: 'Mâm Đúc Hợp Kim 17" Phay Xước 2 Màu', inch: 17, price: 0 },
    ],
    whyBuyReasons: [
      'Khoang nội thất 5 chỗ rộng rãi hàng đầu phân khúc A.',
      'Sức mạnh 134 mã lực vượt trội mọi đối thủ xe xăng cùng tầm giá.',
      'Trang bị an toàn chủ động cao cấp: cảnh báo điểm mù, 6 túi khí.',
    ],
  },
  {
    id: 'vf-6',
    slug: 'vf-6',
    name: 'VinFast VF 6',
    tagline: 'Crossover Hạng B Chuẩn Châu Âu — Đỉnh Cao Công Nghệ ADAS',
    segment: 'B-SUV Hiện Đại',
    category: 'crossover',
    seats: 5,
    priceFrom: 675000000,
    priceTo: 855000000,
    batteryCapacity: 59.6,
    rangeKm: 399,
    powerHp: 201,
    powerKw: 150,
    torqueNm: 310,
    acceleration0to100: 8.5,
    topSpeed: 160,
    drivetrain: 'FWD (Cầu trước)',
    dimensions: '4.238 x 1.820 x 1.594 mm',
    wheelbase: 2730,
    groundClearance: 170,
    chargingTimeFast: '25 phút (10 - 70%)',
    efficiencyKwhPer100Km: 14.9,
    image: '/src/assets/images/vinfast_vf7_hero_1790823902996.jpg',
    interiorImage: '/src/assets/images/vinfast_interior_cockpit_1790823932531.jpg',
    highlightSpecs: {
      range: '399 km',
      power: '201 HP',
      accel: '8.5s',
      seats: '5 Chỗ',
    },
    features: [
      'Thiết kế duy mỹ từ studio lừng danh Torino Design (Ý)',
      'Hệ thống trợ lái nâng cao ADAS Level 2 trên bản Plus (giữ làn, bám đuôi tự động)',
      'Màn hình cảm ứng 12.9 inch hướng nghiêng về vị trí người lái',
      'Trợ lý ảo tiếng Việt ViVi điều khiển giọng nói tự nhiên thông minh',
      'Trục cơ sở 2.730 mm lớn nhất phân khúc B mang lại khoang sau cực rộng',
      'Đèn LED cánh chim vươn rộng nhận diện thương hiệu VinFast kiêu hãnh',
    ],
    safetyRating: 'ASEAN NCAP 5 sao',
    airbags: 8,
    versions: [
      {
        id: 'vf-6-base',
        name: 'VF 6 Base (Eco)',
        priceNoBattery: 675000000,
        priceWithBattery: 765000000,
        powerHp: 174,
        torqueNm: 250,
        rangeKm: 399,
        drivetrain: 'FWD',
        accel: '8.9s',
        features: ['Pin LFP 59.6 kWh', 'Màn hình 12.9 inch', 'Động cơ 174 HP', 'Mâm hợp kim 17 inch'],
      },
      {
        id: 'vf-6-plus',
        name: 'VF 6 Plus',
        priceNoBattery: 765000000,
        priceWithBattery: 855000000,
        powerHp: 201,
        torqueNm: 310,
        rangeKm: 381,
        drivetrain: 'FWD',
        accel: '8.5s',
        features: ['Gói công nghệ ADAS Level 2 toàn diện', 'Động cơ 201 HP vượt trội', 'Mâm phay 19 inch thể thao', 'Ghế da thực vật cao cấp'],
      },
    ],
    colors: [
      { id: 'c-blue', name: 'Xanh Future Blue', hex: '#087EBD', isPopular: true },
      { id: 'c-deep-green', name: 'Xanh Rêu Deep Ocean', hex: '#1C3E35' },
      { id: 'c-silver', name: 'Bạc Ánh Kim Platinum', hex: '#C7CDD4' },
      { id: 'c-black', name: 'Đen Deep Black', hex: '#0D0E11' },
      { id: 'c-white', name: 'Trắng Ngọc Trai', hex: '#EBEFF2' },
    ],
    interiorTrims: [
      { id: 'int-brown', name: 'Nâu Da Bò Moca Tinh Tế', colorHex: '#7B4C28' },
      { id: 'int-black', name: 'Đen Obsidian Sang Trọng', colorHex: '#16191D' },
    ],
    wheelOptions: [
      { id: 'wh-17', name: 'Mâm Hợp Kim 17" Tiêu Chuẩn', inch: 17, price: 0 },
      { id: 'wh-19', name: 'Mâm Thể Thao 19" Hai Tông Màu Diamond Cut', inch: 19, price: 12000000 },
    ],
    whyBuyReasons: [
      'Thiết kế châu Âu thanh lịch, tỉ lệ kích thước cân đối sang trọng.',
      'Hệ thống ADAS Level 2 đắc lực khi lái trên cao tốc và đường đông.',
      'Trục cơ sở 2.730 mm rộng rãi hơn hầu hết các xe hạng B khác.',
    ],
  },
  {
    id: 'vf-7',
    slug: 'vf-7',
    name: 'VinFast VF 7',
    tagline: 'Kiệt Tác Phi Thuyền Vũ Trụ — Sức Mạnh 349 Mã Lực & Dẫn Động AWD',
    segment: 'C-SUV Thể Thao Cao Cấp',
    category: 'crossover',
    seats: 5,
    priceFrom: 850000000,
    priceTo: 1199000000,
    batteryCapacity: 75.3,
    rangeKm: 496,
    powerHp: 349,
    powerKw: 260,
    torqueNm: 500,
    acceleration0to100: 5.8,
    topSpeed: 175,
    drivetrain: 'AWD (2 Motor Toàn Thời Gian)',
    dimensions: '4.545 x 1.890 x 1.636 mm',
    wheelbase: 2840,
    groundClearance: 190,
    chargingTimeFast: '24 phút (10 - 70%)',
    efficiencyKwhPer100Km: 15.2,
    image: '/src/assets/images/vinfast_vf7_hero_1790823902996.jpg',
    interiorImage: '/src/assets/images/vinfast_interior_cockpit_1790823932531.jpg',
    highlightSpecs: {
      range: '496 km',
      power: '349 HP',
      accel: '5.8s',
      seats: '5 Chỗ',
    },
    features: [
      'Ngôn ngữ thiết kế Vũ Trụ Phi Thuyền độc bản do Gomotiv (Ý) sáng tạo',
      'Động cơ 2 motor điện công suất 349 HP, mô-men xoắn tức thời 500 Nm',
      'Tăng tốc 0–100 km/h chỉ 5.8 giây, mang lại cảm xúc phấn khích tột độ',
      'Trần kính toàn cảnh Panorama trải dài cách nhiệt công nghệ cao',
      'Mâm xe thể thao kích thước khủng 20 inch tạo vẻ ngoài bề thế',
      'Gói ADAS cấp độ cao: tự động chuyển làn, giữ làn khẩn cấp, cảnh báo va chạm trước',
      'Nội thất bọc da 2 tông màu phong cách du thuyền cùng cần số dạng phím bấm piano',
    ],
    safetyRating: 'Euro NCAP / ASEAN NCAP 5 sao',
    airbags: 8,
    versions: [
      {
        id: 'vf-7-base',
        name: 'VF 7 Base',
        priceNoBattery: 850000000,
        priceWithBattery: 999000000,
        powerHp: 174,
        torqueNm: 250,
        rangeKm: 375,
        drivetrain: 'FWD',
        accel: '8.8s',
        features: ['Pin 59.6 kWh', 'Dẫn động cầu trước FWD', 'Mâm 19 inch', 'Màn hình cảm ứng 12.9 inch'],
      },
      {
        id: 'vf-7-plus',
        name: 'VF 7 Plus (AWD)',
        priceNoBattery: 999000000,
        priceWithBattery: 1199000000,
        powerHp: 349,
        torqueNm: 500,
        rangeKm: 496,
        drivetrain: 'AWD 2 Motor',
        accel: '5.8s',
        features: ['Pin dung lượng lớn 75.3 kWh', 'Dẫn động 4 bánh toàn thời gian AWD', '349 mã lực / 500 Nm', 'Tùy chọn trần kính toàn cảnh', 'Mâm 20 inch thể thao'],
      },
    ],
    colors: [
      { id: 'c-future-blue', name: 'Xanh Future Blue Đặc Trưng', hex: '#087EBD', isPopular: true },
      { id: 'c-crimson', name: 'Đỏ Crimson Hỏa Tiễn', hex: '#9E1824' },
      { id: 'c-deep-ocean', name: 'Xanh Deep Ocean Huyền Bí', hex: '#16382E' },
      { id: 'c-platinum', name: 'Bạc Ánh Bạch Kim Platinum', hex: '#CAD2DC' },
      { id: 'c-black', name: 'Đen Vũ Trụ (Cosmic Black)', hex: '#0B0D11' },
      { id: 'c-white', name: 'Trắng Tinh Cầu (Starlight White)', hex: '#EEF2F6' },
    ],
    interiorTrims: [
      { id: 'int-duo-red', name: 'Đỏ Đô phối Đen Thể Thao', colorHex: '#521419' },
      { id: 'int-black-sliver', name: 'Đen Dạ Quang chỉ Bạc', colorHex: '#14171C' },
    ],
    wheelOptions: [
      { id: 'wh-19-aero', name: 'Mâm Hợp Kim Khí Động Học 19"', inch: 19, price: 0 },
      { id: 'wh-20-sport', name: 'Mâm Thể Thao Phay Kim Cương 20" Vũ Trụ', inch: 20, price: 18000000 },
    ],
    whyBuyReasons: [
      'Công suất 349 mã lực và dẫn động AWD cho trải nghiệm lái thể thao phấn khích.',
      'Ngoại hình phi thuyền tương lai gây ấn tượng mạnh mẽ trên đường phố.',
      'Tầm hoạt động gần 500 km đáp ứng hoàn hảo các chuyến xuyên Việt.',
    ],
  },
  {
    id: 'vf-8',
    slug: 'vf-8',
    name: 'VinFast VF 8',
    tagline: 'D-SUV Điện Toàn Cầu — Trải Nghiệm Đẳng Cấp & Thông Minh Vượt Bậc',
    segment: 'D-SUV Toàn Cầu',
    category: 'flagship',
    seats: 5,
    priceFrom: 1070000000,
    priceTo: 1270000000,
    batteryCapacity: 87.7,
    rangeKm: 471,
    powerHp: 402,
    powerKw: 300,
    torqueNm: 620,
    acceleration0to100: 5.5,
    topSpeed: 200,
    drivetrain: 'AWD (2 Motor Toàn Thời Gian)',
    dimensions: '4.750 x 1.934 x 1.667 mm',
    wheelbase: 2950,
    groundClearance: 179,
    chargingTimeFast: '24 phút (10 - 70%)',
    efficiencyKwhPer100Km: 18.6,
    image: '/src/assets/images/vinfast_vf7_hero_1790823902996.jpg',
    interiorImage: '/src/assets/images/vinfast_interior_cockpit_1790823932531.jpg',
    highlightSpecs: {
      range: '471 km',
      power: '402 HP',
      accel: '5.5s',
      seats: '5 Chỗ',
    },
    features: [
      'Mẫu xe chiến lược toàn cầu đã xuất khẩu sang Mỹ, Canada và châu Âu',
      'Công suất cực đại lên tới 402 mã lực, mô-men xoắn khủng 620 Nm',
      'Màn hình cảm ứng 15.6 inch siêu nét tích hợp trợ lý ViVi thế hệ mới',
      'Hiển thị thông tin trên kính lái HUD (Head-up Display) cao cấp',
      'Hệ thống an toàn 11 túi khí cùng cấu trúc thép dập nóng cường độ siêu cao',
      'Tính năng cập nhật phần mềm không dây FOTA liên tục tối ưu xe',
    ],
    safetyRating: 'NHTSA 5 sao / Euro NCAP 5 sao',
    airbags: 11,
    versions: [
      {
        id: 'vf-8-eco',
        name: 'VF 8 Eco',
        priceNoBattery: 1070000000,
        priceWithBattery: 1170000000,
        powerHp: 349,
        torqueNm: 500,
        rangeKm: 471,
        drivetrain: 'AWD',
        accel: '5.9s',
        features: ['Pin CATL 87.7 kWh', 'Công suất 349 HP', 'Màn hình 15.6 inch', 'ADAS cấp cao', 'Mâm 19 inch'],
      },
      {
        id: 'vf-8-plus',
        name: 'VF 8 Plus',
        priceNoBattery: 1170000000,
        priceWithBattery: 1270000000,
        powerHp: 402,
        torqueNm: 620,
        rangeKm: 457,
        drivetrain: 'AWD',
        accel: '5.5s',
        features: ['Công suất tối đa 402 HP / 620 Nm', 'Cửa sổ trời toàn cảnh chỉnh điện', 'Ghế da thật sưởi & thông gió 2 hàng ghế', 'Mâm hợp kim 20 inch thể thao'],
      },
    ],
    colors: [
      { id: 'c-blue', name: 'Xanh VinFast Đặc Trưng', hex: '#087EBD', isPopular: true },
      { id: 'c-deep-ocean', name: 'Xanh Rêu Deep Ocean Mờ', hex: '#1A3C32' },
      { id: 'c-silver', name: 'Bạc Desat Silver Ánh Kim', hex: '#B8C2CC' },
      { id: 'c-black', name: 'Đen Jet Black Quyền Uy', hex: '#0B0D10' },
      { id: 'c-white', name: 'Trắng Brahminy White Tinh Khôi', hex: '#ECEFF4' },
      { id: 'c-crimson', name: 'Đỏ Crimson Red Rực Lửa', hex: '#A11622' },
    ],
    interiorTrims: [
      { id: 'int-saddle-brown', name: 'Da Bò Saddle Brown Sang Trọng', colorHex: '#6F4125' },
      { id: 'int-black', name: 'Da Đen Black Obsidian Cao Cấp', colorHex: '#121417' },
      { id: 'int-navy', name: 'Xanh Navy Hàng Hải Tinh Tế', colorHex: '#1C2E4A' },
    ],
    wheelOptions: [
      { id: 'wh-19', name: 'Mâm Hợp Kim 19" Đa Chấu', inch: 19, price: 0 },
      { id: 'wh-20', name: 'Mâm Thể Thao 20" Phay Kim Cương Cao Cấp', inch: 20, price: 20000000 },
    ],
    whyBuyReasons: [
      'Tiêu chuẩn an toàn khắt khe 5 sao quốc tế của Mỹ và Châu Âu.',
      'Sức kéo 620 Nm cực mạnh, bứt tốc êm ái không hề có độ trễ.',
      'Khoang lái số hóa với HUD và màn hình 15.6 inch hiện đại.',
    ],
  },
  {
    id: 'vf-9',
    slug: 'vf-9',
    name: 'VinFast VF 9',
    tagline: 'Flagship E-SUV Đỉnh Cao — Biểu Tượng Uy Quyền & Không Gian Thương Gia',
    segment: 'E-SUV Full-Size Hạng Sang',
    category: 'flagship',
    seats: 7,
    priceFrom: 1566000000,
    priceTo: 2280000000,
    batteryCapacity: 123.0,
    rangeKm: 626,
    powerHp: 402,
    powerKw: 300,
    torqueNm: 620,
    acceleration0to100: 6.5,
    topSpeed: 200,
    drivetrain: 'AWD (2 Motor Toàn Thời Gian)',
    dimensions: '5.118 x 2.254 x 1.696 mm',
    wheelbase: 3150,
    groundClearance: 189,
    chargingTimeFast: '26 phút (10 - 70%)',
    efficiencyKwhPer100Km: 20.1,
    image: '/src/assets/images/vinfast_vf9_flagship_1790823916473.jpg',
    interiorImage: '/src/assets/images/vinfast_interior_cockpit_1790823932531.jpg',
    highlightSpecs: {
      range: '626 km',
      power: '402 HP',
      accel: '6.5s',
      seats: '6 - 7 Chỗ',
    },
    features: [
      'SUV Full-size chiều dài hơn 5.1 mét với trục cơ sở 3.150 mm bề thế',
      'Tùy chọn phiên bản 6 chỗ Ghế Cơ Trưởng (Captain Chairs) tích hợp massage, thông gió và sưởi',
      'Màn hình điều khiển cảm ứng riêng biệt 8 inch cho hàng ghế VIP phía sau',
      'Pin CATL dung lượng siêu khủng 123 kWh với quãng đường di chuyển vượt 600 km',
      'Hệ thống điều hòa tự động 3 vùng lọc không khí Combi 2.5 và ion hóa',
      'Cửa sổ trời toàn cảnh kéo dài đến hết hàng ghế thứ 3 chống tia cực tím 99%',
      'Cửa hít tự động 4 cánh và kính cách âm 2 lớp mang lại khoang cabin tĩnh lặng tuyệt đối',
    ],
    safetyRating: 'Euro NCAP / NHTSA 5 sao',
    airbags: 11,
    versions: [
      {
        id: 'vf-9-eco-7',
        name: 'VF 9 Eco (7 Chỗ)',
        priceNoBattery: 1566000000,
        priceWithBattery: 2114000000,
        powerHp: 402,
        torqueNm: 620,
        rangeKm: 626,
        drivetrain: 'AWD',
        accel: '6.5s',
        features: ['Pin CATL 123 kWh', 'Cấu hình 7 chỗ tiện nghi', 'Màn hình 15.6 inch', 'Mâm 20 inch', 'Tầm hoạt động 626 km'],
      },
      {
        id: 'vf-9-plus-captain',
        name: 'VF 9 Plus (6 Chỗ Ghế Cơ Trưởng)',
        priceNoBattery: 1760000000,
        priceWithBattery: 2280000000,
        powerHp: 402,
        torqueNm: 620,
        rangeKm: 602,
        drivetrain: 'AWD',
        accel: '6.5s',
        features: ['Cấu hình 6 chỗ Ghế Cơ Trưởng VIP', 'Massage & thông gió hàng ghế 1 & 2', 'Màn hình hàng ghế sau', 'Trần kính toàn cảnh', 'Mâm 21 inch thể thao'],
      },
    ],
    colors: [
      { id: 'c-deep-ocean', name: 'Xanh Rêu Deep Ocean Quyền Quý', hex: '#16382E', isPopular: true },
      { id: 'c-vinfast-blue', name: 'Xanh VinFast Blue Hoàng Gia', hex: '#087EBD' },
      { id: 'c-black', name: 'Đen Jet Black Sang Trọng', hex: '#08090C' },
      { id: 'c-silver', name: 'Bạc Platinum Bạch Kim', hex: '#C2C9D1' },
      { id: 'c-white', name: 'Trắng Brahminy White Tinh Khôi', hex: '#ECEFF2' },
      { id: 'c-crimson', name: 'Đỏ Crimson Red Đẳng Cấp', hex: '#9E1925' },
    ],
    interiorTrims: [
      { id: 'int-saddle-brown', name: 'Da Bò Saddle Brown Hoàng Gia', colorHex: '#6F4125' },
      { id: 'int-beige', name: 'Da Be Kem Tinh Khiết Cotton Beige', colorHex: '#D6C8B4' },
      { id: 'int-black', name: 'Da Đen Black Obsidian Cao Cấp', colorHex: '#121417' },
      { id: 'int-navy', name: 'Da Xanh Navy Yacht Edition', colorHex: '#1C2E4A' },
    ],
    wheelOptions: [
      { id: 'wh-20', name: 'Mâm Hợp Kim 20" Phong Cách Tinh Tế', inch: 20, price: 0 },
      { id: 'wh-21', name: 'Mâm Đúc 21" 5 Chấu Kép Thể Thao Đỉnh Cao', inch: 21, price: 25000000 },
    ],
    whyBuyReasons: [
      'Không gian thương gia rộng rãi tối thượng cho lãnh đạo, doanh nhân và gia đình lớn.',
      'Pin khủng 123 kWh với cự ly di chuyển tới 626 km chỉ sau một lần sạc.',
      'Êm ái và tĩnh lặng tuyệt hảo với kính cách âm 2 lớp và cửa hít.',
    ],
  },
];

export const VINFAST_CHARGING_STATIONS: ChargingStation[] = [
  {
    id: 'st-hn-01',
    name: 'Trạm Siêu Nhanh V-Green Vincom Mega Mall Ocean Park',
    address: 'Khu đô thị Vinhomes Ocean Park, Gia Lâm, Hà Nội',
    city: 'Hà Nội',
    powerKw: 250,
    type: 'super_fast',
    portsAvailable: 8,
    totalPorts: 12,
    status: 'active',
    lat: 20.9925,
    lng: 105.9458,
    is24h: true,
  },
  {
    id: 'st-hn-02',
    name: 'Hub Sạc Vincom Center Metropolis Liễu Giai',
    address: '29 Liễu Giai, Ba Đình, Hà Nội',
    city: 'Hà Nội',
    powerKw: 150,
    type: 'fast',
    portsAvailable: 4,
    totalPorts: 6,
    status: 'active',
    lat: 21.0322,
    lng: 105.8136,
    is24h: true,
  },
  {
    id: 'st-hn-03',
    name: 'Trạm Sạc Cao Tốc Hà Nội - Hải Phòng (Km 52)',
    address: 'Trạm dừng nghỉ Km 52, Cao tốc 5B, Hải Dương',
    city: 'Hải Dương',
    powerKw: 250,
    type: 'super_fast',
    portsAvailable: 6,
    totalPorts: 8,
    status: 'active',
    lat: 20.8988,
    lng: 106.3312,
    is24h: true,
  },
  {
    id: 'st-hcm-01',
    name: 'Siêu Trạm Sạc Vincom Landmark 81',
    address: '720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    powerKw: 250,
    type: 'super_fast',
    portsAvailable: 10,
    totalPorts: 16,
    status: 'active',
    lat: 10.7951,
    lng: 106.7219,
    is24h: true,
  },
  {
    id: 'st-hcm-02',
    name: 'Trạm Sạc V-Green Vincom Mega Mall Thảo Điền',
    address: '161 Xa Lộ Hà Nội, Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    powerKw: 150,
    type: 'fast',
    portsAvailable: 5,
    totalPorts: 8,
    status: 'active',
    lat: 10.8016,
    lng: 106.7402,
    is24h: true,
  },
  {
    id: 'st-hcm-03',
    name: 'Trạm Dừng Nghỉ Cao Tốc Long Thành - Dầu Giây',
    address: 'Km 41, Cao tốc TP.HCM - Long Thành - Dầu Giây, Đồng Nai',
    city: 'Đồng Nai',
    powerKw: 250,
    type: 'super_fast',
    portsAvailable: 6,
    totalPorts: 10,
    status: 'active',
    lat: 10.8241,
    lng: 107.0125,
    is24h: true,
  },
  {
    id: 'st-dn-01',
    name: 'Trạm Sạc Vincom Plaza Ngô Quyền Đà Nẵng',
    address: '910A Ngô Quyền, An Hải Bắc, Sơn Trà, Đà Nẵng',
    city: 'Đà Nẵng',
    powerKw: 150,
    type: 'fast',
    portsAvailable: 6,
    totalPorts: 8,
    status: 'active',
    lat: 16.0718,
    lng: 108.2321,
    is24h: true,
  },
  {
    id: 'st-vt-01',
    name: 'Trạm Sạc V-Green Bãi Sau Vũng Tàu',
    address: '159 Thùy Vân, Phường Thắng Tam, TP. Vũng Tàu',
    city: 'Bà Rịa - Vũng Tàu',
    powerKw: 150,
    type: 'fast',
    portsAvailable: 4,
    totalPorts: 6,
    status: 'active',
    lat: 10.3341,
    lng: 107.0862,
    is24h: true,
  },
];

export const PLANNED_TRIPS: PlannedTrip[] = [
  {
    id: 'trip-hn-hl',
    name: 'Hà Nội ➔ Hạ Long (Kỳ Quan Vịnh Bắc Bộ)',
    origin: 'Hà Nội',
    destination: 'Quảng Ninh',
    distanceKm: 160,
    estimatedHours: 2.2,
    elevationTrend: 'Đồng bằng, cao tốc 120 km/h phẳng',
    recommendedStops: ['Trạm sạc Km52 Cao tốc Hà Nội - Hải Phòng (Sạc siêu nhanh 250kW, 10 phút)'],
  },
  {
    id: 'trip-hn-sp',
    name: 'Hà Nội ➔ Sa Pa (Chinh Phục Tây Bắc)',
    origin: 'Hà Nội',
    destination: 'Sa Pa, Lào Cai',
    distanceKm: 315,
    estimatedHours: 4.8,
    elevationTrend: 'Độ dốc tăng dần từ Yên Bái lên Lào Cai, hệ thống phanh tái sinh hồi pin khi xuống dốc',
    recommendedStops: ['Trạm dừng nghỉ Km 117 Yên Bái (250kW)', 'Vincom Plaza TP. Lào Cai (150kW)'],
  },
  {
    id: 'trip-hcm-vt',
    name: 'TP. Hồ Chí Minh ➔ Vũng Tàu (Nghỉ Dưỡng Cuối Tuần)',
    origin: 'TP. Hồ Chí Minh',
    destination: 'Vũng Tàu',
    distanceKm: 105,
    estimatedHours: 1.8,
    elevationTrend: 'Cao tốc ven biển bằng phẳng',
    recommendedStops: ['Không cần sạc giữa đường với mọi dòng xe VinFast, sạc đầy tại khách sạn hoặc Bãi Sau'],
  },
  {
    id: 'trip-hcm-pt',
    name: 'TP. Hồ Chí Minh ➔ Phan Thiết / Mũi Né (Cung Đường Biển)',
    origin: 'TP. Hồ Chí Minh',
    destination: 'Phan Thiết, Bình Thuận',
    distanceKm: 210,
    estimatedHours: 2.5,
    elevationTrend: 'Cao tốc Dầu Giây - Phan Thiết thông thoáng',
    recommendedStops: ['Trạm dừng chân Cao tốc Dầu Giây - Phan Thiết Km 47 (Sạc 15 phút là đầy 80%)'],
  },
  {
    id: 'trip-hcm-dl',
    name: 'TP. Hồ Chí Minh ➔ Đà Lạt (Thành Phố Ngàn Hoa)',
    origin: 'TP. Hồ Chí Minh',
    destination: 'Đà Lạt, Lâm Đồng',
    distanceKm: 305,
    estimatedHours: 6.0,
    elevationTrend: 'Leo đèo Bảo Lộc và Prenn, tiêu hao ~30% pin khi leo đèo và sạc lại 12% khi đổ dốc',
    recommendedStops: ['Trạm sạc V-Green TP. Bảo Lộc (150kW)', 'Vincom Plaza Đà Lạt (150kW)'],
  },
];

export const VINFAST_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-spirit-vn',
    title: 'Chiến Dịch "Mãnh Liệt Tinh Thần Việt Nam" — Giai Đoạn 2',
    badge: 'ĐẶC QUYỀN ĐỈNH CAO',
    period: 'Áp dụng đến hết 31/12/2026',
    summary: 'Chính sách hỗ trợ tài chính chưa từng có tiền lệ, hiện thực hóa giấc mơ ô tô cho hàng triệu gia đình Việt.',
    details: [
      'Hỗ trợ vay trả góp lên tới 70 - 80% giá trị xe, duyệt hồ sơ online trong 15 phút.',
      'Cam kết lãi suất cố định 5% trong 3 năm đầu, VinFast chi trả phần chênh lệch.',
      'Thời gian vay linh hoạt lên tới 8 năm, giảm nhẹ tối đa gánh nặng thanh toán hàng tháng.',
      'Khách hàng mua trả thẳng được chiết khấu trực tiếp tới 4% giá niêm yết.',
    ],
    appliesTo: ['VF 3', 'VF 5 Plus', 'VF 6', 'VF 7', 'VF 8', 'VF 9'],
    ctaText: 'Đăng Ký Nhận Báo Giá Ưu Đãi',
  },
  {
    id: 'promo-free-charging',
    title: 'Đặc Quyền Miễn Phí Sạc Pin Tại Hệ Thống V-Green',
    badge: 'TIẾT KIỆM 100% NHIÊN LIỆU',
    period: 'Áp dụng cho khách hàng sở hữu xe điện VinFast mới',
    summary: 'Tận hưởng trọn vẹn đặc quyền sạc điện 0 đồng tại hơn 150.000 cổng sạc V-Green trên toàn quốc.',
    details: [
      'Miễn phí sạc pin tại trạm sạc V-Green trong 12 đến 24 tháng (tùy dòng xe).',
      'Đặc quyền gửi xe miễn phí dưới 5 giờ tại các cơ sở thuộc hệ sinh thái Vingroup.',
      'Hỗ trợ lắp đặt trụ sạc tại nhà chính hãng với gói bảo hành 2 năm.',
      'Đội ngũ cứu hộ pin lưu động 24/7 và sửa chữa lưu động Mobile Service trên 63 tỉnh thành.',
    ],
    appliesTo: ['VF 6', 'VF 7', 'VF 8', 'VF 9'],
    ctaText: 'Khám Phá Hệ Sinh Thái V-Green',
  },
  {
    id: 'promo-trade-in',
    title: 'Chương Trình Đổi Cũ Lấy Mới — Thu Xe Xăng Đổi Xe Điện',
    badge: 'CHUYỂN ĐỔI XANH',
    period: 'Đang diễn ra',
    summary: 'Nhận thêm tiền mặt ưu đãi tới 50 triệu đồng khi chuyển đổi từ xe xăng truyền thống sang xe điện VinFast.',
    details: [
      'Định giá xe xăng cũ công khai, minh bạch, sát giá thị trường qua đối tác Vingroup.',
      'Tặng thêm 10 - 50 triệu đồng tiền mặt vào giá mua xe điện VinFast mới.',
      'Hỗ trợ toàn bộ thủ tục sang tên, rút hồ sơ xe cũ nhanh chóng.',
      'Bảo hành xe mới 10 năm hoặc 200.000 km — gấp 3 lần xe xăng cùng phân khúc.',
    ],
    appliesTo: ['VF 5 Plus', 'VF 6', 'VF 7', 'VF 8', 'VF 9'],
    ctaText: 'Định Giá Xe Xăng Cũ Của Bạn',
  },
];

export const VINFAST_ARTICLES: Article[] = [
  {
    id: 'art-01',
    title: 'VinFast VF 7 Plus: Trải nghiệm tốc độ 349 mã lực và trần kính vũ trụ trên cung đường cao tốc',
    category: 'TIN XE',
    readTime: '4 phút',
    publishedDate: '28/09/2026',
    snippet: 'Đánh giá chi tiết khả năng tăng tốc 0-100 km/h trong 5.8s, độ ổn định thân xe với hệ dẫn động 4 bánh toàn thời gian AWD và công nghệ ADAS Level 2.',
    content: 'Khi đạp thốc bàn đạp ga trên VinFast VF 7 Plus, 500 Nm mô-men xoắn phản hồi tức thì mà không cần bất kỳ độ trễ nào của hộp số hay tua máy turbo. Chiếc crossover lao vút đi với độ tĩnh lặng đáng kinh ngạc...',
  },
  {
    id: 'art-02',
    title: 'Hệ sinh thái trạm sạc V-Green: Vì sao người dùng xe điện VinFast không còn lo lắng về quãng đường?',
    category: 'HƯỚNG DẪN SẠC',
    readTime: '5 phút',
    publishedDate: '24/09/2026',
    snippet: 'Mạng lưới trạm sạc siêu nhanh 250kW phủ kín các trục cao tốc Bắc - Nam giúp sạc từ 10% lên 70% chỉ sau 20-30 phút nghỉ ngơi.',
    content: 'Với hơn 150.000 cổng sạc trên 63 tỉnh thành, khoảng cách trung bình giữa hai trạm sạc VinFast tại các đô thị lớn chỉ còn dưới 3.5 km và trên quốc lộ cao tốc chỉ 60-80 km...',
  },
  {
    id: 'art-03',
    title: 'So sánh chi phí sử dụng 5 năm: Xe điện VinFast vs Xe xăng truyền thống cùng phân khúc',
    category: 'TÀI CHÍNH / MUA XE',
    readTime: '6 phút',
    publishedDate: '19/09/2026',
    snippet: 'Phân tích chi tiết số liệu thực tế về tiền nhiên liệu, chu kỳ bảo dưỡng, thay dầu và chính sách miễn lệ phí trước bạ giúp tiết kiệm hơn 150 triệu đồng.',
    content: 'Không bugi, không dầu động cơ, không lọc gió xăng và không hộp số phức tạp. Xe điện chỉ cần bảo dưỡng định kỳ mỗi 12.000 km với các hạng mục đơn giản như kiểm tra má phanh, lọc gió điều hòa...',
  },
  {
    id: 'art-04',
    title: 'Khám phá công nghệ ADAS Level 2: Trợ thủ đắc lực bảo vệ gia đình trên mọi hành trình',
    category: 'CÔNG NGHỆ',
    readTime: '5 phút',
    publishedDate: '12/09/2026',
    snippet: 'Tìm hiểu cơ chế hoạt động của radar sóng milimet, camera quang học độ phân giải cao và tính năng tự động phanh khẩn cấp phòng tránh va chạm.',
    content: 'Hệ thống ADAS trên VF 6, VF 7, VF 8 và VF 9 liên tục quét không gian 360 độ xung quanh xe với tần số hàng chục lần mỗi giây...',
  },
];
