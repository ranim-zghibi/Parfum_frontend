import { Component, OnInit } from '@angular/core';
import { Parfum } from '../models/parfum.model';
import { Marque } from '../models/marque.model';
import { ParfumService } from '../parfum.service';
import { ParfumsComponent } from '../parfums/parfums.component';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styles: ``
})
export class RechercheParMarqueComponent implements OnInit {

  parfums!: Parfum[];
  IdMarq!: number;
  marques!: Marque[];
  constructor(private parfumService : ParfumService) { }

  ngOnInit(): void {
    this.parfumService.listeMarque().
      subscribe(marques => {this.marques = marques._embedded.marques;
      console.log(marques);
    });

  }

  onChange() {
    this.parfumService.rechercherParMarque(this.IdMarq).
      subscribe(parfums =>{this.parfums=parfums;});

    }

}
