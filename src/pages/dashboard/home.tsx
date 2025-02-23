import { FormEvent, Suspense, useState } from "react";
import useSWR from "swr";
import { RecipeCard, SearchBox } from "../../components/index";
import { NoRecipe } from "./common/index";
import { IRECIPERESPONSE } from "../../@types/index";
import { useRecipe } from "../../hooks/index";
import { instance } from "../../config/index";
import cogoToast from "cogo-toast";
import { SearchLoader, UILoader } from "../../components/loaders/index";

export const Home = ()=>{
    const [query, setQuery] = useState<string>("");
    const fetcher = (url: string) => instance.get(url).then((res)=>res.data);
    const {data, error} = useSWR("/recipe", fetcher, {suspense: true});
    const [state, setState] = useState<IRECIPERESPONSE[]>(data as unknown as IRECIPERESPONSE[] | []);
    const {loading, searchRecipe} = useRecipe();

    if(error){
        console.log(error);
        cogoToast.error(error?.response?.data?.error);
        return null;
    }

    const onSubmit = async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!query) return;
        const result: IRECIPERESPONSE[] | [] = await searchRecipe(query);
        if(result){
            setState(result);
        }
    };

    const props = {
        title: "Recipes",
        onSearch: onSubmit,
        query,
        setQuery
    }

    return (
    <Suspense fallback={<UILoader />}>
        <div className="ml-0 lg:ml-[3%] text-white w-full h-full">
            <SearchBox {...props} />
            {loading ? (
                <SearchLoader />
            ) : (
                <>
                    {!!state?.length ? (
                        <>
                        <div className="flex flex-wrap gap-3 flex-col items-center justify-center md:justify-start md:items-start md:flex-row w-full">
                            {state.map((recipe: IRECIPERESPONSE, index: number) => (
                                <RecipeCard
                                    key={index + recipe._id}
                                    {...recipe}
                                    user={recipe?.user?.email as string}
                                />
                            ))}
                        </div>
                        </>
                    ) : (<><NoRecipe /></>)}
                </>
            )
            }
        </div>;
    </Suspense>
    )
}