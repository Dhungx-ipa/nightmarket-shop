import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { loginSchema, type LoginData } from "@shared/schema";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiRequest("POST", "/api/admin/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("admin_token", data.token);
      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng Admin quay trở lại.",
      });
      setLocation("/admin");
    },
    onError: () => {
      toast({
        title: "Đăng nhập thất bại",
        description: "Tên đăng nhập hoặc mật khẩu không đúng.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-night-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-night-darker border-night-purple/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-night-purple to-night-accent rounded-xl flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.752-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" fill="white"/>
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-night-text">
            Admin Login
          </CardTitle>
          <CardDescription className="text-night-muted">
            Đăng nhập vào trang quản trị Nightmarket
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-night-text">Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-night-dark border-night-purple/20 text-night-text"
                        placeholder="Nhập tên đăng nhập"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-night-text">Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="bg-night-dark border-night-purple/20 text-night-text"
                        placeholder="Nhập mật khẩu"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-night-purple to-night-accent py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-night-purple/25 transition-all duration-300"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Đăng nhập
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}