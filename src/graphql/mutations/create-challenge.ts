import { gql } from '@src/graphql-types';

export const CREATE_CHALLENGE = gql(`
    mutation CreateChallenge($name:String $subtitle:String $energy:Int $from:String $to:String $promoImage:String $gameId:String $prizes:PrizeCreateNestedManyInput){createChallenge(data:{name:$name subtitle:$subtitle energy:$energy from:$from to:$to promoImage:$promoImage gameId:$gameId prizes:$prizes}){id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:desc}]){nodes{name}}}}
`);
