export const Button = ({title, handleClick, type, className, ...rest}: 
    {title: string;
    handleClick?: () => void;
    type?: "button" | "submit" | "reset";
    [key: string]: unknown;})=>{
    return <button
        {...rest}
        onClick={handleClick}
        type={type? type: "button"}
        className={`${className}`}
    >
        {title}
    </button>;
};