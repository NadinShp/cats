import { FC } from "react";
import { useFavoriteCats } from "../api/use-favorites-data-hook";
import { CatCard } from "../components/cat-card.component";
import { Button } from "../components/button.component";

interface FavoritePageProps { };

export const FavoritePage: FC<FavoritePageProps> = () => {
    const { data, isError, isLoading, isFetchingNextPage, fetchNextPage } = useFavoriteCats();
    if (isLoading) {
        return (<div>Loading...</div>)
    }
    if (isError) {
        return (<div>Something is wrong</div>)
    }
    if (!data) {
        return (<div>Opppppps, you don't have any favorite cats</div>)
    }
    return (
        <div className="p-5">
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap gap-5 justify-around pb-8">
                    {data.pages.map((page) => {
                        return page.map(item => (
                            <CatCard key={item.id} url={item.image.url} idCat={item.image.id} />
                        ))}
                    )}
                </div>
                {data.pages[data.pages.length-1].length===10 &&
                    (
                    <Button
                        isLoading={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        color="gray">
                        Load more
                    </Button>
                    )
                }
            </div>
        </div>
    )
};