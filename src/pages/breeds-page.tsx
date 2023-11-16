import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "flowbite-react";
import { useGetBreedData } from "../api/use-breed-data-hook";

interface BreedPageProps {}

export const BreedsPage: FC<BreedPageProps> = () => {
    const { data, isLoading, isError } = useGetBreedData();
    const [searchParams, setSearchParams] = useSearchParams();

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Opppppps, something is wrong</div>
    }
    if (!data) {
        return <div>No breeds list</div>
    }
    const handleBreedsBtnClick = (breedName: string) => {
        setSearchParams(prev => ({
            ...prev,
            breed: breedName.toLowerCase(),
        }));
    }
    return (
        <div className="p-5">
            <ul className="flex flex-wrap gap-3">
                {data.map((item) => (<li key={item.id}><Button onClick={()=>handleBreedsBtnClick(item.id)}>{item.name}</Button></li>))}
            </ul>
        </div>
    )
}