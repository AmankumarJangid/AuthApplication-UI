import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../store";

const appSlice = createSlice({
    name : "app",
    initialState : { isLoading : false },
    reducers :{
        setLoading : ( state , action ) =>{
            const { isLoading } = action.payload;
            state.isLoading = isLoading;
        },
    }   
})

export default appSlice.reducer;

export const { setLoading } = appSlice.actions;

export const  selectIsLoading = (state : RootState ) => state.app.isLoading;