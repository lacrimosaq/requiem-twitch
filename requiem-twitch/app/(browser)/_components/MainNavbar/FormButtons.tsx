"use client"

import { useForm } from "@/store/use-form";

export const FormButtons = () => {
  const {onLoginForm,
        onRegisterForm,
      } = useForm((state) => state);

  const handleLogInButtonClick = () => {
    onLoginForm();
    // setShowLoginForm(true);
  };
  const handleSignUpButtonClick = () => {
    onRegisterForm();
    // setShowLoginForm(true);
  };
    return(
      <div>
        <button onClick={handleLogInButtonClick} type="button" className="text-white bg-slate-700 hover:bg-slate-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Log In
        </button>
        <button onClick={handleSignUpButtonClick} type="button" className="text-white bg-rose-700 hover:bg-rose-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Sign Up
        </button>
      </div>
    );
}