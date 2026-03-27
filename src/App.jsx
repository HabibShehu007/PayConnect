import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Onboarding />} />

          {/* Auth pages */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
