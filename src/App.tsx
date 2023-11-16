import { FC } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import "./index.css";
import { HomePage } from './pages/home-page';
import {BreedsPage} from './pages/breeds-page'
import { CatModal } from "./components/cat-modal.component";
import { BreedModal } from "./components/breed-modal.component";
import { FavoritePage } from "./pages/favorite-page";
import { Header } from "./components/header.component";

interface AppProps { }

export const App: FC<AppProps> = ({ }) => {
  return( 
    <BrowserRouter>
      <Header />
      <CatModal />
      <BreedModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breeds" element={<BreedsPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  )
}

