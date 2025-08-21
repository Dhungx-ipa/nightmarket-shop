import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // price in VND
  originalPrice: integer("original_price").notNull(),
  features: text("features").array().notNull(),
  iconClass: text("icon_class").notNull(),
  iconBgGradient: text("icon_bg_gradient").notNull(),
  available: boolean("available").notNull().default(true),
  isCombo: boolean("is_combo").notNull().default(false),
  status: text("status").notNull().default("available"), // available, limited, out_of_stock
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceId: text("service_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  message: text("message"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const appleIdKeys = pgTable("apple_id_keys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  keyCode: text("key_code").notNull().unique(),
  appleId: text("apple_id").notNull(),
  password: text("password").notNull(),
  usageCount: integer("usage_count").notNull().default(0),
  maxUsage: integer("max_usage").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  usedAt: timestamp("used_at"),
});

export const modules = pgTable("modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  link: text("link").notNull(),
  type: text("type").notNull().default("shadowrocket"), // shadowrocket, quantumult, surge
  iconClass: text("icon_class").notNull(),
  status: text("status").notNull().default("active"), // active, updated, new
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});

export const insertAppleIdKeySchema = createInsertSchema(appleIdKeys).omit({
  id: true,
  keyCode: true,
  createdAt: true,
  usedAt: true,
  usageCount: true,
}).extend({
  appleId: z.string().min(1, "Apple ID không được để trống").email("Apple ID phải là email hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống").min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  maxUsage: z.number().min(1, "Số lần sử dụng tối đa phải lớn hơn 0"),
});

export const insertModuleSchema = createInsertSchema(modules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Tên module không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  category: z.string().min(1, "Danh mục không được để trống"),
  link: z.string().min(1, "Link không được để trống").url("Link phải là URL hợp lệ"),
  type: z.enum(["shadowrocket", "quantumult", "surge"]),
  iconClass: z.string().min(1, "Icon class không được để trống"),
  status: z.enum(["active", "updated", "new"]),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được để trống"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

export const keyValidationSchema = z.object({
  keyCode: z.string().min(1, "Key không được để trống").length(8, "Key phải có 8 ký tự"),
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAppleIdKey = z.infer<typeof insertAppleIdKeySchema>;
export type AppleIdKey = typeof appleIdKeys.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Module = typeof modules.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type KeyValidationData = z.infer<typeof keyValidationSchema>;
