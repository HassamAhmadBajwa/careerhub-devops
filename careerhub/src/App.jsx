import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main>
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
};

export default App;
