import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-order" element={<CreateOrder />} />
    </Routes>
  );
}

export default App;