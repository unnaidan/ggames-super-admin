/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation CreateChallenge($name:String $subtitle:String $energy:Int $from:String $to:String $promoImage:String $gameId:String $prizes:PrizeCreateNestedManyInput){createChallenge(data:{name:$name subtitle:$subtitle energy:$energy from:$from to:$to promoImage:$promoImage gameId:$gameId prizes:$prizes}){id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:desc}]){nodes{name}}}}\n": types.CreateChallengeDocument,
    "\n    mutation CreateGame($icon:String $code:String $name:String $version:String $subtitle:String $description:String $cover:String $ageRating:String $size:Float $summaryRating:Float $featured:Boolean $screenshots:ScreenshotCreateNestedManyInput){createGame(data:{icon:$icon code:$code name:$name version:$version subtitle:$subtitle description:$description cover:$cover ageRating:$ageRating size:$size summaryRating:$summaryRating featured:$featured screenshots:$screenshots}){id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}\n": types.CreateGameDocument,
    "\n    mutation CreatePack($name:String $order:Int $price:Int $energy:Int $active:Boolean){createPack(data:{name:$name order:$order price:$price energy:$energy active:$active}){id name order price energy active createdAt}}\n": types.CreatePackDocument,
    "\n    mutation CreateUser($name:String $surname:String $profileImage:String $phone:String $role:String $password:String $passwordConfirmation:String){createUser(data:{name:$name surname:$surname profileImage:$profileImage phone:$phone role:$role password:$password passwordConfirmation:$passwordConfirmation}){id name surname profileImage phone role energy createdAt}}\n": types.CreateUserDocument,
    "\n    mutation DeleteChallenge($id:String){deleteChallenge(where:{id:$id}){id}}\n": types.DeleteChallengeDocument,
    "\n    mutation DeleteGame($id:String){deleteGame(where:{id:$id}){id}}\n": types.DeleteGameDocument,
    "\n    mutation DeletePack($id:String){deletePack(where:{id:$id}){id}}\n": types.DeletePackDocument,
    "\n    mutation DeleteUser($id:String){deleteUser(where:{id:$id}){id}}\n": types.DeleteUserDocument,
    "\n    mutation SignIn($phone:String $password:String){signIn(dto:{phone:$phone password:$password})}\n": types.SignInDocument,
    "\n    mutation UpdateChallenge($id:String $name:String $subtitle:String $energy:Int $from:String $to:String $promoImage:String $gameId:String $prizes:PrizeCreateNestedManyInput){updateChallenge(where:{id:$id}data:{name:$name subtitle:$subtitle energy:$energy from:$from to:$to promoImage:$promoImage gameId:$gameId prizes:$prizes}){id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:desc}]){nodes{name}}}}\n": types.UpdateChallengeDocument,
    "\n    mutation UpdateGame($id:String $icon:String $code:String $name:String $version:String $subtitle:String $description:String $cover:String $ageRating:String $size:Float $summaryRating:Float $featured:Boolean $screenshots:ScreenshotCreateNestedManyInput){updateGame(where:{id:$id}data:{icon:$icon code:$code name:$name version:$version subtitle:$subtitle description:$description cover:$cover ageRating:$ageRating size:$size summaryRating:$summaryRating featured:$featured screenshots:$screenshots}){id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}\n": types.UpdateGameDocument,
    "\n    mutation UpdatePack($id:String $name:String $order:Int $price:Int $energy:Int $active:Boolean){updatePack(where:{id:$id}data:{name:$name order:$order price:$price energy:$energy active:$active}){id name order price energy active createdAt}}\n": types.UpdatePackDocument,
    "\n    mutation UpdateUser($id:String $name:String $surname:String $profileImage:String $phone:String $role:String){updateUser(where:{id:$id}data:{name:$name surname:$surname profileImage:$profileImage phone:$phone role:$role}){id name surname profileImage phone role energy createdAt}}\n": types.UpdateUserDocument,
    "\n    query Challenge($id:String){challenge(where:{id:$id}){id name subtitle from to}}\n": types.ChallengeDocument,
    "\n    query Challenges($search:String $skip:Int $take:Int $orderBy:[ChallengeOrderByInput!]){challenges(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:asc}]){nodes{name order}}}}}\n": types.ChallengesDocument,
    "\n    query CurrentUser{currentUser{id name surname profileImage phone role}}\n": types.CurrentUserDocument,
    "\n    query Games($search:String $skip:Int $take:Int $orderBy:[GameOrderByInput!]){games(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}}\n": types.GamesDocument,
    "\n    query Orders($search:String $skip:Int $take:Int $orderBy:[OrderOrderByInput!]){orders(skip:$skip take:$take orderBy:$orderBy where:{user:{phone:{contains:$search}}}){count nodes{id status amount createdAt pack{name}user{name surname profileImage phone}}}}\n": types.OrdersDocument,
    "\n    query Packs($search:String $skip:Int $take:Int $orderBy:[PackOrderByInput!]){packs(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id name order price energy active createdAt}}}\n": types.PacksDocument,
    "\n    query Scoreboard($id:String){scoreboard(where:{id:$id}){id name profileImage phone position score}}\n": types.ScoreboardDocument,
    "\n    query SelectGames{games(orderBy:{name:asc}){nodes{id name}}}\n": types.SelectGamesDocument,
    "\n    query Users($search:String $skip:Int $take:Int $orderBy:[UserOrderByInput!]){users(skip:$skip take:$take orderBy:$orderBy where:{OR:[{name:{contains:$search}}{surname:{contains:$search}}{phone:{contains:$search}}]}){count nodes{id name surname profileImage phone role energy createdAt}}}\n": types.UsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateChallenge($name:String $subtitle:String $energy:Int $from:String $to:String $promoImage:String $gameId:String $prizes:PrizeCreateNestedManyInput){createChallenge(data:{name:$name subtitle:$subtitle energy:$energy from:$from to:$to promoImage:$promoImage gameId:$gameId prizes:$prizes}){id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:desc}]){nodes{name}}}}\n"): (typeof documents)["\n    mutation CreateChallenge($name:String $subtitle:String $energy:Int $from:String $to:String $promoImage:String $gameId:String $prizes:PrizeCreateNestedManyInput){createChallenge(data:{name:$name subtitle:$subtitle energy:$energy from:$from to:$to promoImage:$promoImage gameId:$gameId prizes:$prizes}){id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:desc}]){nodes{name}}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateGame($icon:String $code:String $name:String $version:String $subtitle:String $description:String $cover:String $ageRating:String $size:Float $summaryRating:Float $featured:Boolean $screenshots:ScreenshotCreateNestedManyInput){createGame(data:{icon:$icon code:$code name:$name version:$version subtitle:$subtitle description:$description cover:$cover ageRating:$ageRating size:$size summaryRating:$summaryRating featured:$featured screenshots:$screenshots}){id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}\n"): (typeof documents)["\n    mutation CreateGame($icon:String $code:String $name:String $version:String $subtitle:String $description:String $cover:String $ageRating:String $size:Float $summaryRating:Float $featured:Boolean $screenshots:ScreenshotCreateNestedManyInput){createGame(data:{icon:$icon code:$code name:$name version:$version subtitle:$subtitle description:$description cover:$cover ageRating:$ageRating size:$size summaryRating:$summaryRating featured:$featured screenshots:$screenshots}){id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreatePack($name:String $order:Int $price:Int $energy:Int $active:Boolean){createPack(data:{name:$name order:$order price:$price energy:$energy active:$active}){id name order price energy active createdAt}}\n"): (typeof documents)["\n    mutation CreatePack($name:String $order:Int $price:Int $energy:Int $active:Boolean){createPack(data:{name:$name order:$order price:$price energy:$energy active:$active}){id name order price energy active createdAt}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateUser($name:String $surname:String $profileImage:String $phone:String $role:String $password:String $passwordConfirmation:String){createUser(data:{name:$name surname:$surname profileImage:$profileImage phone:$phone role:$role password:$password passwordConfirmation:$passwordConfirmation}){id name surname profileImage phone role energy createdAt}}\n"): (typeof documents)["\n    mutation CreateUser($name:String $surname:String $profileImage:String $phone:String $role:String $password:String $passwordConfirmation:String){createUser(data:{name:$name surname:$surname profileImage:$profileImage phone:$phone role:$role password:$password passwordConfirmation:$passwordConfirmation}){id name surname profileImage phone role energy createdAt}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteChallenge($id:String){deleteChallenge(where:{id:$id}){id}}\n"): (typeof documents)["\n    mutation DeleteChallenge($id:String){deleteChallenge(where:{id:$id}){id}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteGame($id:String){deleteGame(where:{id:$id}){id}}\n"): (typeof documents)["\n    mutation DeleteGame($id:String){deleteGame(where:{id:$id}){id}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeletePack($id:String){deletePack(where:{id:$id}){id}}\n"): (typeof documents)["\n    mutation DeletePack($id:String){deletePack(where:{id:$id}){id}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteUser($id:String){deleteUser(where:{id:$id}){id}}\n"): (typeof documents)["\n    mutation DeleteUser($id:String){deleteUser(where:{id:$id}){id}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SignIn($phone:String $password:String){signIn(dto:{phone:$phone password:$password})}\n"): (typeof documents)["\n    mutation SignIn($phone:String $password:String){signIn(dto:{phone:$phone password:$password})}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateChallenge($id:String $name:String $subtitle:String $energy:Int $from:String $to:String $promoImage:String $gameId:String $prizes:PrizeCreateNestedManyInput){updateChallenge(where:{id:$id}data:{name:$name subtitle:$subtitle energy:$energy from:$from to:$to promoImage:$promoImage gameId:$gameId prizes:$prizes}){id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:desc}]){nodes{name}}}}\n"): (typeof documents)["\n    mutation UpdateChallenge($id:String $name:String $subtitle:String $energy:Int $from:String $to:String $promoImage:String $gameId:String $prizes:PrizeCreateNestedManyInput){updateChallenge(where:{id:$id}data:{name:$name subtitle:$subtitle energy:$energy from:$from to:$to promoImage:$promoImage gameId:$gameId prizes:$prizes}){id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:desc}]){nodes{name}}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateGame($id:String $icon:String $code:String $name:String $version:String $subtitle:String $description:String $cover:String $ageRating:String $size:Float $summaryRating:Float $featured:Boolean $screenshots:ScreenshotCreateNestedManyInput){updateGame(where:{id:$id}data:{icon:$icon code:$code name:$name version:$version subtitle:$subtitle description:$description cover:$cover ageRating:$ageRating size:$size summaryRating:$summaryRating featured:$featured screenshots:$screenshots}){id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}\n"): (typeof documents)["\n    mutation UpdateGame($id:String $icon:String $code:String $name:String $version:String $subtitle:String $description:String $cover:String $ageRating:String $size:Float $summaryRating:Float $featured:Boolean $screenshots:ScreenshotCreateNestedManyInput){updateGame(where:{id:$id}data:{icon:$icon code:$code name:$name version:$version subtitle:$subtitle description:$description cover:$cover ageRating:$ageRating size:$size summaryRating:$summaryRating featured:$featured screenshots:$screenshots}){id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdatePack($id:String $name:String $order:Int $price:Int $energy:Int $active:Boolean){updatePack(where:{id:$id}data:{name:$name order:$order price:$price energy:$energy active:$active}){id name order price energy active createdAt}}\n"): (typeof documents)["\n    mutation UpdatePack($id:String $name:String $order:Int $price:Int $energy:Int $active:Boolean){updatePack(where:{id:$id}data:{name:$name order:$order price:$price energy:$energy active:$active}){id name order price energy active createdAt}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateUser($id:String $name:String $surname:String $profileImage:String $phone:String $role:String){updateUser(where:{id:$id}data:{name:$name surname:$surname profileImage:$profileImage phone:$phone role:$role}){id name surname profileImage phone role energy createdAt}}\n"): (typeof documents)["\n    mutation UpdateUser($id:String $name:String $surname:String $profileImage:String $phone:String $role:String){updateUser(where:{id:$id}data:{name:$name surname:$surname profileImage:$profileImage phone:$phone role:$role}){id name surname profileImage phone role energy createdAt}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Challenge($id:String){challenge(where:{id:$id}){id name subtitle from to}}\n"): (typeof documents)["\n    query Challenge($id:String){challenge(where:{id:$id}){id name subtitle from to}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Challenges($search:String $skip:Int $take:Int $orderBy:[ChallengeOrderByInput!]){challenges(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:asc}]){nodes{name order}}}}}\n"): (typeof documents)["\n    query Challenges($search:String $skip:Int $take:Int $orderBy:[ChallengeOrderByInput!]){challenges(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:asc}]){nodes{name order}}}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query CurrentUser{currentUser{id name surname profileImage phone role}}\n"): (typeof documents)["\n    query CurrentUser{currentUser{id name surname profileImage phone role}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Games($search:String $skip:Int $take:Int $orderBy:[GameOrderByInput!]){games(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}}\n"): (typeof documents)["\n    query Games($search:String $skip:Int $take:Int $orderBy:[GameOrderByInput!]){games(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Orders($search:String $skip:Int $take:Int $orderBy:[OrderOrderByInput!]){orders(skip:$skip take:$take orderBy:$orderBy where:{user:{phone:{contains:$search}}}){count nodes{id status amount createdAt pack{name}user{name surname profileImage phone}}}}\n"): (typeof documents)["\n    query Orders($search:String $skip:Int $take:Int $orderBy:[OrderOrderByInput!]){orders(skip:$skip take:$take orderBy:$orderBy where:{user:{phone:{contains:$search}}}){count nodes{id status amount createdAt pack{name}user{name surname profileImage phone}}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Packs($search:String $skip:Int $take:Int $orderBy:[PackOrderByInput!]){packs(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id name order price energy active createdAt}}}\n"): (typeof documents)["\n    query Packs($search:String $skip:Int $take:Int $orderBy:[PackOrderByInput!]){packs(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id name order price energy active createdAt}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Scoreboard($id:String){scoreboard(where:{id:$id}){id name profileImage phone position score}}\n"): (typeof documents)["\n    query Scoreboard($id:String){scoreboard(where:{id:$id}){id name profileImage phone position score}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query SelectGames{games(orderBy:{name:asc}){nodes{id name}}}\n"): (typeof documents)["\n    query SelectGames{games(orderBy:{name:asc}){nodes{id name}}}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Users($search:String $skip:Int $take:Int $orderBy:[UserOrderByInput!]){users(skip:$skip take:$take orderBy:$orderBy where:{OR:[{name:{contains:$search}}{surname:{contains:$search}}{phone:{contains:$search}}]}){count nodes{id name surname profileImage phone role energy createdAt}}}\n"): (typeof documents)["\n    query Users($search:String $skip:Int $take:Int $orderBy:[UserOrderByInput!]){users(skip:$skip take:$take orderBy:$orderBy where:{OR:[{name:{contains:$search}}{surname:{contains:$search}}{phone:{contains:$search}}]}){count nodes{id name surname profileImage phone role energy createdAt}}}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;