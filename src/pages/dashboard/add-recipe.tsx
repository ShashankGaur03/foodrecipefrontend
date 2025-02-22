import { useNavigate } from "react-router-dom";
import { DragEvent, FormEvent, useState } from "react";
import { useRecipe } from "../../hooks/index";
import { IRECIPE } from "../../@types/index";
import { Form, Input, TextArea, Button } from "../../components/index";
import { ImageUploader } from "./common/index";
import { validateImageType } from "../../utils/index";
import cogoToast from "cogo-toast";

export const AddRecipe = ()=>{
    const navigate = useNavigate();
    const {loading, addRecipe} = useRecipe();
    const [state, setState] = useState<IRECIPE>({
        title: "",
        note: "",
        description: "",
        ingredients: ""
    });
    const [image, setImage] = useState<File | null>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!image){
            console.log("Please add an image");
            return;
            // return cogoToast.error("Please add an image");
        }
        if(!state?.title || !state?.description || !state?.ingredients){
            console.log("Please fill the missing field");
            return;
            // return cogoToast.error("Please fill the missing field");
        }

        const payload = {image, ...state};
        await addRecipe(payload);
        setState({title: "", note: "", description: "", ingredients: ""});
        setImage(null);
        navigate("/dashboard/myrecipes");
    };

    const onChange = (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setState({...state, [name]: value});
    }

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        let imageFile = e.dataTransfer.files[0];
        if(!validateImageType(imageFile)){
            return cogoToast.warn("File type is wrong: ;" + imageFile.type);
        }
        setImage(imageFile);
    }

    const handleFile = (event: FormEvent<HTMLInputElement>) => {
        if(!event.currentTarget.files) return;
        const imageFile = event.currentTarget.files[0];
        if(!validateImageType(imageFile)){
            return cogoToast.warn("File type is wrong: " + imageFile.type);
        }
        setImage(imageFile);
    }

    return (
        <div className="ml-0 lg:ml-[3%] text-white">
            <h2 className="font-extrabold text-xl">Add a recipe</h2>
            <Form onSubmit={onSubmit} className="mt-3 flex flex-col gap-3 md:flex-row">
                <div className="w-full">
                    <Input
                        disabled={loading}
                        name="title"
                        placeholder="Name of the recipe:"
                        type="text"
                        handleChange={onChange}
                        className="bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none"
                    />
                    <TextArea
                        disabled={loading}
                        name="ingredients"
                        placeholder="Ingredients"
                        onChange={onChange}
                        rows={4}
                        className="bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2"
                    />
                    <TextArea
                        disabled={loading}
                        name="description"
                        placeholder="Recipe Description"
                        onChange={onChange}
                        rows={6}
                        className="bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <ImageUploader
                        handleDragOver={onDragOver}
                        handleFile={handleFile}
                        handleOnDrop={handleOnDrop}
                        name={image?.name as string}
                        className="bg-zinc-900 py-1 px-4 w-full hover:bg-zinc-800 cursor-pointer focus:outline-none"
                    />
                    <TextArea
                        disabled={loading}
                        name="notes"
                        placeholder="Notes"
                        onChange={onChange}
                        rows={4}
                        className="bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2"
                    />
                    <Button
                        disabled={loading}
                        title={loading? "Publishing..." : "Publish Recipe"}
                        className="bg-orange-500 text-white hover:bg-orange-600 py-1 px-6 w-full"
                        type="submit"
                    />
                </div>
            </Form>
        </div>
    );
}