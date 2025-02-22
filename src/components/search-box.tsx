import { SetStateAction, FormEvent } from "react";
import { Form } from "./form";
import { Input } from "./input";

export const SearchBox = ({title, query, setQuery, onSearch, disabled=false} : {
    title: string;
    query: string;
    setQuery: (e: SetStateAction<string>) => void;
    onSearch: (e: FormEvent<HTMLFormElement>) => void;
    disabled?: boolean;
})=>{
    return (
    <>
        <h2 className="font-extrabold text-xl">{title}</h2>
        <Form onSubmit={onSearch}>
            <Input
                placeholder="Search for a recipe"
                type="text"
                value={query}
                handleChange={(e: FormEvent<HTMLInputElement>) => 
                    setQuery(e.currentTarget.value)
                }
                className="bg-zinc-900 py-1 px-4 w-full shadow-xl placeholder:text-sm
                hover:bg-zinc-800 cursor-pointer focus:outline-none my-3"
                disabled={disabled}
            />
        </Form>
    </>
    );
}