import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashbaord from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import AirtimePage from "./pages/AirtimePage";
import DataPage from "./pages/DataPage";
import TransactionsPage from "./pages/TransactionsPage";
import ActivityPage from "./pages/Activity";
import AddMoney from "./pages/AddMoney";
import UtilityPage from "./pages/UtilityPage";
// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashbaord from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminActivities from "./admin/AdminActivities";
import AdminTransactions from "./admin/AdminTransactions";
function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Onboarding />} />

          {/* Auth pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashbaord />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/airtime" element={<AirtimePage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/add-money" element={<AddMoney />} />
          <Route path="/utility" element={<UtilityPage />} />
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashbaord />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-activities" element={<AdminActivities />} />
          <Route path="/admin-transactions" element={<AdminTransactions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
