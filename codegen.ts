import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:4300/graphql',
    ignoreNoDocuments: true,
    documents: [
        'src/**/*.{ts,tsx}'
    ],
    generates: {
        './src/graphql-types/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql'
            }
        }
    }
};

export default config;
