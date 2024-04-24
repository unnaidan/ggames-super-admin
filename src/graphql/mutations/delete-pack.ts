import { gql } from '@src/graphql-types';

export const DELETE_PACK = gql(`
    mutation DeletePack($id:String){deletePack(where:{id:$id}){id}}
`);
