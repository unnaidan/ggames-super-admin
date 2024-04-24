import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { setAccessToken, setUser } from '@src/redux/auth/reducer';
import { store } from '@src/redux/configureStore';

const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_API_URL}/graphql`
});

const authLink = setContext((_, { headers }) => {
    const {
        auth
    } = store.getState();
    return {
        headers: Object.assign({}, headers, {
            authorization: auth.accessToken ? `Bearer ${auth.accessToken}` : ''
        })
    };
});

const errorLink = onError(error => {
    if (error?.graphQLErrors?.some((err: any) => err.extensions.code === 'UNAUTHENTICATED')) {
        store.dispatch(setAccessToken(null));
        store.dispatch(setUser(null));
    }
});

export const client = new ApolloClient({
    link: from([
        authLink,
        errorLink,
        httpLink
    ]),
    cache: new InMemoryCache({
        addTypename: false
    })
});
