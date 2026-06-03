import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue){
    const [value, setValue] = useState(() =>{
        const saveValue = localStorage.getItem(key);

        if(saveValue){
            return JSON.parse(saveValue);
        }

        return initialValue;
    });

    useEffect(() =>{
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    },[key,value]);

    return [value,setValue];
}

export default useLocalStorage;