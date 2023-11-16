import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../core/api";
import { GetFavoriteDto } from "./dto/get-favorite-dto";

interface getFavoriteData {
    page: number,
}

const getFavoriteCatsData = async ({page}: getFavoriteData) => {
    const { data } = await api.get<GetFavoriteDto>('https://api.thecatapi.com/v1/favourites', {
        params: {
            sub_id: "nad_shp",
            limit: 10,
            page
        }
    })
    return data;
};

export const useFavoriteCats = () => {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["getFavoriteCatsData"],
        queryFn: ({ pageParam }) => getFavoriteCatsData({ page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (_, pages) => pages.length,
    });
    return { data, isError, isLoading, fetchNextPage, isFetchingNextPage }
};

