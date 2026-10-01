import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory lead store with realistic initial data
interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  carModel: string;
  leadType: 'test_drive' | 'quote' | 'finance' | 'advisor' | 'contact';
  city?: string;
  preferredDate?: string;
  preferredTime?: string;
  note?: string;
  configuration?: any;
  createdAt: string;
}

let leadsStore: Lead[] = [
  {
    id: 'lead-101',
    fullName: 'Nguyễn Văn Hùng',
    phone: '0912 345 678',
    email: 'hung.nguyen@vinamilk.com.vn',
    carModel: 'VF 7 Plus AWD',
    leadType: 'test_drive',
    city: 'Hà Nội (Vincom Mega Mall Ocean Park)',
    preferredDate: '2026-10-05',
    preferredTime: '09:30',
    note: 'Muốn trải nghiệm hệ dẫn động 4 bánh và trần kính toàn cảnh.',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'lead-102',
    fullName: 'Trần Thị Mai Phương',
    phone: '0988 765 432',
    email: 'phuong.tran@vietcombank.com.vn',
    carModel: 'VF 9 Plus (6 chỗ Ghế Cơ Trưởng)',
    leadType: 'quote',
    city: 'TP. Hồ Chí Minh (Vincom Landmark 81)',
    note: 'Tư vấn phương án vay trả góp 5 năm theo chính sách lãi suất 5%.',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'lead-103',
    fullName: 'Lê Hoàng Nam',
    phone: '0903 889 123',
    carModel: 'VF 3',
    leadType: 'test_drive',
    city: 'Đà Nẵng (Vincom Plaza Ngô Quyền)',
    preferredDate: '2026-10-04',
    preferredTime: '15:00',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  }
];

// Initialize server-side Gemini SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const VINFAST_KNOWLEDGE_BASE = `
DANH MỤC XE ĐIỆN CHÍNH THỨC VINFAST TẠI VIỆT NAM (DỮ LIỆU CHUẨN XÁC):

1. VinFast VF 3:
- Phân khúc: Mini SUV đô thị cá tính, 3 cửa, 4 chỗ ngồi.
- Kích thước: 3.190 x 1.679 x 1.622 mm, khoảng sáng gầm 191 mm.
- Động cơ: 1 motor điện cầu sau, công suất 43 mã lực (32 kW), mô-men xoắn 110 Nm.
- Pin & Tầm hoạt động: Pin LFP dung lượng 18.64 kWh, quãng đường ~210 km (tiêu chuẩn NEDC). Sạc nhanh 10-70% trong 36 phút.
- Giá niêm yết: 240.000.000 VNĐ (thuê pin) | 322.000.000 VNĐ (kèm pin).
- Đặc điểm: Thiết kế khối hộp vuông vắn đậm chất SUV, mâm 16 inch, màn hình cảm ứng trung tâm 10 inch, chi phí sạc siêu tiết kiệm chỉ ~20.000 VNĐ / 100 km.

2. VinFast VF 5 Plus:
- Phân khúc: A-SUV đô thị hiện đại, 5 chỗ ngồi.
- Kích thước: 3.967 x 1.723 x 1.578 mm, chiều dài cơ sở 2.514 mm.
- Động cơ: 1 motor điện cầu trước FWD, 134 mã lực (100 kW), mô-men xoắn 135 Nm.
- Pin & Tầm hoạt động: Pin LFP 37.23 kWh, tầm hoạt động ~326 km (NEDC). Sạc nhanh 10-70% trong 30 phút.
- Giá niêm yết: 468.000.000 VNĐ (thuê pin) | 548.000.000 VNĐ (kèm pin).
- Đặc điểm: Bền bỉ, đa dụng cho cá nhân, gia đình trẻ hoặc kinh doanh dịch vụ, 6 túi khí an toàn, cảnh báo điểm mù, cảnh báo phương tiện cắt ngang khi lùi.

