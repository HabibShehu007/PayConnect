import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Onboarding />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
