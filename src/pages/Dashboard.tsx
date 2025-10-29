// src/pages/Dashboard.tsx
import { Card } from "@/components/ui/card";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }} className="bg-background">
      <Card
        onContextMenu={(e) => {
          console.log(e);
        }}
      >
        <h1>Hello World</h1>
        <p>This is your dummy dashboard. Everything is working!</p>
      </Card>
    </div>
  );
};

export default Dashboard;
