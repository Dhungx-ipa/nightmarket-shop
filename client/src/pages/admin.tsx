import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Service, type Inquiry, type AppleIdKey, insertAppleIdKeySchema, type InsertAppleIdKey, type Module, insertModuleSchema, type InsertModule } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  // Check if admin is authenticated
  const { data: isAuthenticated, isLoading: authLoading } = useQuery({
    queryKey: ["/api/admin/verify"],
    retry: false,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, authLoading, setLocation]);

  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: inquiries = [], isLoading: inquiriesLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  const { data: appleKeys = [], isLoading: keysLoading } = useQuery<AppleIdKey[]>({
    queryKey: ["/api/admin/apple-keys"],
  });

  const { data: modules = [], isLoading: modulesLoading } = useQuery<Module[]>({
    queryKey: ["/api/admin/modules"],
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Đã xóa dịch vụ",
        description: "Dịch vụ đã được xóa thành công.",
      });
    },
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/inquiries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({
        title: "Đã xóa liên hệ",
        description: "Liên hệ đã được xóa thành công.",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("admin_token");
      queryClient.clear();
      setLocation("/admin/login");
      toast({
        title: "Đã đăng xuất",
        description: "Đăng xuất thành công.",
      });
    },
  });

  const createAppleKeyMutation = useMutation({
    mutationFn: async (data: InsertAppleIdKey) => {
      const response = await apiRequest("POST", "/api/admin/apple-keys", data);
      return response.json();
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/apple-keys"] });
      keyForm.reset();
      toast({
        title: "Đã tạo key thành công!",
        description: `Key mới: ${result.keyCode}`,
      });
    },
    onError: (error: Error) => {
      console.error("Error creating key:", error);
      toast({
        title: "Lỗi khi tạo key",
        description: error.message || "Không thể tạo key. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const deleteAppleKeyMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/apple-keys/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/apple-keys"] });
      toast({
        title: "Đã xóa key",
        description: "Key Apple ID đã được xóa thành công.",
      });
    },
  });

  const createModuleMutation = useMutation({
    mutationFn: async (data: InsertModule) => {
      const response = await apiRequest("POST", "/api/admin/modules", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/modules"] });
      moduleForm.reset();
      toast({
        title: "Đã tạo module thành công!",
        description: "Module mới đã được thêm vào hệ thống.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi khi tạo module",
        description: error.message || "Không thể tạo module. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const deleteModuleMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/modules/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/modules"] });
      toast({
        title: "Đã xóa module",
        description: "Module đã được xóa thành công.",
      });
    },
  });

  const updateModuleMutation = useMutation({
    mutationFn: async (data: { id: string; updates: Partial<InsertModule> }) => {
      const response = await apiRequest("PUT", `/api/admin/modules/${data.id}`, data.updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/modules"] });
      setEditingModule(null);
      moduleForm.reset();
      toast({
        title: "Đã cập nhật module thành công!",
        description: "Thông tin module đã được cập nhật.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi khi cập nhật module",
        description: error.message || "Không thể cập nhật module. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const keyForm = useForm<InsertAppleIdKey>({
    resolver: zodResolver(insertAppleIdKeySchema),
    defaultValues: {
      appleId: "",
      password: "",
      maxUsage: 1,
    },
  });

  const moduleForm = useForm<InsertModule>({
    resolver: zodResolver(insertModuleSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      link: "",
      type: "shadowrocket",
      iconClass: "fas fa-rocket",
      status: "active",
    },
  });

  const onCreateKey = (data: InsertAppleIdKey) => {
    console.log("Creating key with data:", data);
    createAppleKeyMutation.mutate(data);
  };

  const onCreateModule = (data: InsertModule) => {
    createModuleMutation.mutate(data);
  };

  const onUpdateModule = (data: InsertModule) => {
    if (editingModule) {
      updateModuleMutation.mutate({
        id: editingModule.id,
        updates: data,
      });
    }
  };

  const handleEditModule = (module: Module) => {
    setEditingModule(module);
    moduleForm.reset({
      name: module.name,
      description: module.description,
      category: module.category,
      link: module.link,
      type: module.type as "shadowrocket" | "quantumult" | "surge",
      iconClass: module.iconClass,
      status: module.status as "active" | "updated" | "new",
    });
    
    // Cuộn lên phần form chỉnh sửa
    setTimeout(() => {
      const moduleFormElement = document.querySelector('[data-testid="form-module"]');
      if (moduleFormElement) {
        moduleFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditingModule(null);
    moduleForm.reset({
      name: "",
      description: "",
      category: "",
      link: "",
      type: "shadowrocket",
      iconClass: "fas fa-rocket",
      status: "active",
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-night-dark flex items-center justify-center">
        <div className="text-night-text">
          <i className="fas fa-spinner fa-spin mr-2"></i>
          Đang kiểm tra quyền truy cập...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500/20 text-green-400">Còn hàng</Badge>;
      case "limited":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Sắp hết</Badge>;
      case "popular":
        return <Badge className="bg-night-accent/20 text-night-accent">Phổ biến</Badge>;
      default:
        return <Badge className="bg-red-500/20 text-red-400">Hết hàng</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-night-dark">
      <nav className="bg-night-darker border-b border-night-purple/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-night-purple to-night-accent rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.752-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" fill="white"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-night-text">Admin Dashboard</span>
          </div>
          <Button
            onClick={() => logoutMutation.mutate()}
            variant="outline"
            className="border-night-purple/50 text-night-text hover:bg-night-purple/10"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Đăng xuất
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-night-darker border-night-purple/20">
            <CardHeader>
              <CardTitle className="text-night-text flex items-center">
                <i className="fas fa-cogs mr-2 text-night-purple"></i>
                Tổng dịch vụ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-night-purple">
                {services.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-night-darker border-night-purple/20">
            <CardHeader>
              <CardTitle className="text-night-text flex items-center">
                <i className="fas fa-envelope mr-2 text-night-accent"></i>
                Liên hệ mới
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-night-accent">
                {inquiries.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-night-darker border-night-purple/20">
            <CardHeader>
              <CardTitle className="text-night-text flex items-center">
                <i className="fas fa-check-circle mr-2 text-green-400"></i>
                Dịch vụ hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {services.filter(s => s.available).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-night-darker">
            <TabsTrigger value="services" className="data-[state=active]:bg-night-purple">
              Quản lý dịch vụ
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-night-purple">
              Quản lý liên hệ
            </TabsTrigger>
            <TabsTrigger value="keys" className="data-[state=active]:bg-night-purple">
              Key ID
            </TabsTrigger>
            <TabsTrigger value="modules" className="data-[state=active]:bg-night-purple">
              Modules
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <Card className="bg-night-darker border-night-purple/20">
              <CardHeader>
                <CardTitle className="text-night-text">Danh sách dịch vụ</CardTitle>
                <CardDescription className="text-night-muted">
                  Quản lý tất cả dịch vụ có sẵn
                </CardDescription>
              </CardHeader>
              <CardContent>
                {servicesLoading ? (
                  <div className="text-center py-8 text-night-muted">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Đang tải...
                  </div>
                ) : (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 bg-night-dark rounded-lg border border-night-purple/10"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.iconBgGradient} rounded-lg flex items-center justify-center`}>
                            <i className={`${service.iconClass} text-white`}></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-night-text">{service.name}</h3>
                            <p className="text-sm text-night-muted">{service.description}</p>
                            <div className="mt-1">
                              {getStatusBadge(service.status)}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => deleteServiceMutation.mutate(service.id)}
                          variant="destructive"
                          size="sm"
                          disabled={deleteServiceMutation.isPending}
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Xóa
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card className="bg-night-darker border-night-purple/20">
              <CardHeader>
                <CardTitle className="text-night-text">Danh sách liên hệ</CardTitle>
                <CardDescription className="text-night-muted">
                  Quản lý tất cả liên hệ từ khách hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                {inquiriesLoading ? (
                  <div className="text-center py-8 text-night-muted">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Đang tải...
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="text-center py-8 text-night-muted">
                    Chưa có liên hệ nào
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="p-4 bg-night-dark rounded-lg border border-night-purple/10"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <h3 className="font-semibold text-night-text">{inquiry.customerName}</h3>
                              <span className="text-sm text-night-muted">{inquiry.customerEmail}</span>
                              {inquiry.customerPhone && (
                                <span className="text-sm text-night-muted">{inquiry.customerPhone}</span>
                              )}
                            </div>
                            <p className="text-night-text mb-2">{inquiry.message}</p>
                            <p className="text-xs text-night-muted">
                              Dịch vụ quan tâm: {services.find(s => s.id === inquiry.serviceId)?.name || "Không xác định"}
                            </p>
                            <p className="text-xs text-night-muted">
                              Thời gian: {new Date(inquiry.createdAt).toLocaleString("vi-VN")}
                            </p>
                          </div>
                          <Button
                            onClick={() => deleteInquiryMutation.mutate(inquiry.id)}
                            variant="destructive"
                            size="sm"
                            disabled={deleteInquiryMutation.isPending}
                          >
                            <i className="fas fa-trash mr-1"></i>
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create Key Form */}
              <Card className="bg-night-darker border-night-purple/20">
                <CardHeader>
                  <CardTitle className="text-night-text">Tạo Key ID Mới</CardTitle>
                  <CardDescription className="text-night-muted">
                    Tạo key mới để người dùng có thể nhận Apple ID
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...keyForm}>
                    <form onSubmit={keyForm.handleSubmit(onCreateKey)} className="space-y-4">
                      <FormField
                        control={keyForm.control}
                        name="appleId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-night-text">Apple ID</FormLabel>
                            <FormControl>
                              <Input
                                data-testid="input-apple-id"
                                placeholder="example@icloud.com"
                                className="bg-night-dark border-night-purple/30 text-night-text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={keyForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-night-text">Mật khẩu</FormLabel>
                            <FormControl>
                              <Input
                                data-testid="input-password"
                                type="password"
                                placeholder="Mật khẩu Apple ID"
                                className="bg-night-dark border-night-purple/30 text-night-text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={keyForm.control}
                        name="maxUsage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-night-text">Số lần sử dụng tối đa</FormLabel>
                            <FormControl>
                              <Input
                                data-testid="input-max-usage"
                                type="number"
                                min="1"
                                placeholder="1"
                                className="bg-night-dark border-night-purple/30 text-night-text"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        data-testid="button-create-key"
                        type="submit"
                        className="w-full bg-gradient-to-r from-night-purple to-night-accent hover:from-night-purple/90 hover:to-night-accent/90"
                        disabled={createAppleKeyMutation.isPending}
                        onClick={() => {
                          console.log("Form values:", keyForm.getValues());
                          console.log("Form errors:", keyForm.formState.errors);
                          console.log("Form is valid:", keyForm.formState.isValid);
                        }}
                      >
                        {createAppleKeyMutation.isPending ? "Đang tạo..." : "Tạo Key"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Keys List */}
              <Card className="bg-night-darker border-night-purple/20">
                <CardHeader>
                  <CardTitle className="text-night-text">Danh sách Key</CardTitle>
                  <CardDescription className="text-night-muted">
                    Quản lý các key đã tạo ({appleKeys.length} keys)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {keysLoading ? (
                    <div className="text-center py-4 text-night-muted">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Đang tải keys...
                    </div>
                  ) : appleKeys.length === 0 ? (
                    <div className="text-center py-8 text-night-muted">
                      <i className="fas fa-key text-4xl mb-4 opacity-50"></i>
                      <p>Chưa có key nào được tạo</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {appleKeys.map((key) => (
                        <div
                          key={key.id}
                          data-testid={`card-key-${key.id}`}
                          className="p-4 bg-night-dark rounded-lg border border-night-purple/10"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <span 
                                  data-testid={`text-key-code-${key.id}`}
                                  className="font-mono font-bold text-night-accent bg-night-purple/20 px-2 py-1 rounded text-sm"
                                >
                                  {key.keyCode}
                                </span>
                                <Badge variant={key.usageCount >= key.maxUsage ? "destructive" : "default"}>
                                  {key.usageCount >= key.maxUsage ? "Đã hết" : "Còn dùng"}
                                </Badge>
                              </div>
                              <p data-testid={`text-apple-id-${key.id}`} className="text-sm text-night-text truncate">
                                <span className="text-night-muted">Apple ID:</span> {key.appleId}
                              </p>
                              <p data-testid={`text-usage-${key.id}`} className="text-sm text-night-muted">
                                Đã dùng: {key.usageCount}/{key.maxUsage}
                              </p>
                              <p className="text-xs text-night-muted">
                                Tạo: {new Date(key.createdAt as Date).toLocaleString("vi-VN")}
                              </p>
                              {key.usedAt && (
                                <p className="text-xs text-night-muted">
                                  Dùng gần nhất: {new Date(key.usedAt as Date).toLocaleString("vi-VN")}
                                </p>
                              )}
                            </div>
                            <Button
                              data-testid={`button-delete-key-${key.id}`}
                              onClick={() => deleteAppleKeyMutation.mutate(key.id)}
                              variant="destructive"
                              size="sm"
                              disabled={deleteAppleKeyMutation.isPending}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules">
            <div className="space-y-6">
              {/* Create/Edit Module Form */}
              <Card className="bg-night-darker border-night-purple/20" data-testid="form-module">
                <CardHeader>
                  <CardTitle className="text-night-text">
                    {editingModule ? 'Chỉnh sửa Module' : 'Tạo Module Mới'}
                  </CardTitle>
                  <CardDescription className="text-night-muted">
                    {editingModule ? 'Cập nhật thông tin module' : 'Thêm module ShadowRocket mới vào hệ thống'}
                  </CardDescription>
                  {editingModule && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-night-accent">
                        Đang chỉnh sửa: {editingModule.name}
                      </Badge>
                      <Button
                        data-testid="button-cancel-edit"
                        onClick={handleCancelEdit}
                        variant="ghost"
                        size="sm"
                        className="text-night-muted hover:text-night-text"
                      >
                        <i className="fas fa-times mr-1"></i>
                        Hủy
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <Form {...moduleForm}>
                    <form onSubmit={moduleForm.handleSubmit(editingModule ? onUpdateModule : onCreateModule)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={moduleForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-night-text">Tên Module *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="VD: YouTube Premium"
                                  className="bg-night-dark border-night-purple/30 text-night-text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={moduleForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-night-text">Danh mục *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="VD: Video Streaming"
                                  className="bg-night-dark border-night-purple/30 text-night-text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={moduleForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-night-text">Mô tả *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="VD: Chặn quảng cáo YouTube và mở khóa Premium features"
                                className="bg-night-dark border-night-purple/30 text-night-text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleForm.control}
                        name="link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-night-text">Link Module *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://raw.githubusercontent.com/..."
                                className="bg-night-dark border-night-purple/30 text-night-text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={moduleForm.control}
                          name="iconClass"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-night-text">Icon Class *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="fab fa-youtube"
                                  className="bg-night-dark border-night-purple/30 text-night-text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={moduleForm.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-night-text">Loại *</FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="w-full p-2 bg-night-dark border border-night-purple/30 rounded-md text-night-text"
                                >
                                  <option value="shadowrocket">ShadowRocket</option>
                                  <option value="quantumult">QuantumultX</option>
                                  <option value="surge">Surge</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={moduleForm.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-night-text">Trạng thái *</FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="w-full p-2 bg-night-dark border border-night-purple/30 rounded-md text-night-text"
                                >
                                  <option value="active">Hoạt động</option>
                                  <option value="updated">Cập nhật</option>
                                  <option value="new">Mới</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        data-testid="button-submit-module"
                        type="submit"
                        className="w-full bg-gradient-to-r from-night-purple to-night-accent hover:from-night-purple/90 hover:to-night-accent/90"
                        disabled={editingModule ? updateModuleMutation.isPending : createModuleMutation.isPending}
                      >
                        {editingModule ? 
                          (updateModuleMutation.isPending ? "Đang cập nhật..." : "Cập nhật Module") :
                          (createModuleMutation.isPending ? "Đang tạo..." : "Tạo Module")
                        }
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Modules List */}
              <Card className="bg-night-darker border-night-purple/20">
                <CardHeader>
                  <CardTitle className="text-night-text">Danh sách Modules</CardTitle>
                  <CardDescription className="text-night-muted">
                    Quản lý modules ShadowRocket ({modules.length} modules)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {modulesLoading ? (
                    <div className="text-center py-4 text-night-muted">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Đang tải modules...
                    </div>
                  ) : modules.length === 0 ? (
                    <div className="text-center py-8 text-night-muted">
                      <i className="fas fa-rocket text-4xl mb-4 opacity-50"></i>
                      <p>Chưa có module nào được tạo</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {modules.map((module) => (
                        <div
                          key={module.id}
                          className="p-4 bg-night-dark rounded-lg border border-night-purple/10"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">
                                <i className={module.iconClass} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-night-text">{module.name}</h4>
                                <p className="text-xs text-night-muted">{module.category}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                className={
                                  module.status === 'new' ? 'bg-green-500' :
                                  module.status === 'updated' ? 'bg-blue-500' : 'bg-gray-500'
                                }
                              >
                                {module.status === 'new' ? 'Mới' :
                                 module.status === 'updated' ? 'Cập nhật' : 'Hoạt động'}
                              </Badge>
                              <Button
                                data-testid={`button-edit-module-${module.id}`}
                                onClick={() => handleEditModule(module)}
                                variant="outline"
                                size="icon"
                                className="border-night-purple/50 text-night-text hover:bg-night-purple/10"
                                aria-label="Sửa module"
                                title="Sửa module"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                data-testid={`button-delete-module-${module.id}`}
                                onClick={() => deleteModuleMutation.mutate(module.id)}
                                variant="destructive"
                                size="icon"
                                disabled={deleteModuleMutation.isPending}
                                aria-label="Xóa module"
                                title="Xóa module"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-night-muted mb-2">{module.description}</p>
                          <div className="text-xs text-night-muted space-y-1">
                            <p><span className="text-night-text">Loại:</span> {module.type}</p>
                            <p className="truncate"><span className="text-night-text">Link:</span> {module.link}</p>
                            <p><span className="text-night-text">Tạo:</span> {new Date(module.createdAt as Date).toLocaleString("vi-VN")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
