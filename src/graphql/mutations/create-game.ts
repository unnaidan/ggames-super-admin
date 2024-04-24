import { gql } from '@src/graphql-types';

export const CREATE_GAME = gql(`
    mutation CreateGame($icon:String $code:String $name:String $version:String $subtitle:String $description:String $cover:String $ageRating:String $size:Float $summaryRating:Float $featured:Boolean $screenshots:ScreenshotCreateNestedManyInput){createGame(data:{icon:$icon code:$code name:$name version:$version subtitle:$subtitle description:$description cover:$cover ageRating:$ageRating size:$size summaryRating:$summaryRating featured:$featured screenshots:$screenshots}){id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}
`);
