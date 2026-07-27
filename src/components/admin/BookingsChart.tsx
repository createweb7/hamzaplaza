"use client";

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type DailyPoint = { date: string; bookings: number; revenue: number };

export function BookingsChart({ data }: { data: DailyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="date" stroke="var(--text-faint)" fontSize={12} />
        <YAxis yAxisId="revenue" stroke="var(--text-faint)" fontSize={12} width={60} />
        <YAxis yAxisId="bookings" orientation="right" stroke="var(--text-faint)" fontSize={12} allowDecimals={false} width={40} />
        <Tooltip
          contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          labelStyle={{ color: "var(--text)" }}
        />
        <Bar yAxisId="revenue" dataKey="revenue" fill="#a9791f" name="Revenue (₹)" radius={[4, 4, 0, 0]} />
        <Line yAxisId="bookings" type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} name="Bookings" dot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
