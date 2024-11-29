import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    account: null,
    role: null,
    isSigningUp:false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup : async(credentials, role) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post(`/api/v1/auth/signup/${role}`, credentials);
            set({ account: response.data.account, role: response.data.role, isSigningUp: false });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            set({ account: null, role: null, isSigningUp: false });
        }
    },
    login : async(credentials, role) => {
        console.log("credentials: ", credentials, "role: ", role);
        
        set({ isLoggingIn: true });
        try {
            const response = await axios.post(`/api/v1/auth/login/${role}`, credentials);
            set({ account: response.data.account, role: response.data.role, isLoggingIn: false });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);            
            set({ account: null, role: null, isLoggingIn: false });
        }
    },
    logout : async() => {
        set({ isLoggingOut: true });
        try {
            const response = await axios.post("/api/v1/auth/logout");
            set({ account: null, role: null, isLoggingOut: false });
            toast.success(response.data.message);
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response.data.message);
        }
    },
    authCheck : async() => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("/api/v1/auth/check");            
            console.log(response);
            
            set({ account: response.data.account, role: response.data.role, isCheckingAuth: false });            
        } catch (error) {
            set({ account: null, role: null, isCheckingAuth: false });
        }

    },
}));