3. VinFast VF 6:
- Phân khúc: B-SUV tinh tế phong cách châu Âu (Torino Design), 5 chỗ ngồi.
- Phiên bản: Base (Eco) và Plus.
- Động cơ: Base: 174 mã lực, 250 Nm | Plus: 201 mã lực, 310 Nm (cầu trước FWD).
- Pin & Tầm hoạt động: Pin LFP 59.6 kWh. Quãng đường ~399 km (Base) và ~381 km (Plus) (WLTP).
- Giá niêm yết: Base: 675.000.000 VNĐ | Plus: 765.000.000 VNĐ (kèm pin: +90 triệu).
- Đặc điểm: Màn hình 12.9 inch hướng về người lái, hệ thống trợ lái ADAS Level 2 cao cấp (Plus), kiểm soát hành trình thích ứng, hỗ trợ giữ làn khẩn cấp, trợ lý giọng nói ViVi.

4. VinFast VF 7:
- Phân khúc: C-SUV phong cách phi thuyền tương lai (Asymmetric Aero do Gomotiv - Ý chắp bút), 5 chỗ ngồi.
- Phiên bản: Base (FWD) và Plus (AWD 2 motor).
- Động cơ: Base: 174 mã lực, 250 Nm | Plus: 349 mã lực (260 kW), 500 Nm (dẫn động 4 bánh toàn thời gian AWD). Tăng tốc 0-100 km/h: 5.8 giây.
- Pin & Tầm hoạt động: Base: 59.6 kWh (~375 km) | Plus: 75.3 kWh (~431 km WLTP).
- Giá niêm yết: Base: 850.000.000 VNĐ | Plus: 999.000.000 VNĐ (Plus trần kính toàn cảnh: 1.024.000.000 VNĐ | kèm pin: 1.199.000.000 VNĐ).
- Đặc điểm: Thiết kế cánh én LED đặc trưng, trần kính toàn cảnh Panorama, nội thất phối da cao cấp 2 tông màu, hệ thống hỗ trợ lái nâng cao ADAS Level 2 tối tân nhất phân khúc C.

5. VinFast VF 8:
- Phân khúc: D-SUV điện thông minh đẳng cấp toàn cầu, 5 chỗ ngồi.
- Phiên bản: Eco và Plus (Pin CATL thế hệ mới).
- Động cơ: 2 motor điện AWD, Eco: 349 mã lực, 500 Nm | Plus: 402 mã lực (300 kW), 620 Nm. Tăng tốc 0-100 km/h: 5.5 giây.
- Pin & Tầm hoạt động: Pin 87.7 kWh, quãng đường ~471 km (Eco) và ~457 km (Plus) (WLTP).
- Giá niêm yết: Eco: ~1.070.000.000 VNĐ | Plus: ~1.270.000.000 VNĐ (kèm pin).
- Đặc điểm: Màn hình trung tâm 15.6 inch siêu nét, HUD hiển thị kính lái, 11 túi khí, ADAS thông minh tự lái trên cao tốc, hỗ trợ chuyển làn tự động, cập nhật phần mềm OTA liên tục.

6. VinFast VF 9:
- Phân khúc: E-SUV Full-size hạng sang đầu bảng, tùy chọn 7 chỗ hoặc 6 chỗ phiên bản Ghế Cơ Trưởng (Captain Seat).
- Phiên bản: Eco và Plus.
- Động cơ: 2 motor điện AWD, 402 mã lực (300 kW), mô-men xoắn 620 Nm.
- Pin & Tầm hoạt động: Pin dung lượng lớn 123 kWh (CATL), quãng đường lên tới ~602 km (Plus) và ~626 km (Eco) (WLTP).
- Giá niêm yết: Eco: 1.566.000.000 VNĐ (thuê pin) | Plus: 1.760.000.000 - 2.280.000.000 VNĐ (kèm pin).
- Đặc điểm: Ghế thương gia massage, sưởi và thông gió đa điểm, điều hòa 3 vùng độc lập, màn hình giải trí riêng cho hàng ghế sau, trần kính cách nhiệt chống tia cực tím 99%, an toàn 5 sao NHTSA / Euro NCAP.

