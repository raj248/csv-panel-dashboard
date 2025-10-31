import React from "react";
import { Card } from "@/components/ui/card";

const dummyData = [
  {
    book: "CHAMPAK STORY BOX BHAAG-1",
    opening: 10,
    printed: 50,
    sold: 30,
    returned: 5,
    mrp: 50,
    amount: 1500,
    complimentary: 2,
    closing: 25,
  },
  {
    book: "CHAMPAK STORY BOX BHAAG-2",
    opening: 5,
    printed: 40,
    sold: 20,
    returned: 3,
    mrp: 60,
    amount: 1200,
    complimentary: 1,
    closing: 21,
  },
  {
    book: "CHAMPAK STORY BOX BHAAG-3",
    opening: 8,
    printed: 30,
    sold: 25,
    returned: 2,
    mrp: 55,
    amount: 1375,
    complimentary: 0,
    closing: 11,
  },
];

export default function UserOverview() {
  const totals = dummyData.reduce(
    (acc, curr) => {
      acc.opening += curr.opening;
      acc.printed += curr.printed;
      acc.sold += curr.sold;
      acc.returned += curr.returned;
      acc.amount += curr.amount;
      acc.complimentary += curr.complimentary;
      acc.closing += curr.closing;
      return acc;
    },
    {
      opening: 0,
      printed: 0,
      sold: 0,
      returned: 0,
      amount: 0,
      complimentary: 0,
      closing: 0,
    }
  );

  return (
    <div className="p-6 bg-background min-h-screen">
      <Card className="overflow-x-auto p-4">
        <h2 className="text-xl font-semibold mb-4">User Overview</h2>

        <div className="mb-6">
          <p>UNBOUND SCRIPT</p>
          <p>2/41, ANSARI ROAD, DARYAGANJ, DELHI - 110002</p>
          <p>AUTHOR: [Dummy Author]</p>
          <p>TIME PERIOD: [Dummy Period]</p>
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left px-2 py-1">Book Name</th>
              <th className="px-2 py-1">Opening Stock</th>
              <th className="px-2 py-1">Printed Copies</th>
              <th className="px-2 py-1">Sold Copies</th>
              <th className="px-2 py-1">Return Copies</th>
              <th className="px-2 py-1">MRP (INR)</th>
              <th className="px-2 py-1">Amount (INR)</th>
              <th className="px-2 py-1">Complimentary/Damage</th>
              <th className="px-2 py-1">Closing Stock</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-muted/10">
                <td className="px-2 py-1">{row.book}</td>
                <td className="px-2 py-1 text-center">{row.opening}</td>
                <td className="px-2 py-1 text-center">{row.printed}</td>
                <td className="px-2 py-1 text-center">{row.sold}</td>
                <td className="px-2 py-1 text-center">{row.returned}</td>
                <td className="px-2 py-1 text-center">{row.mrp}</td>
                <td className="px-2 py-1 text-center">{row.amount}</td>
                <td className="px-2 py-1 text-center">{row.complimentary}</td>
                <td className="px-2 py-1 text-center">{row.closing}</td>
              </tr>
            ))}
            <tr className="font-semibold bg-accent/10">
              <td className="px-2 py-1">TOTAL</td>
              <td className="px-2 py-1 text-center">{totals.opening}</td>
              <td className="px-2 py-1 text-center">{totals.printed}</td>
              <td className="px-2 py-1 text-center">{totals.sold}</td>
              <td className="px-2 py-1 text-center">{totals.returned}</td>
              <td className="px-2 py-1 text-center">-</td>
              <td className="px-2 py-1 text-center">{totals.amount}</td>
              <td className="px-2 py-1 text-center">{totals.complimentary}</td>
              <td className="px-2 py-1 text-center">{totals.closing}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6">
          <p>Stamp & Sign: ____________________</p>
        </div>
      </Card>
    </div>
  );
}
