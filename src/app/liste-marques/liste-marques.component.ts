import { Component, OnInit } from '@angular/core';
import { Marque } from '../models/marque.model';
import { ParfumService } from '../parfum.service';

@Component({
  selector: 'app-liste-marques',
  templateUrl: './liste-marques.component.html',
  styles: ``
})
export class ListeMarquesComponent implements OnInit {

  marques!: Marque[];
  updatedMaq: Marque = { "id": 0, "nom": "" };
  ajout: boolean = true;

  constructor(private parfumService: ParfumService) { }

  ngOnInit(): void {
    this.chargerMarques();
  }

  chargerMarques() {
    this.parfumService.listeMarque().subscribe(marques => {
      console.log(marques);
      this.marques = marques._embedded.marques;
    });
  }

  updateMaq(maq: Marque) {
    this.updatedMaq = maq;
    this.ajout = false;
  }

  marqueUpdated(maq: Marque) {
    this.parfumService.ajouterMarque(maq).subscribe(() => {
      this.chargerMarques();
      this.reinitialiserForm();
    });
  }

  supprimerMarque(maq: Marque) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.parfumService.supprimerMarque(maq.id!).subscribe(() => {
        console.log("Marque supprimée");
        this.chargerMarques();
      });
    }
  }

  onCancel() {
    this.reinitialiserForm();
  }

  reinitialiserForm() {
    this.updatedMaq = { "id": 0, "nom": "" };
    this.ajout = true;
  }
}
