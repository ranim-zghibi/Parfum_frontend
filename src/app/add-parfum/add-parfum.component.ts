import { Component, OnInit } from '@angular/core';
import { Parfum } from '../models/parfum.model';
import { ParfumService } from '../parfum.service';
import { Marque } from '../models/marque.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-parfum',
  templateUrl: './add-parfum.component.html',
  styleUrl: './add-parfum.component.css'
})
export class AddParfumComponent implements OnInit {
  newParfum = new Parfum();
  message : string = "";
  marques !: Marque[];
  newIdMarque !: number;
  newMarque !: Marque;
  constructor(private parfumService: ParfumService , 
    private router: Router) {
    
    }
    
  ngOnInit(): void {
    this.parfumService.listeMarque().
    subscribe(marq => {
      this.marques = marq._embedded.marques;
      console.log(marq);
    }
    );
  
  }
  addParfum(){
    this.newParfum.marque = this.marques.find(marque => marque.id == this.newIdMarque)!;
    this.parfumService.ajouterParfum(this.newParfum)
    .subscribe(parfum => {
      console.log(parfum);
      this.router.navigate(['parfums']);
    });
  }

}
