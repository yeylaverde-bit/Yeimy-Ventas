
import { MonthlyData, SaleCategory, SalesRep } from './types';

export const YEARS = [2024, 2025, 2026];

export const MONTHS = [
  { id: 1, label: 'Ene' }, { id: 2, label: 'Feb' }, { id: 3, label: 'Mar' },
  { id: 4, label: 'Abr' }, { id: 5, label: 'May' }, { id: 6, label: 'Jun' },
  { id: 7, label: 'Jul' }, { id: 8, label: 'Ago' }, { id: 9, label: 'Sep' },
  { id: 10, label: 'Oct' }, { id: 11, label: 'Nov' }, { id: 12, label: 'Dic' }
];

// Mapeo de ventas reales extraídas del CSV (Unidades y Facturación Estimada)
const DATA_MAP: Record<number, Record<number, { units: number; revenue: number }>> = {
  2024: {
    1: { units: 71, revenue: 546000000 }, 2: { units: 66, revenue: 512000000 }, 3: { units: 53, revenue: 425000000 },
    4: { units: 83, revenue: 642000000 }, 5: { units: 83, revenue: 642000000 }, 6: { units: 33, revenue: 255000000 },
    7: { units: 56, revenue: 432000000 }, 8: { units: 56, revenue: 432000000 }, 9: { units: 124, revenue: 985000000 },
    10: { units: 63, revenue: 515000000 }, 11: { units: 39, revenue: 320000000 }, 12: { units: 54, revenue: 440000000 }
  },
  2025: {
    1: { units: 63, revenue: 510000000 }, 2: { units: 55, revenue: 448000000 }, 3: { units: 49, revenue: 410000000 },
    4: { units: 48, revenue: 395000000 }, 5: { units: 83, revenue: 642000000 }, 6: { units: 66, revenue: 530000000 },
    7: { units: 76, revenue: 610000000 }, 8: { units: 64, revenue: 520000000 }, 9: { units: 124, revenue: 998000000 },
    10: { units: 118, revenue: 915000000 }, 11: { units: 87, revenue: 678000000 }, 12: { units: 114, revenue: 892000000 }
  },
  2026: {
    1: { units: 71, revenue: 580000000 },
    2: { units: 41, revenue: 345000000 }, // FEBRERO 2026
    3: { units: 0, revenue: 0 }, 4: { units: 0, revenue: 0 }, 5: { units: 0, revenue: 0 },
    6: { units: 0, revenue: 0 }, 7: { units: 0, revenue: 0 }, 8: { units: 0, revenue: 0 },
    9: { units: 0, revenue: 0 }, 10: { units: 0, revenue: 0 }, 11: { units: 0, revenue: 0 }, 12: { units: 0, revenue: 0 }
  }
};

export const getStatsByMonth = (monthId: number, year: number) => {
  const monthData = DATA_MAP[year]?.[monthId] || { units: 0, revenue: 0 };
  
  const models: SaleCategory[] = [
    { id: '1', name: 'TVS Raider 125', amount: monthData.revenue * 0.45, units: Math.round(monthData.units * 0.42), percentage: 85, icon: 'bike' as const },
    { id: '2', name: 'Apache 160 4V', amount: monthData.revenue * 0.30, units: Math.round(monthData.units * 0.28), percentage: 62, icon: 'engine' as const },
    { id: '3', name: 'MRX Arizona', amount: monthData.revenue * 0.15, units: Math.round(monthData.units * 0.15), percentage: 45, icon: 'helmet' as const },
  ].filter(m => m.units > 0);

  // Lista de asesores incluyendo a YEIMY y redistribuyendo porcentajes
  const reps: SalesRep[] = [
    { id: '1', name: 'ALEJANDRA', revenue: monthData.revenue * 0.22, salesCount: Math.round(monthData.units * 0.22), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alejandra' },
    { id: '2', name: 'MIGUEL', revenue: monthData.revenue * 0.20, salesCount: Math.round(monthData.units * 0.20), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel' },
    { id: '6', name: 'YEIMY', revenue: monthData.revenue * 0.18, salesCount: Math.round(monthData.units * 0.18), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yeimy' },
    { id: '3', name: 'NATHALIA', revenue: monthData.revenue * 0.16, salesCount: Math.round(monthData.units * 0.16), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nathalia' },
    { id: '4', name: 'ASTRID', revenue: monthData.revenue * 0.14, salesCount: Math.round(monthData.units * 0.14), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Astrid' },
    { id: '5', name: 'ESTEBAN', revenue: monthData.revenue * 0.10, salesCount: Math.round(monthData.units * 0.10), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esteban' },
  ].sort((a, b) => b.revenue - a.revenue).filter(r => r.salesCount > 0);

  if (reps.length > 0) reps[0].highlighted = true;

  return {
    monthName: MONTHS.find(m => m.id === monthId)?.label || '',
    revenue: monthData.revenue,
    units: monthData.units,
    avgTicket: monthData.units > 0 ? monthData.revenue / monthData.units : 0,
    models,
    reps
  };
};

export const getYearlyTrend = (year: number): MonthlyData[] => {
  return MONTHS.map(m => ({
    month: m.label,
    monthNum: m.id,
    units: DATA_MAP[year]?.[m.id]?.units || 0,
    revenue: DATA_MAP[year]?.[m.id]?.revenue || 0
  }));
};
