import { Image } from "./image.model";
import { Marque } from "./marque.model";

export class Parfum {
    idParfum? : number;
    nomParfum ?: string;
    prixParfum ?: number;
    taille ?: number;
    marque?: Marque;
    image! : Image;
    imageStr!:string;

    images!: Image[];
    }