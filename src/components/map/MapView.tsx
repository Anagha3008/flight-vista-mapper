import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Map, 
  MapPin, 
  Navigation, 
  Layers, 
  Search, 
  Locate,
  Route
} from "lucide-react";
import mapBg from "@/assets/map-bg.jpg";

interface MapViewProps {
  className?: string;
}

export const MapView = ({ className }: MapViewProps) => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [isTokenRequired, setIsTokenRequired] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenRequired(false);
      // Here you would initialize the actual Mapbox map
      // For now, we'll show a beautiful placeholder
    }
  };

  return (
    <Card className={`h-full shadow-card ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Map className="h-5 w-5 text-primary" />
          <span>Route Visualization</span>
        </CardTitle>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
          <Button variant="ghost" size="sm">
            <Locate className="h-4 w-4 mr-2" />
            My Location
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 h-full">
        {isTokenRequired ? (
          <div className="h-full flex items-center justify-center bg-gradient-accent">
            <div className="text-center space-y-4 p-8">
              <MapPin className="h-16 w-16 text-primary mx-auto animate-bounce" />
              <h3 className="text-xl font-semibold">Map Integration</h3>
              <p className="text-muted-foreground max-w-md">
                Enter your Mapbox public token to enable interactive maps. 
                Get your token at <span className="text-primary">mapbox.com</span>
              </p>
              
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Enter your Mapbox public token"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="max-w-sm"
                />
                <Button 
                  onClick={handleTokenSubmit}
                  variant="gradient"
                  disabled={!mapboxToken.trim()}
                >
                  Enable Map
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-full">
            {/* Map Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${mapBg})` }}
            />
            
            {/* Map Overlay */}
            <div className="absolute inset-0 bg-background/10 backdrop-blur-sm" />
            
            {/* Route Information */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="flex space-x-2">
                <Card className="flex-1 glassmorphism">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">855 Grove Ave, Edison NJ</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="flex-1 glassmorphism">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">JFK Airport</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Route Controls */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <Card className="glassmorphism">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">
                        <Route className="h-3 w-3 mr-1" />
                        Best Route
                      </Badge>
                      <span className="text-sm">45 min • $15.50</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                      <Button variant="gradient" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Interactive Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <Navigation className="h-16 w-16 text-primary" />
                </div>
                <p className="text-lg font-semibold">Interactive Map</p>
                <p className="text-sm text-muted-foreground">
                  Route visualization and navigation
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};