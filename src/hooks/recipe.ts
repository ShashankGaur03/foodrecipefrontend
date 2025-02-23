import { AxiosResponse } from "axios";
import { useState } from "react"
import { IRECIPERESPONSE, IRECIPEPAYLOAD } from "../@types/index";
import { instance } from "../config/index";

export const useRecipe = ()=>{
    const [loading, setLoading] = useState<boolean>(false);

    const searchRecipe = async (
        q: string
    ): Promise<AxiosResponse<IRECIPERESPONSE[] | []> | any> => {
        try{
            setLoading(true);
            const response = await instance.get(`/recipe/find?q=${q}`);
            if(response){
                return response?.data;
            }
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const addRecipe = async (payload: IRECIPEPAYLOAD): Promise<void>=>{
        console.log("Payload is:");
        console.log(payload);

        const {note, ...rest} = payload;

        console.log("Note is:");
        console.log(note);
        console.log("Rest is:");
        console.log(rest);

        const formData = new FormData();
        const payloadToArray = Object.keys(rest);

        for(const item of payloadToArray){
            formData.append(item, rest[item as keyof typeof rest]);
        }
        if(note){
            formData.append("note", note);
        }

        try{
            setLoading(true);
            await instance.post("/recipe/create", formData);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return {loading, searchRecipe, addRecipe};
}