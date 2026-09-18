import {createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const authSlice = createSlice({
    name : "auth",
    initialState : { user : null , token : null },
    reducers :{
        setCredentials : ( state , action ) =>{
            const { user , accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;

        },
        logOut : (state) =>{
            state.user = null;
            state.token = null;
        }
    },
});

export const {setCredentials, logOut} = authSlice.actions;
export default authSlice.reducer;

// Selectors for selecting the required value in the state 
export const selectAccessToken = (state : RootState ) => state.auth.token;
export const selectUser = ( state : RootState ) => state.auth.user;