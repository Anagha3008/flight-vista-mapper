import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { RouteOptimizer } from "@/components/routing/RouteOptimizer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { MapView } from "@/components/map/MapView";

const Index = () => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = (userData: { email: string; name: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  if (!user) {
    return (
      <LoginForm 
        onLogin={handleLogin} 
        onToggleMode={toggleAuthMode}
        isSignUp={isSignUp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar user={user} />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Route Optimizer */}
            <div className="lg:col-span-2">
              <div className="h-full grid grid-rows-2 gap-6">
                <RouteOptimizer />
                <MapView />
              </div>
            </div>
            
            {/* AI Assistant */}
            <div className="lg:col-span-1">
              <AIAssistant />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