HỆ SINH THÁI & CHÍNH SÁCH VINFAST:
- Mạng lưới trạm sạc V-Green phủ sóng 63 tỉnh thành, các tuyến cao tốc, quốc lộ và trung tâm thương mại. Trạm sạc siêu nhanh công suất 150kW - 250kW.
- Bảo hành xe: 7 - 10 năm hoặc 160.000 - 200.000 km (tùy mẫu xe), pin bảo hành 8 - 10 năm không giới hạn km.
- Chính sách trả góp ưu đãi: Vay đến 70-80% giá trị xe, hỗ trợ lãi suất cố định 5% trong 3 năm đầu, thời gian vay linh hoạt lên tới 8 năm.
`;

// AI Car Advisor Endpoint
app.post('/api/advisor', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Nội dung tin nhắn không được để trống.' });
    }

    const systemInstruction = `Bạn là Trợ Lý Xe Thông Minh của Showroom VinFast Việt Nam (AI Car Advisor).
Quy tắc trả lời:
1. Phong cách trả lời: Sang trọng, tinh tế, chuyên nghiệp, khách quan, giàu chiều sâu công nghệ và chuẩn mực thương hiệu ô tô cao cấp VinFast.
2. Nguồn dữ liệu: DỰA TUYỆT ĐỐI vào DANH MỤC XE ĐIỆN VINFAST đã cung cấp. KHÔNG TỰ BỊA ĐẶT thông số kỹ thuật, giá bán hay chính sách. Nếu thông tin không có trong tài liệu, hãy trả lời trung thực: "Thông tin này chưa được cập nhật chính thức trong hệ thống của chúng tôi."
3. Định dạng: Trình bày súc tích, rõ ràng, gạch đầu dòng các điểm nổi bật hoặc so sánh cụ thể nếu người dùng hỏi về ngân sách, quãng đường hay số chỗ.
4. Tránh dùng từ ngữ sáo rỗng hoặc quảng cáo quá lố. Tập trung vào số liệu thực tế: quãng đường (km), công suất (mã lực / kW), giá niêm yết (VNĐ), kích thước và ưu thế thực tế.
5. Luôn kèm lời nhắc cuối câu: "Lưu ý: Thông tin tư vấn mang tính tham khảo. Quý khách vui lòng xác nhận thông số, giá bán và chính sách ưu đãi hiện hành cùng chuyên viên tư vấn VinFast trước khi giao dịch."
6. Ngôn ngữ: Tiếng Việt chuẩn mực.

DỮ LIỆU HỆ THỐNG:
${VINFAST_KNOWLEDGE_BASE}`;

    const prompt = `Khách hàng hỏi: "${message}"\nHãy phân tích và tư vấn cho khách hàng dựa trên cơ sở dữ liệu VinFast.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const reply = response.text || 'Xin lỗi, tôi chưa thể xử lý yêu cầu lúc này. Quý khách vui lòng thử lại sau giây lát.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/advisor:', error);
    // Provide a rich fallback based on knowledge base if API key is unconfigured or rate limited
    res.json({
      reply: `Chào Quý khách! Dựa trên hệ sinh thái xe điện VinFast:
- Nếu Quý khách cần xe di chuyển đô thị nhỏ gọn, tiết kiệm: **VinFast VF 3** (giá từ 240 triệu) hoặc **VF 5 Plus** (giá từ 468 triệu).
- Nếu Quý khách tìm kiếm SUV phong cách cho gia đình 5 người: **VF 6** (từ 675 triệu) hoặc **VF 7** thể thao khí động học công suất tới 349 HP (từ 850 triệu).
- Nếu Quý khách quan tâm phân khúc SUV cao cấp thông minh hoặc 7 chỗ hạng sang: **VF 8** (từ 1.070 tỷ) hoặc **VF 9** Full-size ghế cơ trưởng (từ 1.566 tỷ).

Lưu ý: Thông tin tư vấn mang tính tham khảo. Quý khách vui lòng xác nhận thông số, giá bán và chính sách ưu đãi hiện hành cùng chuyên viên tư vấn VinFast trước khi giao dịch.`
    });
  }
});

