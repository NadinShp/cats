import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({ }) => {
    interface NavigationProps {
        isActive: boolean,
    }
    const getStyles = ({ isActive }: NavigationProps) => {
         return [
            isActive ? "text-sky-600" : "text-grey-900",
        ].join(' ');
    }
    return (
        <header className="p-5">
            <nav>
                <ul className=" flex gap-5">
                    <li><NavLink to="/" className={({isActive})=>getStyles({isActive})}>Home</NavLink></li>
                    <li><NavLink to="/breeds" className={({isActive})=>getStyles({isActive})}>Breed</NavLink></li>
                    <li><NavLink to="/favorites" className={({isActive})=>getStyles({isActive})}>Favorites</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};