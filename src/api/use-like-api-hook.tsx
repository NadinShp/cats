import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../core/api";
import { GetFavoriteDto } from "./dto/get-favorite-dto";
import { LikeCatDto } from "./dto/like-cat.dto";

interface CreateFavoriteParams {
imageId: string;
}

const createFavorite = async ({ imageId }: CreateFavoriteParams) => {
const { data } = await api.post<LikeCatDto>(
    "https://api.thecatapi.com/v1/favourites",
    {
    image_id: imageId,
    sub_id: "nad_shp",
    }
);

return data;
};

interface DeleteFavoriteParams {
favoriteId: number;
}

const deleteFavorite = async ({ favoriteId }: DeleteFavoriteParams) => {
const { data } = await api.delete(
    `https://api.thecatapi.com/v1/favourites/${favoriteId}`
);

return data;
};

interface GetSingleFavoriteParams {
imageId: string;
}

const getSingleFavorite = async ({ imageId }: GetSingleFavoriteParams) => {
const { data } = await api.get<GetFavoriteDto>(
    "https://api.thecatapi.com/v1/favourites",
    {
    params: {
        image_id: imageId,
        sub_id: "nad_shp",
    },
    }
);

return data;
};

interface UseLikeApiParams {
catId: string | null;
}

export const useLikeApi = ({ catId }: UseLikeApiParams) => {
    const [favoriteId, setFavoriteId] = useState<number | null>(null);
    const client = useQueryClient();
    const [isSingleFavoriteLoading, setIsSingleFavoriteLoading] = useState(false);

useEffect(() => {
    setFavoriteId(null);

    const fetchSingleFavorite = async () => {
    if (!catId) {
        return;
    }

    setIsSingleFavoriteLoading(true);

    try {
        const data = await client.fetchQuery({
        queryKey: [`single-favorite-${catId}`],
        queryFn: () => getSingleFavorite({ imageId: catId }),
        });

        setFavoriteId(data[0].id);
        } catch (e) {
            //
        } finally {
        setIsSingleFavoriteLoading(false);
        }
    };
    fetchSingleFavorite();
}, [catId]);

const likeMutation = useMutation({mutationFn: createFavorite});

const like = async () => {
    if (!catId) {
    return;
    }

    const { id } = await likeMutation.mutateAsync({ imageId: catId });
    setFavoriteId(id);
};

    const deleteMutation = useMutation({ mutationFn: deleteFavorite });

const dislike = async () => {
    if (!catId || favoriteId === null) {
    return;
    }

    await deleteMutation.mutateAsync({ favoriteId });

    setFavoriteId(null);
};

const isLiked = favoriteId !== null;

  const isLoading =
    likeMutation.isPending ||
    deleteMutation.isPending ||
    isSingleFavoriteLoading;

return { like, dislike, isLiked, isLoading };
};