import { Injectable } from '@angular/core';
import { Parfum } from './models/parfum.model';
import { Marque } from './models/marque.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL, apiURLMarque } from './config';
import { MarqueWrapper } from './models/marqueWrapped.model';
import { AuthService } from './auth.service';
import { Image } from './models/image.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ParfumService {



  parfums?: Parfum[];
  parfum!: Parfum;
  marques !: Marque[];

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }
  listeParfum(): Observable<Parfum[]> {
    return this.http.get<Parfum[]>(apiURL + "/all");
  }

  ajouterParfum(parfum: Parfum): Observable<Parfum> {
    return this.http.post<Parfum>(apiURL + "/addparfum", parfum);
  }
  supprimerParfum(p: Parfum) {
    const url = `${apiURL}/delparfum/${p.idParfum}`;
    return this.http.delete(url);
  }
  consulterParfum(id: number): Observable<Parfum> {
    const url = `${apiURL}/getbyid/${id}`;
    return this.http.get<Parfum>(url);
  }
  trierParfums() {
    this.parfums = this.parfums?.sort((n1, n2) => {
      if (n1.idParfum! > n2.idParfum!) {
        return 1;
      }
      if (n1.idParfum! < n2.idParfum!) {
        return -1;
      }
      return 0;
    });
  }
  updateParfum(p: Parfum): Observable<Parfum> {

    return this.http.put<Parfum>(apiURL + "/updateparfum", p);
  }
  listeMarque(): Observable<MarqueWrapper> {
    return this.http.get<MarqueWrapper>(apiURLMarque);
  }

  consulterMarque(id: number): Marque {

    return this.marques.find(m => m.id == id)!;
  }
  rechercherParMarque(idMarq: number): Observable<Parfum[]> {
    const url = `${apiURL}/parfumsmarque/${idMarq}`;
    return this.http.get<Parfum[]>(url);
  }
  rechercherParNom(nom: string): Observable<Parfum[]> {
    const url = `${apiURL}/parfumsByName/${nom}`;
    return this.http.get<Parfum[]>(url);
  }
  ajouterMarque(maq: Marque): Observable<Marque> {
    return this.http.post<Marque>(apiURLMarque, maq, httpOptions);
  }

  supprimerMarque(id: number) {
    const url = `${apiURLMarque}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    console.log("URL de l'image:", url);
    return this.http.get<Image>(url);
  }
  uploadImageProd(file: File, filename: string, idParf: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageParf'}/${idParf}`;
    return this.http.post(url, imageFormData);
  }
  supprimerImage(id: number) {
    const url = `${apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }

  uploadImageParf(file: File, filename: string, idParf:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageParf'}/${idParf}`;
    return this.http.post(url, imageFormData);
 }

 uploadImageFS(file: File, filename: string, idProd : number): Observable<any>{
  const imageFormData = new FormData();
  imageFormData.append('image', file, filename);
  const url = `${apiURL + '/image/uploadFS'}/${idProd}`;
  return this.http.post(url, imageFormData);
  }
  



}
