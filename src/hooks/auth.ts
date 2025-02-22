import { useState } from "react";
import { instance } from "../config/index";
import { ILOGINRESPONSE } from "../@types";

export const useAuth = ()=>{
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (payload: {email: string, password: string}): Promise<ILOGINRESPONSE> => {
        try {
            setLoading(true);
            const response = await instance.post("/auth/join", payload);
            if (response?.data) {
                return response.data;
            }
            throw new Error("Invalid response from server");
        } catch (error) {
            console.error("Login error:", error);
            throw error; // Ensures the function never returns void
        } finally {
            setLoading(false);
        }
    };    

    return { loading, login };
};