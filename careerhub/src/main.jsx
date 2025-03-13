import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import {
  Landing,
  Register,
  Login,
  AdminDashboard,
  EmployerDashboard,
  JobseekerDashboard,
  PrivateRoute,
} from "./Pages/index.jsx";
import { Profile } from "./Components/index.jsx";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* private route */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["employer"]} />}>
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["job-seeker"]} />}>
        <Route
          path="/job-seeker/dashboard/*"
          element={<JobseekerDashboard />}
        />
        <Route path="/job-seeker/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
