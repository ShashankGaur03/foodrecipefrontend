import { useState, FormEvent, Suspense, useContext } from "react";
import useSWR from "swr";
import cogoToast from "cogo-toast";

import { RecipeCard, SearchBox } from "../../components/index";
import { instance } from "../../config/index";
import { AUTH_TYPE, IRECIPERESPONSE } from "../../@types/index";
import { AuthenticationContext } from "../../context/index";
import { NoRecipe } from "./common/index";
import { useRecipe } from "../../hooks/index";
import { SearchLoader, UILoader } from "../../components/loaders/index";

export const MyRecipes = () => {
  const { loading, searchRecipe } = useRecipe();
  const { user } = useContext(AuthenticationContext) as AUTH_TYPE;

  //useswr fetcher
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `/recipe/user/${sessionStorage.getItem("id")}`,
    fetcher,
    {
      suspense: true,
    }
  );

  if (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.error);
    return null;
  }

  const [state, setState] = useState<IRECIPERESPONSE[]>(data || {});
  const [query, setQuery] = useState<string>("");

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    const result: IRECIPERESPONSE[] = await searchRecipe(query);
    console.log(result, "RESULT");
    if (result) {
        setState(result.filter((e)=>{
            return ""+e.user === sessionStorage.getItem("email")
        }));
    }
  };

  return (
    <Suspense fallback={<UILoader />}>
      <div className="ml-0 lg:ml-[3%] text-white w-full h-full">
        <SearchBox
          title="My Recipes"
          onSearch={handleSearch}
          setQuery={setQuery}
          query={query}
          disabled={!data?.length}
        />
        {loading ? (
          <SearchLoader />
        ) : (
          <>
            {!!state?.length ? (
              <div className="flex flex-wrap gap-3 flex-col md:flex-row w-ful">
                {state.map((recipe: IRECIPERESPONSE, index: number) => (
                  <RecipeCard
                    key={index + recipe._id}
                    {...recipe}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <>
                <NoRecipe />
              </>
            )}
          </>
        )}
      </div>
    </Suspense>
  );
};