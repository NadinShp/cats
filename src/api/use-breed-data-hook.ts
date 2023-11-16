import { useQuery } from "@tanstack/react-query";
import { api } from "../core/api";
import { GetBreedsDto } from "./dto/get-breed-cat.dto";

const getBreedList = async () => {
    const { data } = await api.get<GetBreedsDto>("https://api.thecatapi.com/v1/breeds");
    return data;
};

export const useGetBreedData = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["getBridList"],
        queryFn: getBreedList,
    });
    return {data, isLoading, isError}
}