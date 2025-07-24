import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  Plane, 
  Train, 
  MapPin, 
  Navigation, 
  Clock, 
  DollarSign,
  Fuel,
  X,
  Plus,
  Minus
} from "lucide-react";

interface RouteOptimizerProps {
  className?: string;
}

export const RouteOptimizer = ({ className }: RouteOptimizerProps) => {
  const [transportModes, setTransportModes] = useState([
    { id: 1, type: "drive", label: "Drive (no tolls)", active: true },
    { id: 2, type: "drive-tolls", label: "Drive (with tolls)", active: true },
  ]);
  const [startPoint, setStartPoint] = useState("855 grove ave edison nj");
  const [destination, setDestination] = useState("jfk airport");
  const [vehicleMpg, setVehicleMpg] = useState("");
  const [breaks, setBreaks] = useState([0]);

  const addTransportMode = (type: string, label: string) => {
    const newMode = {
      id: Date.now(),
      type,
      label,
      active: true,
    };
    setTransportModes([...transportModes, newMode]);
  };

  const removeTransportMode = (id: number) => {
    setTransportModes(transportModes.filter(mode => mode.id !== id));
  };

  const transportOptions = [
    { type: "walk", label: "Walk", icon: MapPin },
    { type: "transit", label: "Public Transit", icon: Train },
    { type: "flight", label: "Flight", icon: Plane },
    { type: "bike", label: "Bike", icon: Car },
  ];

  return (
    <div className={className}>
      <Card className="shadow-card glassmorphism">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-primary" />
            <span>Optimize your routes for cost, gas, and time</span>
          </CardTitle>
          <CardDescription>
            Find the best routes with multiple transport options
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Transport Modes */}
          <div>
            <Label className="text-sm font-medium">Choose transport modes</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {transportModes.map((mode) => (
                <Badge
                  key={mode.id}
                  variant="secondary"
                  className="flex items-center space-x-2 px-3 py-1"
                >
                  <span>{mode.label}</span>
                  <button
                    onClick={() => removeTransportMode(mode.id)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              <div className="flex space-x-2">
                {transportOptions.map((option) => (
                  <Button
                    key={option.type}
                    variant="outline"
                    size="sm"
                    onClick={() => addTransportMode(option.type, option.label)}
                    className="h-8"
                  >
                    <option.icon className="h-4 w-4 mr-1" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicle Settings */}
          <div>
            <Label htmlFor="mpg" className="text-sm font-medium">
              Optional: Enter your vehicle's mpg:
            </Label>
            <Input
              id="mpg"
              type="number"
              placeholder="e.g., 25"
              value={vehicleMpg}
              onChange={(e) => setVehicleMpg(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Starting Point */}
          <div>
            <Label htmlFor="start" className="text-sm font-medium">
              Starting Point
            </Label>
            <Input
              id="start"
              type="text"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Destination */}
          <div>
            <Label htmlFor="destination" className="text-sm font-medium">
              Destination
            </Label>
            <Input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Breaks */}
          <div>
            <Label className="text-sm font-medium">
              How many breaks do you want to take during the trip?
            </Label>
            <div className="mt-2 flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBreaks([Math.max(0, breaks[0] - 1)])}
                disabled={breaks[0] === 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium min-w-8 text-center">{breaks[0]}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBreaks([breaks[0] + 1])}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="gradient" className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Find Best Route
            </Button>
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Current Location
            </Button>
          </div>

          {/* Route Results Preview */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cost">Cost</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Time</p>
                      <p className="text-lg font-bold">45 mins</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="text-lg font-bold">$15.50</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fuel Cost</p>
                      <p className="text-lg font-bold">$12.30</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="cost">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Cost Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Fuel</span>
                    <span>$12.30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tolls</span>
                    <span>$3.20</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Total</span>
                    <span>$15.50</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="time">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Time Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Driving</span>
                    <span>42 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Breaks</span>
                    <span>0 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Traffic delays</span>
                    <span>3 mins</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Total</span>
                    <span>45 mins</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};