export type StrapiUserT = {
  id: string;
  username: string;
  email: string;
  phone: string;
  provider: "local" | "google" | "phoneOtp";
  blocked: boolean;
  role: string;
};

export type StrapiLoginResponseT = {
  jwt: string;
  user: StrapiUserT;
  message?: string;
};
