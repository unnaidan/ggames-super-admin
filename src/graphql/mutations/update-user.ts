import { gql } from '@src/graphql-types';

export const UPDATE_USER = gql(`
    mutation UpdateUser($id:String $name:String $surname:String $profileImage:String $phone:String $role:String){updateUser(where:{id:$id}data:{name:$name surname:$surname profileImage:$profileImage phone:$phone role:$role}){id name surname profileImage phone role energy createdAt}}
`);
