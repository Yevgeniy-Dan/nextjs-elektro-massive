namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_STRAPI_URL: string;

    STRAPI_API_TOKEN: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;

    LIQPAY_PUBLIC_KEY: string;
    LIQPAY_PRIVATE_KEY: string;

    NOVA_POSHTA_API_KEY: string;
    NOVA_POSHTA_SENDER_NAME: string;
    NOVA_POSHTA_SENDER_PHONE: string;
    NOVA_POSHTA_SENDER_REF: string;
    NOVA_POSHTA_SENDER_ADDRESS_REGULAR: string;
    NOVA_POSHTA_SENDER_ADDRESS_CARGO: string;

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    NEXT_PUBLIC_AWS_BUCKET_NAME: string;
    AWS_SITEMAP_FOLDER_URL: string;

    NEXT_PUBLIC_GA_ID: string;
  }
}
