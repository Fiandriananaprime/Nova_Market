import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatMillionAr } from '@/data/mock';

type BarStatProp={
    title:string,
    data:any
}
const BarStat = ({title,data}: BarStatProp) => {
    return (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-semibold font-display text-[var(--foreground)] mb-4">{title}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(v) => [formatMillionAr(Number(v ?? 0)), 'Revenue']} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="#0077B6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
    )
}

const LineStat = ({title,data}: BarStatProp) => {
    return (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-semibold font-display text-[var(--foreground)] mb-4">{title}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Line dataKey="buyers" stroke="#0077B6" strokeWidth={2.5} dot={false} name="Buyers" />
              <Line dataKey="sellers" stroke="#5ABCB9" strokeWidth={2.5} dot={false} name="Sellers" />
            </LineChart>
          </ResponsiveContainer>
        </div>
    )
}

export { BarStat, LineStat }