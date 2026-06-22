import Sidebar, { Topbar } from '../dashboard/LayoutElements';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-bg-dark overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
