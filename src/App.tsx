import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/auth/ForgotPassword";
import KYC from "./pages/KYC";
import React from "react";
import ResetPassword from "./components/auth/ResetPassword";
import RoleSelection from "./pages/RoleSelection";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";
import VerifyOTP from "./components/auth/VerifyOTP";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        {/* Add ToastContainer at the root level */}
        <ToastContainer
          position="top-right"
          autoClose={5000} // Toast auto-closes in 5 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
