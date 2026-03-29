import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashbaord from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import AirtimePage from "./pages/AirtimePage";
import TransactionsPage from "./pages/TransactionsPage";
import ActivityPage from "./pages/Activity";
import AddMoney from "./pages/AddMoney";
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
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/add-money" element={<AddMoney />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
