import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from "../core/api";
import { GetRandomCatsDto } from "./dto/get-random-cats.dto";

interface getRandomCatsParams {
    pageParam: number,
    breedId?: string | null,
}

const getRandomCats = async ({ pageParam = 0, breedId}: getRandomCatsParams) => {
    const { data } = await api.get<GetRandomCatsDto>('https://api.thecatapi.com/v1/images/search',
        {
            params: {
                pageParam,
                limit: 10,
                breed_ids: breedId,
            }
        }
    );

    return data;
}
interface useRandomBreedParams {
    breedId?: string | null
}
export const useRandomCatData = ({breedId}: useRandomBreedParams={}) => {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        {   
            queryKey: [`getRandomCats-${breedId || 'random'}`],
            queryFn:({pageParam}) => getRandomCats({pageParam, breedId}),
            initialPageParam: 0,
            getNextPageParam: () => Date.now(),
        }
    );
    return { data, isLoading, isError, fetchNextPage, isFetchingNextPage }
}