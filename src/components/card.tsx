import { ReactNode } from "react";
import { IRECIPEUSER } from "../@types/index";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export const RecipeCard = ({_id, title, ingredients, note, image, description, user}: IRECIPEUSER) => {
    const navigate = useNavigate();
    const handleViewMore = (id: string) => {
        navigate("/dashboard/recipe/" + id);
    };
    return (
        <Card id={_id} title={title} image={image?.url} ingredients={ingredients} description={description} note={note}
        email={user} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMboTpuyC4wMUjq6ToQr69asPcRHzIjWjEnA&s">
            <div className="flex justify-end">
                <Button
                    title="View More"
                    handleClick={()=> handleViewMore(_id)}
                    className="bg-orange-500 text-white hover:bg-orange-600 py-1 px-2 w-[50%]"
                />
            </div>
        </Card>
    )
};

export const Card = ({id, avatar, image, description, title, email, ingredients, note, children, isFull}: {
    id: string;
    avatar: string;
    image: string;
    description: string;
    title: string;
    email: string;
    ingredients: string;
    note?: string;
    children?: ReactNode;
    isFull?: boolean;
}) => {
    return (
        <div
            key={id} className={`w-full ${isFull? "md:w-[50%]" : "md:w-[14rem]"} bg-zinc-900
            transition ease-in-out delay-150 hover:translate-x-6 hover:scale-100 duration-300 mb-4`}
        >
            <img
                src={image}
                alt={`A picture of ${title}`}
                className={`w-full ${isFull? "md:w-full" : "md:w-[14rem]"} h-full md:[10rem]
                ${isFull? "md:h-[20rem]" : "md:h-[14rem]"} object-cover`}
            />
            <div className={`p-2 bg-zinc-900 w-full ${isFull? "md:w-full" : "md:w-[14rem]"}
            h-[20rem] overflow-clip my-3`}>
                <div className="flex gap-4 items-start w-full">
                    <img
                        className="h-12 w-12 object-cover rounded-full"
                        src={avatar}
                        alt="A picture of user"
                    />
                </div>
                <div className="text-left">
                    <p className="text-orange-500 font-light">{email}</p>
                </div>
                <h2 className={`text-orange-500 font-bold my-2 text-xl
                    ${!isFull && "truncate overflow-hidden ..."}`}
                >
                    {title}
                </h2>
                <p className="text-orange-500 font-light text-sm">
                    ingredients:{" "}
                    <span className={`text-white ${!isFull && "truncate overflow-hidden ..."}`}>
                        {ingredients}
                    </span>
                </p>
                <p className={`text-white font-light text-sm my-2 ${!isFull && "truncate overflow-hidden ..."}`}>
                    {description}
                </p>
                {note && (
                    <p className="text-orange-500 font-light text-sm py-1 md:py-4">
                        note: <span className="text-white">{note}</span>
                    </p>
                )}
                {children}
            </div>
        </div>
    );
}