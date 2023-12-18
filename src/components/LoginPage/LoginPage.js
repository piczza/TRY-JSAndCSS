import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import SignUpSection from "./SignUpSection/SignUpSection";

function LoginPage() {
  return (
    <div>
      <LoginForm />
      <SignUpSection />
    </div>
  );
}

export default LoginPage;
