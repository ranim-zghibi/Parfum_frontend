import { Component, OnInit } from '@angular/core';
import { Parfum } from '../models/parfum.model';
import { ParfumService } from '../parfum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Marque } from '../models/marque.model';

@Component({
  selector: 'app-update-parfum',
  templateUrl: './update-parfum.component.html',
  styles: ``
})
export class UpdateParfumComponent implements OnInit {
  currentParfum = new Parfum();
  marques !: Marque[];
  newIdMarque !: number;
  constructor(private activatedRoute: ActivatedRoute,
    private parfumService: ParfumService,
    private router: Router) { }
  ngOnInit() {
    this.parfumService.listeMarque().subscribe(marques => {
      console.log(marques);
      this.marques = marques._embedded.marques;
    });
    this.parfumService.consulterParfum(this.activatedRoute.snapshot.params['id']).subscribe(
      parf => {
        this.currentParfum = parf;
        this.newIdMarque = this.currentParfum.marque?.id!;
      }
    );


  }
  updateParfum() {
    this.currentParfum.marque = this.marques.find(marque => marque.id == this.newIdMarque)!;
    this.parfumService.updateParfum(this.currentParfum).subscribe(prod => {
      this.router.navigate(['parfums']);
    }
    );
  }
}


