import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../core/api";
import { SingleCat } from "./dto/get-single-cat-data.dto";

interface GetSingleCatParams {
  id: string | null;
}

const getSingleCat = async({ id }: GetSingleCatParams) => {
    const { data } = await api.get<SingleCat>(`https://api.thecatapi.com/v1/images/${id}`);
    return data;
}

export const useSingleCatData = ({id}: GetSingleCatParams) => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['getSingleCat'],
        queryFn: () => getSingleCat({ id: id || '' }),
        enabled: false,
    });

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    return { data, isLoading, isError };
}