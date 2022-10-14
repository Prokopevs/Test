import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { IData } from "../Components/Table";

export const getData = async (setData: (Dispatch<SetStateAction<IData[]>>), setLoading: (...arg: boolean[]) => void) => {
    try {
        setLoading(true);
        const res = await axios.get(
            "https://634868a70484786c6e9933f8.mockapi.io/accounts"
        )
        setData(res.data);
    } catch {
        console.log("error");
    } finally {
        setLoading(false);
    }
}