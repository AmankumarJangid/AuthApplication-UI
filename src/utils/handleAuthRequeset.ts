import apiClient from "./axiosInterceptor";
import { logOut } from "@/redux/slices/authSlice";
import { store } from "@/redux/store"

export const handleLogout = async ()=>{
    const response = await apiClient.post("/auth/logout");

    if( response?.status){
        console.log( "Logut Successful ");
    }

    store.dispatch(logOut());
}