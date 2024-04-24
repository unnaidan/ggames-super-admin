import { gql } from '@src/graphql-types';

export const CREATE_USER = gql(`
    mutation CreateUser($name:String $surname:String $profileImage:String $phone:String $role:String $password:String $passwordConfirmation:String){createUser(data:{name:$name surname:$surname profileImage:$profileImage phone:$phone role:$role password:$password passwordConfirmation:$passwordConfirmation}){id name surname profileImage phone role energy createdAt}}
`);
