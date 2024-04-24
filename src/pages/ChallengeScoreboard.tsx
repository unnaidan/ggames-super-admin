import { useQuery } from '@apollo/client';
import { CircularProgress } from '@nextui-org/react';
import { Scoreboard } from '@src/components/Scoreboard';
import { CHALLENGE } from '@src/graphql/queries/challenge';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

export const ChallengeScoreboard = (): JSX.Element => {
    const { id } = useParams();
    const {
        data,
        loading
    } = useQuery(CHALLENGE, {
        fetchPolicy: 'no-cache',
        variables: {
            id
        }
    });

    if (id === undefined || data === undefined || loading) {
        return (
            <div className="py-5">
                <div className="container mx-auto px-5">
                    <CircularProgress className="mx-auto" />
                </div>
            </div>
        );
    }

    const {
        name,
        subtitle,
        from,
        to
    } = data.challenge;

    return (
        <Fragment>
            <Helmet>
                <title>
                    {name} - GGames.mn
                </title>
            </Helmet>
            <div className="py-5">
                <div className="container mx-auto px-5">
                    <h1 className="text-xl font-bold">
                        {name}
                    </h1>
                    <div className="">
                        <Scoreboard id={id} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
