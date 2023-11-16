import { FC, MouseEventHandler } from 'react';
import { useSearchParams } from "react-router-dom";

interface CatCardProps {
    url: string;
    idCat: string;
};

export const CatCard: FC<CatCardProps> = ({ url, idCat }) => {
    const [_, setSearchParams] = useSearchParams();

    const setCatParam: MouseEventHandler<HTMLElement> = (e) => {
        e.preventDefault();

        setSearchParams({
            cat: idCat,
        })
    }
    return (
        <div onClick={setCatParam} className="w-72 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={url} alt='cat' />
            </a>
            <div className="p-5 self-center">
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Details
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    )
}