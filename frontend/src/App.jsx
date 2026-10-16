import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import LeadListPage from "./pages/LeadListPage.jsx";
import AddLeadPage from "./pages/AddLeadPage.jsx";
import LeadDetailPage from "./pages/LeadDetailPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar">
          <div className="brand">Lead CRM</div>
          <div className="nav-links">
            <NavLink to="/" end>
              Leads
            </NavLink>
            <NavLink to="/add">Add Lead</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </div>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/" element={<LeadListPage />} />
            <Route path="/add" element={<AddLeadPage />} />
            <Route path="/leads/:id" element={<LeadDetailPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
