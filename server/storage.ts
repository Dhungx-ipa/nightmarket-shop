import { type Service, type InsertService, type Inquiry, type InsertInquiry, type AdminUser, type InsertAdminUser, type AppleIdKey, type InsertAppleIdKey, type Module, type InsertModule, services, inquiries, adminUsers, appleIdKeys, modules } from "@shared/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "./db";

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

  // Modules methods (using database)
  async getModules(): Promise<Module[]> {
    return await db.select().from(modules);
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const [newModule] = await db
      .insert(modules)
      .values(insertModule)
      .returning();
    return newModule;
  }

  async updateModule(id: string, updateData: Partial<InsertModule>): Promise<Module | undefined> {
    const [updatedModule] = await db
      .update(modules)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(modules.id, id))
      .returning();
    return updatedModule || undefined;
  }

  async deleteModule(id: string): Promise<boolean> {
    const result = await db
      .delete(modules)
      .where(eq(modules.id, id))
      .returning();
    return result.length > 0;
  }

  private seedModules() {
    // No seed modules - all modules will be managed through database
  }
}

export const storage = new MemStorage();
