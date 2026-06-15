import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem',
        borderRadius: '12px',
        color: 'white',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
      }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{label}</p>
        <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', display: 'inline-block', boxShadow: '0 0 8px #818cf8' }}></span>
          {payload[0].value} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#cbd5e1' }}>Clicks</span>
        </p>
      </div>
    );
  }
  return null;
};

const ClickTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No click data available</div>;
  }

  // Format data for Recharts if needed
  const formattedData = data.map(item => {
    const d = new Date(item.date);
    return {
      name: `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`,
      clicks: parseInt(item.clicks)
    };
  });

  return (
    <div style={{ height: '320px', width: '100%', marginTop: '1rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formattedData}
          margin={{ top: 20, right: 20, left: -20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dx={-10} />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: 'rgba(99, 102, 241, 0.2)', strokeWidth: 2, strokeDasharray: '4 4' }} 
          />
          <Area 
            type="monotone" 
            dataKey="clicks" 
            stroke="#6366f1" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorClicks)"
            activeDot={{ r: 6, fill: '#ffffff', stroke: '#6366f1', strokeWidth: 3, style: { filter: 'drop-shadow(0 0 6px rgba(99, 102, 241, 0.8))' } }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClickTrendChart;
