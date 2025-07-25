import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Map, 
  MapPin, 
  Navigation, 
  Layers, 
  Search, 
  Locate,
  Route,
  Satellite,
  Train,
  Car,
  Plane,
  Calendar as CalendarIcon,
  Eye,
  DollarSign,
  Clock,
  Bus,
  Bike,
  User,
  Navigation2,
  Zap
} from "lucide-react";
import { format } from "date-fns";
import mapBg from "@/assets/map-bg.jpg";

interface MapViewProps {
  className?: string;
}

interface TransportOption {
  id: string;
  name: string;
  icon: any;
  price: string;
  duration: string;
  color: string;
  provider?: string;
}

export const MapView = ({ className }: MapViewProps) => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [isTokenRequired, setIsTokenRequired] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [mapView, setMapView] = useState("2d");
  const [selectedTransport, setSelectedTransport] = useState("driving");
  const [sortBy, setSortBy] = useState("price");
  const mapContainer = useRef<HTMLDivElement>(null);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenRequired(false);
    }
  };

  const transportOptions: TransportOption[] = [
    { id: "driving", name: "Driving", icon: Car, price: "$15.50", duration: "45 min", color: "blue", provider: "Google Maps" },
    { id: "uber", name: "Uber", icon: Car, price: "$28.00", duration: "35 min", color: "black", provider: "Uber" },
    { id: "metro", name: "Metro", icon: Train, price: "$4.25", duration: "1h 15m", color: "green", provider: "CTA" },
    { id: "bus", name: "Bus", icon: Bus, price: "$2.50", duration: "1h 30m", color: "orange", provider: "CTA" },
    { id: "flight", name: "Flight", icon: Plane, price: "$89.00", duration: "2h 45m", color: "purple", provider: "Delta" },
    { id: "bike", name: "Bike Share", icon: Bike, price: "$5.00", duration: "2h 10m", color: "yellow", provider: "Divvy" },
    { id: "walk", name: "Walking", icon: User, price: "Free", duration: "8h 30m", color: "gray", provider: "Maps" },
    { id: "metra", name: "Metra", icon: Train, price: "$7.75", duration: "1h 25m", color: "red", provider: "Metra" }
  ];

  const mapViewOptions = [
    { id: "2d", name: "2D", icon: Map },
    { id: "3d", name: "3D", icon: Navigation2 },
    { id: "satellite", name: "Satellite", icon: Satellite },
    { id: "transit", name: "Transit", icon: Train },
    { id: "explore", name: "Explore", icon: Eye },
    { id: "driving", name: "Driving", icon: Navigation }
  ];

  const sortedTransportOptions = [...transportOptions].sort((a, b) => {
    if (sortBy === "price") {
      const priceA = parseFloat(a.price.replace(/[$,]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[$,]/g, '')) || 0;
      return priceA - priceB;
    } else {
      const durationA = parseInt(a.duration.replace(/[^\d]/g, ''));
      const durationB = parseInt(b.duration.replace(/[^\d]/g, ''));
      return durationA - durationB;
    }
  });

  return (
    <Card className={`h-full shadow-card ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Map className="h-5 w-5 text-primary" />
          <span>Multi-Modal Route Planner</span>
        </CardTitle>
        
        <div className="flex items-center space-x-2">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {selectedDate ? format(selectedDate, "MMM dd") : "Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Price
                </div>
              </SelectItem>
              <SelectItem value="time">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Time
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

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
              <h3 className="text-xl font-semibold">Enhanced Map Integration</h3>
              <p className="text-muted-foreground max-w-md">
                Enter your Google Maps API key or Mapbox token to enable advanced mapping features. 
                Visit <span className="text-primary">mapsplatform.google.com</span> or <span className="text-primary">mapbox.com</span>
              </p>
              
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Enter your Maps API key"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="max-w-sm"
                />
                <Button 
                  onClick={handleTokenSubmit}
                  variant="gradient"
                  disabled={!mapboxToken.trim()}
                >
                  Enable Enhanced Maps
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Map View Controls */}
            <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {mapViewOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={mapView === option.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setMapView(option.id)}
                      className="h-8"
                    >
                      <option.icon className="h-3 w-3 mr-1" />
                      {option.name}
                    </Button>
                  ))}
                </div>
                
                <Badge variant="secondary" className="animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  Live Traffic
                </Badge>
              </div>

              {/* Route Information */}
              <div className="grid grid-cols-2 gap-2">
                <Card className="glassmorphism">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">855 Grove Ave, Edison NJ</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glassmorphism">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">JFK Airport</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
              {/* Transportation Options Sidebar */}
              <div className="w-80 border-r bg-background/50 backdrop-blur-sm p-4 overflow-y-auto">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Route className="h-4 w-4 mr-2" />
                  Transportation Options
                </h3>
                
                <div className="space-y-3">
                  {sortedTransportOptions.map((option) => (
                    <Card 
                      key={option.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedTransport === option.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedTransport(option.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-${option.color}-500/20`}>
                              <option.icon className={`h-4 w-4 text-${option.color}-500`} />
                            </div>
                            <div>
                              <p className="font-medium">{option.name}</p>
                              <p className="text-sm text-muted-foreground">{option.provider}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{option.price}</p>
                            <p className="text-sm text-muted-foreground">{option.duration}</p>
                          </div>
                        </div>
                        
                        {selectedTransport === option.id && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex space-x-2">
                              <Button variant="gradient" size="sm" className="flex-1">
                                <Navigation className="h-3 w-3 mr-1" />
                                Start Route
                              </Button>
                              <Button variant="outline" size="sm">
                                <Search className="h-3 w-3 mr-1" />
                                Details
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Filters */}
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-sm">Quick Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                      Under $10
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                      Under 1 hour
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                      No transfers
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                      Eco-friendly
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Map Display */}
              <div className="flex-1 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${mapBg})` }}
                />
                
                <div className="absolute inset-0 bg-background/10 backdrop-blur-sm" />
                
                {/* Map View Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="glassmorphism">
                    {mapViewOptions.find(v => v.id === mapView)?.name} View
                  </Badge>
                </div>

                {/* Interactive Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                      {mapViewOptions.find(v => v.id === mapView)?.icon && (
                        <div className="h-16 w-16 text-primary">
                          {React.createElement(mapViewOptions.find(v => v.id === mapView)!.icon, { size: 64 })}
                        </div>
                      )}
                    </div>
                    <p className="text-lg font-semibold">
                      {mapViewOptions.find(v => v.id === mapView)?.name} Map View
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Interactive multi-modal route visualization
                    </p>
                  </div>
                </div>

                {/* Route Progress Indicator */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <Card className="glassmorphism">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Badge variant="secondary">
                            <Route className="h-3 w-3 mr-1" />
                            Optimal Route
                          </Badge>
                          <span className="text-sm">
                            {sortedTransportOptions.find(t => t.id === selectedTransport)?.duration} • 
                            {sortedTransportOptions.find(t => t.id === selectedTransport)?.price}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Search className="h-4 w-4 mr-2" />
                            Compare
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
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};