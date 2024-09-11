"use client";

// import { syncCart } from "@/app/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSignInModal } from "@/store/signInModalSlice";
import { stat } from "fs";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignInModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isOpen = useAppSelector((state) => state.signInModal.isOpen);
  const redirectUrl = useAppSelector((state) => state.signInModal.redirectUrl);
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: redirectUrl || window.location.href,
      });
    } catch (error) {
      setError("An error occurred while signing in. Please try again.");
      console.error("Sign in in with Google: ", error);
    }
  };

  const handleClose = () => {
    setError(null);
    dispatch(closeSignInModal());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full h-full overflow-auto flex flex-col">
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
              className="mx-auto h-12 w-auto"
              src="/path-to-your-logo.png"
              alt="Your Company Logo"
              width={48}
              height={48}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {error && (
                <div className="mb-4 text-red-800 text-center">{error}</div>
              )}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FcGoogle className="h-8 w-8 mr-2" />
                Sign in with Google
              </button>
              {error && <p>{error}</p>}
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 my-4"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
