import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, loginSchema, insertAppleIdKeySchema, keyValidationSchema, insertModuleSchema } from "@shared/schema";
import DOMPurify from "isomorphic-dompurify";
import { randomBytes } from "crypto";

// Simple session storage (in production, use Redis or proper session store)
const adminSessions = new Set<string>();

// Sanitize input function
const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  if (input && typeof input === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return input;
};

// Admin middleware
const requireAdmin = (req: any, res: any, next: any) => {
  const sessionId = req.headers.authorization?.replace("Bearer ", "");
  if (!sessionId || !adminSessions.has(sessionId)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get single service
  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const sanitizedBody = sanitizeInput(req.body);
      const validatedData = insertInquirySchema.parse(sanitizedBody);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create inquiry" });
      }
    }
  });

  // Get all inquiries (admin)
  app.get("/api/inquiries", requireAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const isValid = await storage.verifyAdminPassword(
        validatedData.username,
        validatedData.password
      );
      
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create secure session using crypto.randomBytes
      const sessionId = randomBytes(32).toString('hex');
      adminSessions.add(sessionId);
      
      res.json({ token: sessionId });
    } catch (error) {
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  app.get("/api/admin/verify", requireAdmin, (req, res) => {
    res.json({ authenticated: true });
  });

  app.post("/api/admin/logout", requireAdmin, (req, res) => {
    const sessionId = req.headers.authorization?.replace("Bearer ", "");
    if (sessionId) {
      adminSessions.delete(sessionId);
    }
    res.json({ message: "Logged out" });
  });

  // Admin management routes
  app.delete("/api/admin/services/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteService(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json({ message: "Service deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  app.delete("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteInquiry(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Inquiry not found" });
      }
      res.json({ message: "Inquiry deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete inquiry" });
    }
  });

  // Apple ID Key validation (public route for /idfree)
  app.post("/api/keys/validate", async (req, res) => {
    try {
      const validatedData = keyValidationSchema.parse(req.body);
      const key = await storage.useAppleIdKey(validatedData.keyCode);
      
      if (!key) {
        return res.status(404).json({ message: "Key không hợp lệ hoặc đã hết lượt sử dụng" });
      }

      res.json({
        appleId: key.appleId,
        password: key.password,
        usageCount: key.usageCount,
        maxUsage: key.maxUsage,
        remainingUsage: key.maxUsage - key.usageCount
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to validate key" });
      }
    }
  });

  // Apple ID Keys management (admin routes)
  app.get("/api/admin/apple-keys", requireAdmin, async (req, res) => {
    try {
      const keys = await storage.getAppleIdKeys();
      res.json(keys);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Apple ID keys" });
    }
  });

  app.post("/api/admin/apple-keys", requireAdmin, async (req, res) => {
    try {
      const sanitizedBody = sanitizeInput(req.body);
      const validatedData = insertAppleIdKeySchema.parse(sanitizedBody);
      const key = await storage.createAppleIdKey(validatedData);
      res.status(201).json(key);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create Apple ID key" });
      }
    }
  });

  app.delete("/api/admin/apple-keys/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteAppleIdKey(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Apple ID key not found" });
      }
      res.json({ message: "Apple ID key deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete Apple ID key" });
    }
  });

  // Modules API (public route for /modules page)
  app.get("/api/modules", async (req, res) => {
    try {
      const modules = await storage.getModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch modules" });
    }
  });

  // Modules management (admin routes)
  app.get("/api/admin/modules", requireAdmin, async (req, res) => {
    try {
      const modules = await storage.getModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch modules" });
    }
  });

  app.post("/api/admin/modules", requireAdmin, async (req, res) => {
    try {
      const sanitizedBody = sanitizeInput(req.body);
      const validatedData = insertModuleSchema.parse(sanitizedBody);
      const module = await storage.createModule(validatedData);
      res.status(201).json(module);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create module" });
      }
    }
  });

  app.put("/api/admin/modules/:id", requireAdmin, async (req, res) => {
    try {
      const sanitizedBody = sanitizeInput(req.body);
      const validatedData = insertModuleSchema.partial().parse(sanitizedBody);
      const module = await storage.updateModule(req.params.id, validatedData);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to update module" });
      }
    }
  });

  app.delete("/api/admin/modules/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteModule(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json({ message: "Module deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete module" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
