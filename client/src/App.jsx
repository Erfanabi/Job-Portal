import { Route, Routes } from "react-router-dom";
import "./App.css";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddJobs from "./pages/AddJobs";
import ManagerJobs from "./pages/ManagerJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

function App() {
  const { companyToken } = useContext(AppContext);

  return (
    <div>
      <Routes>
        {/* مسیر والد که لایه را رندر می‌کند */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />

          {companyToken ? (
            <>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index path="add-job" element={<AddJobs />} />
                <Route path="manage-jobs" element={<ManagerJobs />} />
                <Route
                  path="view-applications"
                  element={<ViewApplications />}
                />
              </Route>
            </>
          ) : null}

          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
