
import React, { useState } from 'react';
import { Tab } from './types';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import RepsView from './components/RepsView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(2); // Febrero por defecto para ver resultados

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Dashboard:
        return (
          <Dashboard 
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            selectedMonth={selectedMonth} 
            onMonthChange={setSelectedMonth} 
          />
        );
      case Tab.Reps:
        return <RepsView selectedYear={selectedYear} selectedMonth={selectedMonth} />;
      case Tab.Reports:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Reportes de Cierre</h3>
            <p className="text-sm">Consolidado anual de {selectedYear} en preparación.</p>
          </div>
        );
      case Tab.Settings:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
            <h3 className="text-white font-bold text-lg mb-2">Configuración</h3>
            <p className="text-sm">Ajustes de metas para el periodo {selectedYear}.</p>
          </div>
        );
      default:
        return <Dashboard selectedYear={selectedYear} onYearChange={setSelectedYear} selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />;
    }
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen flex flex-col relative overflow-hidden bg-background-dark shadow-2xl">
      {/* Status Bar Mock */}
      <div className="h-12 px-8 flex justify-between items-end pb-2 shrink-0">
        <span className="text-sm font-semibold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" fillOpacity=".3" />
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M3.53 10.95l8.46 10.54.01.01.01-.01 8.46-10.54C20.04 10.62 16.81 8 12 8c-4.81 0-8.04 2.62-8.47 2.95z" />
          </svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M4.41 22H21c.55 0 1-.45 1-1V4.41c0-.89-1.08-1.34-1.71-.71L3.71 20.29c-.63.63-.18 1.71.7 1.71z" />
          </svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 5v16c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h2V2h4v2h2c.55 0 1 .45 1 1z" />
          </svg>
        </div>
      </div>

      {/* Dynamic Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {renderContent()}
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-700 rounded-full"></div>
    </div>
  );
};

export default App;
