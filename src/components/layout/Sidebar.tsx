import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  History, 
  Settings, 
  User, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: { email: string; name: string } | null;
  className?: string;
}

export const Sidebar = ({ user, className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages] = useState([
    { id: 1, timestamp: "2025-07-22 15:11", user: "ruhaan_s", message: "@router_support is this the most optimal route?" },
    { id: 2, timestamp: "2025-07-22 15:00", user: "router_support", message: "This is router_support real-time agent: @ me to ask me a question." },
    { id: 3, timestamp: "2025-07-22 14:54", user: "tanisha76", message: "hi" },
    { id: 4, timestamp: "2025-07-22 14:54", user: "tanisha76", message: "hi" },
  ]);

  return (
    <div className={cn(
      "border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
      isCollapsed ? "w-16" : "w-80",
      className
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span className="font-medium">Account</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Info */}
        {!isCollapsed && user && (
          <Card className="m-4 mb-0 glassmorphism">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  Logged in as
                </Badge>
                <span className="text-sm font-medium text-primary">{user.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full justify-start h-8"
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Chat Section */}
        <div className="flex-1 overflow-hidden">
          {!isCollapsed && (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span className="font-medium">Chat</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Type a public message or tag a user with @username for a private message.
                </p>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 rounded-md border bg-background/50 text-sm"
                  />
                  <Button variant="gradient" size="sm" className="w-full">
                    Send
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Recent Messages */}
        {!isCollapsed && (
          <div className="border-t">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-primary" />
                <span className="font-medium">Recent Messages</span>
              </div>
            </div>
            
            <ScrollArea className="h-48">
              <div className="p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{msg.timestamp}</span>
                      <Badge variant="outline" className="text-xs">
                        {msg.user}
                      </Badge>
                    </div>
                    <p className="mt-1 text-foreground">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Settings */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <Settings className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Settings</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};