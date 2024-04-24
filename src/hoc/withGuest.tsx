import { RootState } from '@src/redux/configureStore';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function withGuest<T>(WrappedComponent: React.ComponentType<T>) {
    return (props: any): JSX.Element => {
        return useSelector((state: RootState) => state.auth.user) === null
            ? <WrappedComponent {...props} />
            : <Navigate
                to="/"
                replace
            />;
    };
}
