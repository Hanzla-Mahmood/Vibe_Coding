
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import WelcomePopup from "./components/WelcomePopup";
import Index from "./pages/Index";
import Insert from "./pages/Insert";
import Delete from "./pages/Delete";
import Update from "./pages/Update";
import Show from "./pages/Show";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ProtectedRoute>
          <WelcomePopup />
          <BrowserRouter>
            <div className="min-h-screen w-full">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/insert" element={<Insert />} />
                <Route path="/delete" element={<Delete />} />
                <Route path="/update" element={<Update />} />
                <Route path="/show" element={<Show />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ProtectedRoute>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
