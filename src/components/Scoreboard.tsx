import { useQuery } from '@apollo/client';
import { CircularProgress } from '@nextui-org/react';
import { SCOREBOARD } from '@src/graphql/queries/scoreboard';

type ScoreboardProps = {
    id: string;
};

export const Scoreboard = ({ id }: ScoreboardProps): JSX.Element => {
    const {
        data,
        loading
    } = useQuery(SCOREBOARD, {
        fetchPolicy: 'no-cache',
        variables: {
            id
        }
    });

    return (
        <div className="flex flex-col gap-y-2">
            {loading && (
                <div className="flex justify-center">
                    <CircularProgress size="lg" />
                </div>
            )}
            {data?.scoreboard.map(({ id, name, profileImage, phone, position, score }) => (
                <div key={id}>

                </div>
            ))}
        </div>
    );
};
