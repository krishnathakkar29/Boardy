import Navbar from "@/components/dashboard/navbar";
import OrgSidebar from "@/components/dashboard/org-sidebar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import React from "react";

interface DashBoardLayoutProps {
  children?: React.ReactNode;
}

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex h-full">
          <OrgSidebar />
          <div className="border-l border-gray-300 h-full" />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardLayout;
