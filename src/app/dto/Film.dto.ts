import { FilmType } from "../enum/filmType";
import { Prices } from "../enum/prices";

export type Film = {
    id: string;
    title: string;
    genre: string;
    filmType: FilmType;
    priceType: Prices;
    description: string;
    available: boolean;
    rentalDuration: number; // in days
    releaseDate: Date;
}