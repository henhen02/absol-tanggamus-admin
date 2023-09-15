import React from "react";
import * as AiIcon from "react-icons/ai";

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

export const DetailButton = ({ action }) => {
  return (
    <>
      <button
        className="flex flex-row justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-extralight py-0.5 px-2 rounded"
        onClick={action}
      >
        <AiIcon.AiOutlineEye size={14} className="mr-1" />
        Lihat
      </button>
    </>
  );
};

export const EditButton = ({
  action = () => {
    alert("Coming soon :)");
  },
}) => {
  return (
    <>
      <button
        className="flex flex-row justify-center items-center bg-green-500 hover:bg-green-700 text-white font-extralight py-0.5 px-3 rounded"
        onClick={action}
      >
        <AiIcon.AiOutlineEdit size={14} className="mr-1" />
        Edit
      </button>
    </>
  );
};

export const DeleteButton = ({
  action = () => {
    alert("Coming soon :)");
  },
}) => {
  return (
    <>
      <button
        className="flex flex-row justify-center items-center bg-red-500 hover:bg-red-700 text-white font-extralight py-0.5 px-1 rounded"
        onClick={action}
      >
        <AiIcon.AiOutlineDelete size={14} className="mr-1" />
        Hapus
      </button>
    </>
  );
};
