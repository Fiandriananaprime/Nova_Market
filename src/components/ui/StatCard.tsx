import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatMillionAr } from '@/data/mock';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

type BarStatProp={
    title:string,
  data:any[] | undefined
}

const zoomSteps = [1, 1.25, 1.6, 2];

function ChartZoomControls({ zoom, onZoomChange }: { zoom: number; onZoomChange: (zoom: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Zoom out"
        title="Zoom out"
        disabled={zoom === 1}
        onClick={() => onZoomChange(zoomSteps[Math.max(0, zoomSteps.indexOf(zoom) - 1)])}
        className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        aria-label="Zoom in"
        title="Zoom in"
        disabled={zoom === zoomSteps[zoomSteps.length - 1]}
        onClick={() => onZoomChange(zoomSteps[Math.min(zoomSteps.length - 1, zoomSteps.indexOf(zoom) + 1)])}
        className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        aria-label="Reset chart zoom"
        title="Reset zoom"
        disabled={zoom === 1}
        onClick={() => onZoomChange(1)}
        className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function getZoomedData(data: any[] | undefined, zoom: number) {
  if (!data?.length || zoom === 1) return data ?? [];
  const visibleCount = Math.max(2, Math.ceil(data.length / zoom));
  const start = Math.max(0, Math.floor((data.length - visibleCount) / 2));
  return data.slice(start, start + visibleCount);
}

const BarStat = ({title,data}: BarStatProp) => {
  const [zoom, setZoom] = useState(1);
  const chartData = getZoomedData(data, zoom);
  const maxRevenue = Math.max(...chartData.map((point) => Number(point.revenue ?? 0)), 0);
    return (
        <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold font-display text-foreground">{title}</h2>
      <ChartZoomControls zoom={zoom} onZoomChange={setZoom} />
      </div>
          <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, maxRevenue / zoom || 1]} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(v) => [formatMillionAr(Number(v ?? 0)), 'Revenue']} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="#0077B6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
    )
}

const LineStat = ({title,data}: BarStatProp) => {
    const [zoom, setZoom] = useState(1);
    const chartData = getZoomedData(data, zoom);
    const maxUsers = Math.max(...chartData.flatMap((point) => [Number(point.buyers ?? 0), Number(point.sellers ?? 0)]), 0);
    return (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold font-display text-foreground">{title}</h2>
            <ChartZoomControls zoom={zoom} onZoomChange={setZoom} />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, maxUsers / zoom || 1]} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Line dataKey="buyers" stroke="#0077B6" strokeWidth={2.5} dot={false} name="Buyers" />
              <Line dataKey="sellers" stroke="#5ABCB9" strokeWidth={2.5} dot={false} name="Sellers" />
            </LineChart>
          </ResponsiveContainer>
        </div>
    )
}

export { BarStat, LineStat }