import { ApolloProvider } from '@apollo/client';
import { Router } from '@src/Router';
import { client } from '@src/plugins/apollo-client';
import { persistor, store } from '@src/redux/configureStore';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ApolloProvider client={client}>
                    <RouterProvider router={Router} />
                </ApolloProvider>
            </PersistGate>
        </Provider>
    );
};
