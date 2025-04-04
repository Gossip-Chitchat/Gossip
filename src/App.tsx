import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import AppLayout from "./layouts/AppLayout";
import AppHome from "./pages/AppHome";
import ChatRoom from "./pages/ChatRoom";
import AppSettings from "./pages/AppSettings";
import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";

const queryClient = new QueryClient();

const App = function() {
  useEffect(() => {
    // 監聽後端送來的 "receive-message" 事件
    const unlisten = listen<string>("receive-message", (event) => {
      console.log("前端收到事件:", event.payload);
      // 這邊就可以更新 UI 或做其他邏輯
      alert("前端收到: " + event.payload);
    });

    // 解除監聽
    return () => {
      unlisten.then((f) => f());
    };
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 獨立頁面 */}
            <Route path="/" element={<AppHome />} />
            
            {/* 應用內頁面 */}
            <Route path="/app" element={<AppLayout />}>
              <Route path="chat" element={<ChatRoom />} />
              <Route path="settings" element={<AppSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
