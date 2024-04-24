import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    accessToken: string | null;
    user: any;
};

const initialState: AuthState = {
    accessToken: null,
    user: null
};

const reducers = {
    setAccessToken(state: AuthState, { payload }: PayloadAction<string | null>) {
        state.accessToken = payload;
    },
    setUser(state: AuthState, { payload }: PayloadAction<any>) {
        state.user = payload;
    }
};

const authSlice = createSlice({
    initialState,
    reducers,
    name: 'auth'
});

export const {
    setAccessToken,
    setUser
} = authSlice.actions;

export default authSlice.reducer;
