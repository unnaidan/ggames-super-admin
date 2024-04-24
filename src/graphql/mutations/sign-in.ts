import { gql } from '@src/graphql-types';

export const SIGN_IN = gql(`
    mutation SignIn($phone:String $password:String){signIn(dto:{phone:$phone password:$password})}
`);
