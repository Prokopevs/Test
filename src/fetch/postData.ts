import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { IData } from "../Components/Table";

export const postData = async (data: IData, setData:Dispatch<SetStateAction<IData[]>>, 
    newData: IData[], setButtonDisabled: (...arg: boolean[]) => void) => {
    try {
        setButtonDisabled(true);
        const res = await axios.post(
            "https://634868a70484786c6e9933f8.mockapi.io/accounts", {...data}
        )
        setData(newData);
    } catch {
        console.log("error");
    } finally {
        setButtonDisabled(false);
    }
}