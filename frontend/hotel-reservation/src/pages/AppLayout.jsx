import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64 md:ml-64" : "ml-16 md:ml-16"
          }`}
        >
          <div className="relative bg-custom-blue overflow-hidden">
            <div
              className="w-full h-64 md:h-80 bg-cover bg-center"
              style={{
                backgroundImage: "url('/headerpic.png')",
                backgroundPosition: "center top ",
              }}
            ></div>
            <div className="relative bg-custom-blue pt-64 md:pt-80">
              <main className="mx-auto bg-custom-blue p-4 md:p-6">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
