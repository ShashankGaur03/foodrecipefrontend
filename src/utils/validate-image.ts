export const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/JPG",
    "image/JPEG",
    "image/GIF",
    "image/gif",
    "image/png",
    "image/PNG"
];

export const validateImageType = (value: File) => {
    if(value){
        return SUPPORTED_FORMATS.includes(value.type);
    }
}