"use client";

import { sendOtp } from "@/app/actions";
import useOutsideClick from "@/hooks/useOutsideClick";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import Spinner from "./Spinner";
import { useTranslation } from "@/app/i18n/client";
import { useSignInModal } from "@/store/useSignInModal";
import { useCartStore } from "@/store/useCartStore";
import { AWS_CDN_URL } from "@/app/utils/constants";
import dynamic from "next/dynamic";

const OptimizedImage = dynamic(() => import("./OptimizedImage"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\d{2}-\d{3}-\d{4}$/, "Невірний формат номера телефону")
    .transform((val) => `+380${val.replace(/-/g, "")}`),
});

interface SignInModalProps {
  lng: string;
}

const SignInModal: React.FC<SignInModalProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "common");

  const { isOpen, redirectUrl, closeSignInModal } = useSignInModal();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);

  const [googleSignInError, setGoogleSignInError] = useState<string | null>(
    null
  );

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpSignInError, setOtpSignInError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = "";
    for (let i = 0; i < digits.length && i < 9; i++) {
      if (i === 2 || i === 5) {
        formatted += "-";
      }
      formatted += digits[i];
    }
    return formatted;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    setPhoneNumberError(null);
    setPhoneNumber(formatted);
  };

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const { phone } = phoneSchema.parse({ phone: phoneNumber });
      setPhoneNumberError(null);

      await sendOtp(phone);

      setIsOtpSent(true);
      setOtpSignInError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPhoneNumberError(error.errors[0].message);
      } else {
        setOtpSignInError(`${t("signInModal.firstOtpError")}`);
        console.error("Error sending OTP: ", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSignIn = async () => {
    setIsLoading(true);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "login", { method: "Phone OTP" });
    }
    try {
      const result = await signIn("phoneOtp", {
        phone: phoneSchema.parse({ phone: phoneNumber }).phone,
        token: otp,
        redirect: false,
        callbackUrl: redirectUrl || window.location.href,
      });

      if (result?.error) {
        setOtpSignInError(result.error);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      setOtpSignInError(`${t("signInModal.secondOtpError")}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "login", { method: "Google" });
      }
      await signIn("google", {
        callbackUrl: redirectUrl || window.location.href,
      });
    } catch (error) {
      setGoogleSignInError(`${t("signInModal.googleSignInError")}`);
      console.error("Sign in in with Google: ", error);
    }
  };

  const handleClose = () => {
    setGoogleSignInError(null);
    setOtpSignInError(null);
    setIsOtpSent(false);
    setOtp("");
    setPhoneNumber("");
    setPhoneNumberError(null);
    closeSignInModal();
  };

  const modalRef = useOutsideClick(handleClose);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      >
        <div
          ref={modalRef}
          className="bg-gray-100 w-full max-w-md mx-auto overflow-auto rounded-3xl"
        >
          {/* HEADER */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{t("signInModal.title")}</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleClose()}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">
                    <X size={24} />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="py-4 px-4 flex justify-center">
            <OptimizedImage
              src={`${AWS_CDN_URL}shared/public/icons/logo.png`}
              alt="Your Company Logo"
              width={120}
              height={120}
            />
          </div>
          {/* PHONE NUMBER INPUT */}
          <div className="p-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                {t("signInModal.phoneInputTitle")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <OptimizedImage
                    src={`${AWS_CDN_URL}shared/public/icons/ukrainian-flag.png`}
                    alt="Ukrainian flag"
                    width={20}
                    height={15}
                  />
                  <span className="ml-2 font-semibold">+380</span>
                </div>
                <input
                  type="tel"
                  onChange={handlePhoneChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                  value={phoneNumber}
                  disabled={isOtpSent}
                  className="block w-full pl-24 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="XX-XXX-XXXX"
                />
              </div>
              {phoneNumberError && (
                <p className="mt-1 text-sm text-red-800">{phoneNumberError}</p>
              )}
            </div>
            {isOtpSent ? (
              <>
                <input
                  autoFocus
                  type="text"
                  onChange={handleOtpChange}
                  onKeyDown={(e) => e.key === "Enter" && handleOtpSignIn()}
                  value={otp}
                  className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder={`${t("signInModal.enterSmsCode")}`}
                />
                {otpSignInError && (
                  <p className="mt-1 text-sm text-red-800">{otpSignInError}</p>
                )}

                <div className="flex justify-center pt-3">
                  <button
                    className="text-blue-500 hover:underline focus:outline-none"
                    onClick={handleSendOtp}
                  >
                    {t("signInModal.resendCode")}
                  </button>
                </div>
                <button
                  onClick={handleOtpSignIn}
                  className={`mt-4 w-full bg-gradient-elektro-massive-horizontal text-white py-2 px-4 rounded-md flex justify-center`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner size={24} color="white" />
                  ) : (
                    `${t("signInModal.continue")}`
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={handleSendOtp}
                className={`mt-4 w-full bg-gradient-elektro-massive-horizontal text-white py-2 px-4 rounded-md flex justify-center`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size={24} color="white" />
                ) : (
                  `${t("signInModal.sendCode")}`
                )}
              </button>
            )}

            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <p className="text-gray-500">{t("signInModal.or")}</p>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>

            <div className="pt-4 pb-8">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-100 focus:bg-gray-100"
              >
                <FcGoogle className="h-8 w-8 mr-2" />
                Google
              </button>
              {googleSignInError && (
                <p className="text-red-800 text-center mt-2">
                  {googleSignInError}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignInModal;
