import { type Service, type InsertService, type Inquiry, type InsertInquiry, type AdminUser, type InsertAdminUser, type AppleIdKey, type InsertAppleIdKey, type Module, type InsertModule, services, inquiries, adminUsers, appleIdKeys, modules } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;
  
  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  deleteInquiry(id: string): Promise<boolean>;
  
  // Admin Users
  getAdminUser(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  verifyAdminPassword(username: string, password: string): Promise<boolean>;
  
  // Apple ID Keys
  getAppleIdKeys(): Promise<AppleIdKey[]>;
  createAppleIdKey(key: InsertAppleIdKey): Promise<AppleIdKey>;
  getAppleIdKeyByCode(keyCode: string): Promise<AppleIdKey | undefined>;
  useAppleIdKey(keyCode: string): Promise<AppleIdKey | undefined>;
  deleteAppleIdKey(id: string): Promise<boolean>;
  
  // Modules
  getModules(): Promise<Module[]>;
  createModule(module: InsertModule): Promise<Module>;
  updateModule(id: string, module: Partial<InsertModule>): Promise<Module | undefined>;
  deleteModule(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;
  private inquiries: Map<string, Inquiry>;
  private adminUsers: Map<string, AdminUser>;
  private appleIdKeys: Map<string, AppleIdKey>;
  private modules: Map<string, Module>;

  constructor() {
    this.services = new Map();
    this.inquiries = new Map();
    this.adminUsers = new Map();
    this.appleIdKeys = new Map();
    this.modules = new Map();
    this.seedServices();
    this.seedAdmin();
    this.seedModules();
  }

  private seedServices() {
    const seedServices: InsertService[] = [
      {
        name: "Apple ID",
        description: "Tài khoản Apple ID đã xác thực, truy cập App Store, iCloud và các dịch vụ Apple premium.",
        price: 150000,
        originalPrice: 300000,
        features: ["Bảo hành 30 ngày", "Hỗ trợ 24/7", "Không giới hạn thiết bị"],
        iconClass: "fab fa-apple",
        iconBgGradient: "from-gray-100 to-gray-200",
        available: true,
        isCombo: false,
        status: "available"
      },
      {
        name: "Netflix Premium",
        description: "Truy cập không giới hạn thư viện Netflix với chất lượng 4K Ultra HD và âm thanh vượt trội.",
        price: 60000,
        originalPrice: 260000,
        features: ["Chất lượng 4K UHD", "4 màn hình cùng lúc", "Tải offline không giới hạn"],
        iconClass: "fas fa-film",
        iconBgGradient: "from-red-600 to-red-700",
        available: true,
        isCombo: false,
        status: "available"
      },
      {
        name: "Discord Nitro",
        description: "Nâng cấp trải nghiệm Discord với emoji custom, boost server và nhiều tính năng premium.",
        price: 45000,
        originalPrice: 120000,
        features: ["Emoji & sticker tùy chỉnh", "2 Server Boost miễn phí", "Upload file lên 100MB"],
        iconClass: "fab fa-discord",
        iconBgGradient: "from-indigo-500 to-purple-600",
        available: true,
        isCombo: false,
        status: "limited"
      },
      {
        name: "YouTube Premium",
        description: "Xem YouTube không quảng cáo, tải video offline và truy cập YouTube Music miễn phí.",
        price: 40000,
        originalPrice: 180000,
        features: ["Không quảng cáo", "YouTube Music Premium", "Phát nền & tải offline"],
        iconClass: "fab fa-youtube",
        iconBgGradient: "from-red-500 to-red-600",
        available: true,
        isCombo: false,
        status: "available"
      },
      {
        name: "Spotify Premium",
        description: "Thưởng thức âm nhạc chất lượng cao không quảng cáo với khả năng tải offline không giới hạn.",
        price: 35000,
        originalPrice: 150000,
        features: ["Chất lượng 320kbps", "Tải offline không giới hạn", "Bỏ qua bài không giới hạn"],
        iconClass: "fab fa-spotify",
        iconBgGradient: "from-green-500 to-green-600",
        available: true,
        isCombo: false,
        status: "available"
      },
    ];

    seedServices.forEach(service => {
      const id = randomUUID();
      this.services.set(id, { 
        ...service, 
        id,
        available: service.available ?? true,
        isCombo: service.isCombo ?? false,
        status: service.status ?? "available"
      });
    });
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id,
      available: insertService.available ?? true,
      isCombo: insertService.isCombo ?? false,
      status: insertService.status ?? "available"
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, updateData: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    
    const updatedService: Service = { ...service, ...updateData };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = { 
      ...insertInquiry,
      customerPhone: insertInquiry.customerPhone ?? null,
      message: insertInquiry.message ?? null,
      id, 
      createdAt: new Date().toISOString() 
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  async deleteInquiry(id: string): Promise<boolean> {
    return this.inquiries.delete(id);
  }

  private async seedAdmin() {
    const hashedPassword = await bcrypt.hash("Ct@112233", 10);
    const adminUser: AdminUser = {
      id: randomUUID(),
      username: "admin",
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.adminUsers.set("admin", adminUser);
  }

  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    return this.adminUsers.get(username);
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const id = randomUUID();
    const adminUser: AdminUser = {
      ...insertUser,
      id,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.adminUsers.set(insertUser.username, adminUser);
    return adminUser;
  }

  async verifyAdminPassword(username: string, password: string): Promise<boolean> {
    const user = await this.getAdminUser(username);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }

  // Apple ID Keys methods
  async getAppleIdKeys(): Promise<AppleIdKey[]> {
    return Array.from(this.appleIdKeys.values());
  }

  async createAppleIdKey(insertKey: InsertAppleIdKey): Promise<AppleIdKey> {
    const id = randomUUID();
    const keyCode = Math.random().toString(36).substring(2, 10).toUpperCase(); // Generate 8 character key
    const key: AppleIdKey = {
      ...insertKey,
      id,
      keyCode,
      usageCount: 0,
      createdAt: new Date(),
      usedAt: null,
    };
    this.appleIdKeys.set(keyCode, key);
    return key;
  }

  async getAppleIdKeyByCode(keyCode: string): Promise<AppleIdKey | undefined> {
    return this.appleIdKeys.get(keyCode);
  }

  async useAppleIdKey(keyCode: string): Promise<AppleIdKey | undefined> {
    const key = this.appleIdKeys.get(keyCode);
    if (!key) return undefined;
    
    if (key.usageCount >= key.maxUsage) {
      return undefined; // Key has been used up
    }

    const updatedKey: AppleIdKey = {
      ...key,
      usageCount: key.usageCount + 1,
      usedAt: new Date(),
    };
    
    this.appleIdKeys.set(keyCode, updatedKey);
    return updatedKey;
  }

  async deleteAppleIdKey(id: string): Promise<boolean> {
    const entries = Array.from(this.appleIdKeys.entries());
    for (const [keyCode, key] of entries) {
      if (key.id === id) {
        return this.appleIdKeys.delete(keyCode);
      }
    }
    return false;
  }

  // Modules methods
  async getModules(): Promise<Module[]> {
    return Array.from(this.modules.values());
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = randomUUID();
    const module: Module = {
      ...insertModule,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.modules.set(id, module);
    return module;
  }

  async updateModule(id: string, updateData: Partial<InsertModule>): Promise<Module | undefined> {
    const module = this.modules.get(id);
    if (!module) return undefined;
    
    const updatedModule: Module = { 
      ...module, 
      ...updateData, 
      updatedAt: new Date() 
    };
    this.modules.set(id, updatedModule);
    return updatedModule;
  }

  async deleteModule(id: string): Promise<boolean> {
    return this.modules.delete(id);
  }

  private seedModules() {
    const sampleModules = [
      // Nightmarket Server modules
      {
        name: "VIP Wink",
        description: "Mở khóa tính năng VIP cho ứng dụng Wink",
        category: "Social & Dating",
        link: "https://raw.githubusercontent.com/NightmarketServer/Shadowrocket-Module/refs/heads/main/Module/VIP%20Wink.module",
        type: "shadowrocket" as const,
        iconClass: "fas fa-heart",
        status: "new" as const,
      },
      {
        name: "All Star",
        description: "Mở khóa tính năng premium All Star",
        category: "Productivity",
        link: "https://raw.githubusercontent.com/NightmarketServer/Shadowrocket-Module/refs/heads/main/Module/All%20Star.module",
        type: "shadowrocket" as const,
        iconClass: "fas fa-star",
        status: "new" as const,
      },
      {
        name: "VSCO Premium",
        description: "Mở khóa VSCO Premium với tất cả filter và tính năng",
        category: "Photo & Video",
        link: "https://raw.githubusercontent.com/NightmarketServer/Shadowrocket-Module/refs/heads/main/Module/VSCO%20Premium.module",
        type: "shadowrocket" as const,
        iconClass: "fas fa-camera",
        status: "new" as const,
      },
      {
        name: "Vivacut",
        description: "Mở khóa Vivacut Premium cho chỉnh sửa video",
        category: "Photo & Video",
        link: "https://raw.githubusercontent.com/NightmarketServer/Shadowrocket-Module/refs/heads/main/Module/Vivacut.module",
        type: "shadowrocket" as const,
        iconClass: "fas fa-video",
        status: "new" as const,
      },
      {
        name: "Picsart Premium",
        description: "Mở khóa Picsart Premium với tất cả tools và templates",
        category: "Photo & Video",
        link: "https://raw.githubusercontent.com/NightmarketServer/Shadowrocket-Module/refs/heads/main/Module/Picsart%20Premium.module",
        type: "shadowrocket" as const,
        iconClass: "fas fa-paint-brush",
        status: "new" as const,
      },
      {
        name: "Locket Gold V4",
        description: "Mở khóa Locket Gold V4 với tất cả tính năng premium",
        category: "Social & Dating",
        link: "https://raw.githubusercontent.com/NightmarketServer/Locket/refs/heads/main/Locket%20-V4.module",
        type: "shadowrocket" as const,
        iconClass: "fas fa-lock",
        status: "new" as const,
      },
      {
        name: "Alight Motion",
        description: "Mở khóa Alight Motion Premium cho animation và VFX",
        category: "Photo & Video",
        link: "https://raw.githubusercontent.com/NightmarketServer/Shadowrocket-Module/refs/heads/main/Module/Alight%20Motion.module",
        type: "shadowrocket" as const,
        iconClass: "fas fa-magic",
        status: "new" as const,
      },
      {
        name: "SoundCloudPlus",
        description: "Mở khóa SoundCloud Plus với tất cả tính năng premium",
        category: "Music Streaming",
        link: "https://raw.githubusercontent.com/NightmarketServer/SoundCloudPlus/refs/heads/main/soundcloudplus.module",
        type: "shadowrocket" as const,
        iconClass: "fab fa-soundcloud",
        status: "new" as const,
      },
      {
        name: "Bilibili No ADS",
        description: "Chặn quảng cáo Bilibili và mở khóa tính năng premium",
        category: "Video Streaming",
        link: "https://raw.githubusercontent.com/NightmarketServer/Bilibili-No-ADS/refs/heads/main/Bilibili%20No%20ADS",
        type: "shadowrocket" as const,
        iconClass: "fas fa-play-circle",
        status: "new" as const,
      },
      {
        name: "Spotify Plus",
        description: "Mở khóa Spotify Premium với tất cả tính năng và chặn quảng cáo",
        category: "Music Streaming",
        link: "https://raw.githubusercontent.com/NightmarketServer/Spotify/refs/heads/main/SpotifyPre.module",
        type: "shadowrocket" as const,
        iconClass: "fab fa-spotify",
        status: "updated" as const,
      },
      {
        name: "YouTube Premium",
        description: "Chặn quảng cáo YouTube và mở khóa Premium features",
        category: "Video Streaming",
        link: "https://raw.githubusercontent.com/NightmarketServer/Youtube-Premium/refs/heads/main/YouTubePremium.module",
        type: "shadowrocket" as const,
        iconClass: "fab fa-youtube",
        status: "updated" as const,
      },
      // Original sample modules
      {
        name: "TikTok Region Unlock",
        description: "Mở khóa khu vực TikTok và loại bỏ watermark",
        category: "Social Media", 
        link: "https://raw.githubusercontent.com/Semporia/TikTok-Unlock/master/Shadowrocket/TikTok-US.conf",
        type: "shadowrocket" as const,
        iconClass: "fab fa-tiktok",
        status: "active" as const,
      },
      {
        name: "Instagram Premium",
        description: "Mở khóa tính năng Premium Instagram",
        category: "Social Media",
        link: "https://raw.githubusercontent.com/app2smile/rules/master/module/instagram.module",
        type: "shadowrocket" as const,
        iconClass: "fab fa-instagram", 
        status: "active" as const,
      },
      {
        name: "AdBlock Pro",
        description: "Chặn quảng cáo toàn diện cho Safari và các ứng dụng khác",
        category: "AdBlock",
        link: "https://raw.githubusercontent.com/bigdargon/hostsVN/master/option/domain.txt",
        type: "shadowrocket" as const,
        iconClass: "fas fa-shield-alt",
        status: "active" as const,
      },
    ];

    sampleModules.forEach(module => {
      const id = randomUUID();
      this.modules.set(id, {
        ...module,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }
}

export const storage = new MemStorage();
