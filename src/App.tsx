import { useState, useEffect } from "react";
import "./App.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [consumption, setConsumption] = useState("");
  const [data, setData] = useState<{ date: string; consumption: number }[]>(() => {
    const stored = localStorage.getItem("consumptionData");
    return stored ? JSON.parse(stored) : [];
  });

  const addEntry = () => {
    if (consumption) {
      setData([...data, { date, consumption: parseFloat(consumption) }]);
      setConsumption("");
    }
  };

  useEffect(() => {
    localStorage.setItem("consumptionData", JSON.stringify(data));
  }, [data]);

  return (
    <div className="App p-4 space-y-6">
      <h1 className="text-2xl font-bold">전력 소비량 관리</h1>
      <Card>
        <CardHeader>
          <CardTitle>일일 전력 소비 입력</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="date">날짜</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="consumption">소비량 (kWh)</Label>
            <Input
              id="consumption"
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
            />
          </div>
          <Button onClick={addEntry}>추가</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>전력 소비 그래프</CardTitle>
        </CardHeader>
        <CardContent style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
