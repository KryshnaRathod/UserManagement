import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import {
  getUser,
  logoutUser,
} from "./api/authApi";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(getUser());

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  const renderPage = () => {
    switch (activePage) {
      case "Students":
        return <Students />;

      case "Courses":
        return <Courses />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-vh-100 bg-light">

      <Sidebar
        activePage={activePage}
        sidebarOpen={sidebarOpen}
        handlePageChange={handlePageChange}
        setSidebarOpen={setSidebarOpen}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="min-vh-100 main-content">

        <Header
          activePage={activePage}
          setSidebarOpen={setSidebarOpen}
          user={user}
          setUser={setUser}
        />

        <main className="container-fluid p-3 p-md-4">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}

export default App;
