
import React from 'react';
import { Tab } from '../types';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-slate-900/80 ios-blur border-t border-slate-800 px-8 flex justify-between items-center pb-4 z-50">
      <NavItem 
        icon={<LayoutDashboard size={24} />} 
        label="Dashboard" 
        active={activeTab === Tab.Dashboard} 
        onClick={() => onTabChange(Tab.Dashboard)}
      />
      <NavItem 
        icon={<Users size={24} />} 
        label="Reps" 
        active={activeTab === Tab.Reps} 
        onClick={() => onTabChange(Tab.Reps)}
      />
      <NavItem 
        icon={<FileText size={24} />} 
        label="Reports" 
        active={activeTab === Tab.Reports} 
        onClick={() => onTabChange(Tab.Reports)}
      />
      <NavItem 
        icon={<Settings size={24} />} 
        label="Settings" 
        active={activeTab === Tab.Settings} 
        onClick={() => onTabChange(Tab.Settings)}
      />
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${active ? 'text-primary' : 'text-slate-500'}`}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
};

export default Navigation;
