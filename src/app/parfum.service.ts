import { Injectable } from '@angular/core';
import { Parfum } from './models/parfum.model';
import { Marque } from './models/marque.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL, apiURLMarque } from './config';
import { MarqueWrapper } from './models/marqueWrapped.model';

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
  constructor(private http: HttpClient) {

  }
  listeParfum(): Observable<Parfum[]> {
    return this.http.get<Parfum[]>(apiURL);
  }
  ajouterParfum(parfum: Parfum): Observable<Parfum> {
    return this.http.post<Parfum>(apiURL, parfum, httpOptions);
  }
  supprimerParfum(p: Parfum) {
    const url = `${apiURL}/${p.idParfum}`;
    return this.http.delete(url, httpOptions);
  }
  consulterParfum(id: number): Observable<Parfum> {
    const url = `${apiURL}/${id}`;
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
    return this.http.put<Parfum>(apiURL, p, httpOptions);
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
  ajouterMarque(maq:Marque):Observable<Marque>{
    return this.http.post<Marque>(apiURLMarque, maq,httpOptions);
   }

   supprimerMarque(id : number) {
    const url = `${apiURLMarque}/${id}`;
    return this.http.delete(url, httpOptions);
    } 


}
