
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { ChevronRight, Bike, Gauge, UserCheck, TrendingUp, Award, Layers } from 'lucide-react';
import { MONTHS, getStatsByMonth, YEARS, getYearlyTrend } from '../data';

interface DashboardProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  selectedMonth: number;
  onMonthChange: (id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedYear, onYearChange, selectedMonth, onMonthChange }) => {
  const stats = getStatsByMonth(selectedMonth, selectedYear);
  const trendData = getYearlyTrend(selectedYear);

  return (
    <div className="px-6 pb-24 space-y-6 animate-in fade-in duration-500">
      {/* Year Selector */}
      <div className="flex bg-card-dark p-1 rounded-xl border border-slate-800 mt-4">
        {YEARS.map(y => (
          <button
            key={y}
            onClick={() => onYearChange(y)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              selectedYear === y ? 'bg-primary text-white shadow-md' : 'text-slate-500'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Month Selector Bar */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1 -mx-2 px-2 sticky top-0 bg-background-dark/80 backdrop-blur-md z-30">
        {MONTHS.map((m) => (
          <button
            key={m.id}
            onClick={() => onMonthChange(m.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
              selectedMonth === m.id 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-slate-800/50 text-slate-500'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Ventas {stats.monthName} {selectedYear}</h1>
        <p className="text-slate-400 text-sm">Resumen operativo multi-periodo</p>
      </header>

      {/* Hero Stat Card */}
      <section className="bg-primary p-6 rounded-2xl shadow-lg shadow-primary/20 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-white/80 text-sm font-medium">Facturación Bruta</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-white text-3xl font-extrabold">
              ${stats.revenue.toLocaleString('es-CO')}
            </span>
            <div className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp size={10} />
              <span>{selectedYear === 2026 && selectedMonth === 2 ? '-15%' : '+12%'}</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Motos Vendidas</p>
              <p className="text-white text-lg font-bold">{stats.units}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Ticket Promedio</p>
              <p className="text-white text-lg font-bold">${(stats.avgTicket / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <Layers className="absolute right-[-10px] top-[-10px] text-white/5 w-32 h-32 rotate-12" />
      </section>

      {/* Chart Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-200">Tendencia {selectedYear}</h2>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Unidades por mes</span>
        </div>
        <div className="bg-card-dark p-5 rounded-2xl border border-slate-800">
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 9, fontWeight: 'bold' }}
                />
                <Tooltip 
                  cursor={{ fill: '#13a4ec08' }} 
                  contentStyle={{ backgroundColor: '#16252d', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                />
                <Bar dataKey="units" radius={[4, 4, 0, 0]}>
                  {trendData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.monthNum === selectedMonth ? '#13a4ec' : '#1e293b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Top Models */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Ventas por Modelo</h2>
        </div>
        {stats.units === 0 ? (
           <div className="bg-card-dark p-8 rounded-2xl border border-dashed border-slate-800 text-center text-slate-600">
              No hay datos para este periodo
           </div>
        ) : (
          <div className="grid gap-3">
            {stats.models.map((model) => (
              <div key={model.id} className="bg-card-dark p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {model.icon === 'bike' && <Bike size={20} />}
                  {model.icon === 'engine' && <Gauge size={20} />}
                  {model.icon === 'helmet' && <Award size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-white">{model.name}</span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {model.units} unds
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${model.percentage}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
