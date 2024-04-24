import { RootState } from '@src/redux/configureStore';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function withUser<T>(WrappedComponent: React.ComponentType<T>) {
    return (props: any): JSX.Element => {
        return useSelector((state: RootState) => state.auth.user)
            ? <WrappedComponent {...props} />
            : <Navigate
                to="/signin"
                replace
            />;
    };
}
