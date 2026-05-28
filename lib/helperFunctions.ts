export const limitString = (str: string | undefined) => {
    if(str !== undefined && str.length > 15){
        return str.slice(0,15) + "...";
    }
    return str;
}