// AI Comparison Analysis Endpoint
app.post('/api/compare-ai', async (req, res) => {
  try {
    const { carIds, carsData } = req.body;
    if (!carIds || carIds.length < 2) {
      return res.status(400).json({ error: 'Cần ít nhất 2 xe để so sánh.' });
    }

    const prompt = `Phân tích khách quan và chuyên sâu sự khác biệt giữa các mẫu xe VinFast sau: ${carIds.join(', ')}.
Dữ liệu chi tiết: ${JSON.stringify(carsData)}
Yêu cầu phân tích:
1. Khác biệt cốt lõi về phân khúc, kích thước và không gian sử dụng.
2. Khác biệt về hiệu năng lái, công suất động cơ và quãng đường pin.
3. Đối tượng khách hàng và mục đích sử dụng tối ưu cho từng xe.
4. Nhận định khách quan, không thiên vị, không đánh dấu "xe tốt nhất" vì mỗi xe phục vụ một nhu cầu khác nhau.
Kèm disclaimer: "Thông tin tư vấn mang tính tham khảo. Quý khách vui lòng trải nghiệm lái thử thực tế tại showroom để có đánh giá chuẩn xác nhất."`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là chuyên gia phân tích kỹ thuật ô tô điện VinFast cao cấp. Trình bày cô đọng, khách quan, dùng số liệu kỹ thuật chính xác.',
        temperature: 0.3,
      },
    });

    res.json({ analysis: response.text });
  } catch (error) {
    console.error('Error in /api/compare-ai:', error);
    res.json({
      analysis: 'Hệ thống đã so sánh các thông số kỹ thuật dựa trên bảng tiêu chuẩn. Mỗi dòng xe VinFast được tinh chỉnh cho từng mục đích sử dụng riêng biệt: đô thị linh hoạt, phong cách cá tính hay không gian gia đình hạng sang. Quý khách vui lòng xem bảng chi tiết bên trên hoặc đăng ký lái thử trực tiếp.'
    });
  }
});

// Lead Submission Endpoint
app.post('/api/leads', (req, res) => {
  const { fullName, phone, email, carModel, leadType, city, preferredDate, preferredTime, note, configuration } = req.body;
  
  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Vui lòng cung cấp họ tên và số điện thoại.' });
  }

  const newLead: Lead = {
    id: `lead-${Date.now().toString(36)}`,
    fullName,
    phone,
    email,
    carModel: carModel || 'VinFast Electric Vehicle',
    leadType: leadType || 'test_drive',
    city,
    preferredDate,
    preferredTime,
    note,
    configuration,
    createdAt: new Date().toISOString(),
  };

  leadsStore.unshift(newLead);
  res.status(201).json({ success: true, lead: newLead });
});

// Admin Leads & Stats Endpoint
app.get('/api/leads', (req, res) => {
  res.json({ leads: leadsStore });
});

app.get('/api/stats', (req, res) => {
  const totalLeads = leadsStore.length;
  const testDrives = leadsStore.filter(l => l.leadType === 'test_drive').length;
  const quoteRequests = leadsStore.filter(l => l.leadType === 'quote').length;
  const financeRequests = leadsStore.filter(l => l.leadType === 'finance').length;
  
  // Model counts
  const modelCounts: Record<string, number> = {};
  leadsStore.forEach(l => {
    modelCounts[l.carModel] = (modelCounts[l.carModel] || 0) + 1;
  });

  res.json({
    totalLeads,
    testDrives,
    quoteRequests,
    financeRequests,
    modelCounts,
  });
});

// Serve frontend in production or mount vite middlewares in dev
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`VinFast Luxury Showroom Server listening on http://localhost:${PORT}`);
  });
}

startServer();
