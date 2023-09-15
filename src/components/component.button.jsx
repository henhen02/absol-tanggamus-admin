import React from "react";
import * as Icon from "react-icons/md";

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
        className="flex flex-row font-medium items-center bg-blue-500 hover:bg-blue-700 text-white py-1 px-5 rounded text-sm"
        onClick={action}
      >
        <Icon.MdRemoveRedEye size={14} className="mr-1" />
        Lihat
      </button>
    </>
  );
};

export const EditButton = ({ action }) => {
  return (
    <>
      <button
        className="flex flex-row font-medium items-center bg-green-500 hover:bg-green-700 text-white py-1 px-5 rounded text-sm"
        onClick={action}
      >
        <Icon.MdEdit size={14} className="mr-1" />
        Edit
      </button>
    </>
  );
};

export const DeleteButton = ({ action }) => {
  return (
    <>
      <button
        className="flex flex-row font-medium items-center bg-red-500 hover:bg-red-700 text-white py-1 px-5 rounded text-sm"
        onClick={action}
      >
        <Icon.MdDelete size={14} className="mr-1" />
        Hapus
      </button>
    </>
  );
};
