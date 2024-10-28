import type { CodegenConfig } from "@graphql-codegen/cli";

// npx graphql-codegen --config codegen.ts --verbose

const config: CodegenConfig = {
  schema: "http://localhost:1337/graphql",
  documents: ["src/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
