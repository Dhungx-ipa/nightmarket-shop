import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { keyValidationSchema, type KeyValidationData } from "@shared/schema";
import { Copy, Eye, EyeOff, CheckCircle, Key } from "lucide-react";
import AdBanner from "@/components/ad-banner";
import InstallPrompt from "@/components/install-prompt";

interface AppleIdResult {
  appleId: string;
  password: string;
  usageCount: number;
  maxUsage: number;
  remainingUsage: number;
}

export default function IdFree() {
  const [result, setResult] = useState<AppleIdResult | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<KeyValidationData>({
    resolver: zodResolver(keyValidationSchema),
    defaultValues: {
      keyCode: "",
    },
  });

  const validateKeyMutation = useMutation({
    mutationFn: async (data: KeyValidationData) => {
      const response = await apiRequest("POST", "/api/keys/validate", data);
      return response.json();
    },
    onSuccess: (data: AppleIdResult) => {
      setResult(data);
      toast({
        title: "Thành công!",
        description: "Key hợp lệ! Tài khoản Apple ID đã được hiển thị.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Key không hợp lệ hoặc đã hết lượt sử dụng.",
        variant: "destructive",
      });
      setResult(null);
    },
  });

  const onSubmit = (data: KeyValidationData) => {
    validateKeyMutation.mutate(data);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Đã sao chép!",
      description: `${type} đã được sao chép vào clipboard.`,
    });
  };

  return (
    <div className="min-h-screen bg-night-dark text-night-text">
      {/* Header */}
      <header className="border-b border-night-purple/20 bg-night-darker/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-night-purple to-night-accent rounded-xl flex items-center justify-center shadow-lg">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-night-text">Apple ID Free</h1>
                <p className="text-sm text-night-muted">Nhập key để nhận tài khoản Apple ID miễn phí</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AdBanner className="bg-night-darker/30 border-b border-night-purple/20" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-night-darker border-night-purple/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-night-text">
                Nhập Key
              </CardTitle>
              <CardDescription className="text-night-muted">
                Nhập key định dạng NIGHTMARKET-XXXXXXXX để nhận tài khoản Apple ID
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="keyCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-night-text">Key Code</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-key-code"
                            placeholder="NIGHTMARKET-XXXXXXXX"
                            className="bg-night-dark border-night-purple/30 text-night-text placeholder:text-night-muted focus:border-night-purple focus:ring-night-purple/20"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            maxLength={20}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    data-testid="button-validate-key"
                    type="submit"
                    className="w-full bg-gradient-to-r from-night-purple to-night-accent hover:from-night-purple/90 hover:to-night-accent/90 text-white font-medium"
                    disabled={validateKeyMutation.isPending}
                  >
                    {validateKeyMutation.isPending ? "Đang kiểm tra..." : "Xác thực Key"}
                  </Button>
                </form>
              </Form>

              {result && (
                <div className="mt-8">
                  <Alert className="bg-green-500/10 border-green-500/30 mb-6">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-300">
                      Key hợp lệ! Thông tin tài khoản Apple ID của bạn:
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="bg-night-dark rounded-lg p-4 border border-night-purple/20">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-night-muted">Apple ID</label>
                        <Button
                          data-testid="button-copy-apple-id"
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(result.appleId, "Apple ID")}
                          className="text-night-purple hover:text-night-accent"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div 
                        data-testid="text-apple-id"
                        className="font-mono text-night-text bg-night-darker px-3 py-2 rounded border border-night-purple/10"
                      >
                        {result.appleId}
                      </div>
                    </div>

                    <div className="bg-night-dark rounded-lg p-4 border border-night-purple/20">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-night-muted">Mật khẩu</label>
                        <div className="flex space-x-2">
                          <Button
                            data-testid="button-toggle-password"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-night-purple hover:text-night-accent"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            data-testid="button-copy-password"
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(result.password, "Mật khẩu")}
                            className="text-night-purple hover:text-night-accent"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div 
                        data-testid="text-password"
                        className="font-mono text-night-text bg-night-darker px-3 py-2 rounded border border-night-purple/10"
                      >
                        {showPassword ? result.password : "•".repeat(result.password.length)}
                      </div>
                    </div>

                    <div className="bg-night-dark rounded-lg p-4 border border-night-purple/20">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-night-muted">Đã sử dụng:</span>
                          <div data-testid="text-usage-count" className="font-bold text-night-accent">{result.usageCount}/{result.maxUsage}</div>
                        </div>
                        <div>
                          <span className="text-night-muted">Còn lại:</span>
                          <div data-testid="text-remaining-usage" className="font-bold text-green-400">{result.remainingUsage}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-sm text-amber-300">
                      <strong>Lưu ý:</strong> Khi sử dụng tài khoản Apple ID, vui lòng không thêm số điện thoại nào để tránh khoá tài khoản. 
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <AdBanner className="mt-8 bg-night-darker/30 border-t border-night-purple/20" />
      </div>
      <InstallPrompt />
    </div>
  );
}
