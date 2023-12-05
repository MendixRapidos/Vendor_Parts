import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./Components/Pages/Connection";
import Loading from "./Components/Loading/Loading";
import Index from "./Components/Pages/Index";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/Home" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
