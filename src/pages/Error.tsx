import { ErrorResponse, useRouteError } from 'react-router-dom';

export const Error = (): JSX.Element => {
    const error = useRouteError() as ErrorResponse;

    return (
        <div className="py-5">
            <div className="container mx-auto px-5">
                <h1 className="text-7xl text-center font-bold">
                    {error.status}
                </h1>
            </div>
        </div>
    );
};
