import { Route, Routes } from "react-router-dom";
import "./App.css";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <Routes>
        {/* مسیر والد که لایه را رندر می‌کند */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />

          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
