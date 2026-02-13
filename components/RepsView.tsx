
import React from 'react';
import { getStatsByMonth } from '../data';
import { TrendingUp, DollarSign, Bike } from 'lucide-react';

interface RepsViewProps {
  selectedYear: number;
  selectedMonth: number;
}

const RepsView: React.FC<RepsViewProps> = ({ selectedYear, selectedMonth }) => {
  const stats = getStatsByMonth(selectedMonth, selectedYear);

  return (
    <div className="px-6 py-6 space-y-6 animate-in slide-in-from-right-4 duration-300">
      <header>
        <h2 className="text-2xl font-extrabold text-white">Ranking de Asesores</h2>
        <p className="text-slate-400 text-sm">{stats.monthName} {selectedYear}</p>
      </header>

      {stats.reps.length === 0 ? (
        <div className="bg-card-dark p-12 rounded-3xl border border-dashed border-slate-800 text-center text-slate-600">
          Sin registros de venta
        </div>
      ) : (
        <div className="space-y-4">
          {stats.reps.map((rep, index) => (
            <div key={rep.id} className="bg-card-dark rounded-2xl p-4 border border-slate-800 flex items-center gap-4 transition-all active:scale-[0.98]">
              <div className="relative">
                <img src={rep.avatar} className="w-14 h-14 rounded-full bg-slate-700 p-0.5 border border-slate-600" alt={rep.name} />
                <div className="absolute -top-1 -left-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-background-dark shadow-lg">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-white uppercase text-sm tracking-tight">{rep.name}</h3>
                <div className="flex gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Bike size={12} className="text-primary" />
                    <span className="text-xs text-slate-300 font-semibold">{rep.salesCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={12} className="text-emerald-500" />
                    <span className="text-xs text-slate-300 font-semibold">${(rep.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="bg-primary/10 text-primary text-[9px] font-extrabold px-2 py-1 rounded-md uppercase">
                  Top Seller
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Eficiencia: 98%</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepsView;
