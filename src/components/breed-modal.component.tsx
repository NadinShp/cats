import { FC, useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { useSearchParams} from "react-router-dom";
import { Carousel } from "flowbite-react";
import { filterSearchParams } from "../utils/searchParams";
import {useRandomCatData} from "../api/use-random-data-cats.hook"

interface BreedModalProps {}

export const BreedModal: FC<BreedModalProps> = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const breed = searchParams.get('breed');

    const { data, isLoading} = useRandomCatData({ breedId: breed });

    useEffect(() => {
        setIsOpen(!!breed);
    }, [breed])

    const closeModal = () => {
        const paramsObject = filterSearchParams(searchParams, 'breed');
        setSearchParams(paramsObject);
    }
    const handleImgClick = (id: string) => {
        setSearchParams((prev) => ({
            ...prev,
            cat: id,
        })
    )}
    return (
        <>
            <Modal show={isOpen} onClose={closeModal} className="h-500 w-500">
                <Modal.Header>{isLoading? 'Loading...' : data?.pages[0][0].breeds.map((b)=>b.name).join(', ') || "Cute kitty"}</Modal.Header>
                <Modal.Body>
                    <div className="h-300 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel>
                            {data?.pages.map((cat) => {
                                return cat.map((infoCat) => (
                                    <img src={infoCat.url} alt={infoCat.id} key={infoCat.id} onClick={()=>handleImgClick(infoCat.id) } />
                                ))
                            })}
                        </Carousel>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}