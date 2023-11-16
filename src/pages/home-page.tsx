import { FC } from "react";
import { useRandomCatData } from "../api/use-random-data-cats.hook";
import { CatCard } from "../components/cat-card.component";
import { Button } from "../components/button.component";

interface HomeProps { }

export const HomePage: FC<HomeProps> = ({ }) => {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useRandomCatData();
    
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Oooops, something wrong happened</div>
    }

    if (!data) {
        return <div>No cats...</div>
    }
    return (
        <div className="p-5">
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap gap-5 justify-around pb-8">
                    {data.pages.map((page) => {
                        return page.map(item => (
                            <CatCard key={item.id} url={item.url} idCat={item.id} />
                        ))}
                    )}
                </div>
                <Button
                    isLoading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    color="gray"
                >
                    Load more
                </Button>
            </div>
        </div>
    )
}