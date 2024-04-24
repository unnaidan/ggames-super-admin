import { setAccessToken, setUser } from '@src/redux/auth/reducer';
import { store } from '@src/redux/configureStore';
import { default as axios } from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

API.interceptors.request.use(config => {
    const { auth } = store.getState();
    if (auth.accessToken) {
        config.headers.authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

API.interceptors.response.use(({ data }) => {
    return data;
}, error => {
    if (error?.graphQLErrors?.some((err: any) => err.extensions.code === 'UNAUTHENTICATED')) {
        store.dispatch(setAccessToken(null));
        store.dispatch(setUser(null));
    }
    return Promise.reject(error);
});

export { API };
