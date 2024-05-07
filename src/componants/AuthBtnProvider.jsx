import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebaseconfig";

const AuthBtnProvider = ({ Icon, label, provider }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const gitAuthProvider = new GithubAuthProvider();

  const handleclick = async () => {
    switch (provider) {
      case "GoogleAuthProvider":
        await signInWithRedirect(auth, googleAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(`Error : ${err.Message}`);
          });

        break;

      case "GithubAuthProvider":
        await signInWithRedirect(auth, gitAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(`Error : ${err.Message}`);
          });

        break;

      default:
        await signInWithRedirect(auth, googleAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(`Error : ${err.Message}`);
          });

        break;
    }
  };

  return (
    <div
      onClick={handleclick}
      className="w-full px-4 py-3  rounded-md border-2 flex items-center justify-between cursor-pointer group hover:bg-purple-600 active:scale-95 hover:shadow-md"
    >
      <Icon className=" text-txtPrimary text-xl  group-hover:text-white" />
      <p className="text-txtPrimary text-lg group-hover:text-white">{label}</p>

      <FaChevronRight className="text-txtPrimary text-base group-hover:text-white" />
    </div>
  );
};

export default AuthBtnProvider;