
export enum Tab {
  Dashboard = 'Dashboard',
  Reps = 'Reps',
  Reports = 'Reports',
  Settings = 'Settings'
}

export interface SaleCategory {
  id: string;
  name: string;
  amount: number;
  units: number;
  percentage: number;
  icon: 'bike' | 'engine' | 'helmet';
}

export interface SalesRep {
  id: string;
  name: string;
  avatar: string;
  salesCount: number;
  revenue: number;
  highlighted?: boolean;
}

export interface MonthlyData {
  month: string;
  monthNum: number;
  units: number;
  revenue: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  avgValue: number;
  growth: number;
}
