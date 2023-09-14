import React from "react";

export const LoginButton = ({ action }) => {
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={action}
      >
        Login
      </button>
    </>
  );
};

export const RegisterButton = ({ action }) => {
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={action}
      >
        Register
      </button>
    </>
  );
};
