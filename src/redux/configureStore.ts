import { configureStore } from '@reduxjs/toolkit';
import { default as auth, AuthState } from '@src/redux/auth/reducer';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import { default as storage } from 'redux-persist/lib/storage';

export type RootState = {
    auth: AuthState;
};

const persistConfig: PersistConfig<RootState> = {
    storage,
    key: 'redux',
    whitelist: [
        'auth'
    ]
};

const middleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,
                REHYDRATE
            ]
        }
    });

const reducer = persistReducer(persistConfig, combineReducers({
    auth
}));

export const store = configureStore({
    middleware,
    reducer
});

export const persistor = persistStore(store);
