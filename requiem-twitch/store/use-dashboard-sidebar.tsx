import {create} from 'zustand';

interface DashboardSidebarStore{
    collapsed: boolean;
    disappeared: boolean;
    onExpand: () => void;
    onCollapse: () => void;
    onAppeared: () => void;
    onDisappeared: () => void;
};

export const useDashboardSidebar = create<DashboardSidebarStore>((set) => ({
    collapsed: false,
    disappeared: false,
    onExpand: () => set(() => ({collapsed: false, disappeared: false})),
    onCollapse: () => set(() => ({collapsed: true, disappeared: false})), 
    onAppeared: () => set(() => ({disappeared: false})), 
    onDisappeared: () => set(() => ({disappeared: true})), 
}));