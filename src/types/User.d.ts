export type StrapiUserT = {
  id: number;
  username: string;
  email: string;
  provider: "local" | "google";
  blocked: boolean;
};

export type StrapiLoginResponseT = {
  jwt: string;
  user: StrapiUserT;
};
