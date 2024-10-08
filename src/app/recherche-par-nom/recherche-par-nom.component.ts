import { Component, OnInit } from '@angular/core';
import { Parfum } from '../models/parfum.model';
import { ParfumService } from '../parfum.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit{


  nomParfum! : string;
  parfums!: Parfum[];
  allParfums!: Parfum[];
  searchTerm!: string;
  
  constructor(private parfumService : ParfumService) { }

  ngOnInit(): void {
    this.parfumService.listeParfum().subscribe(parfums => {
      console.log(parfums);
      this.parfums = parfums;
      });
      
  }

  rechercherParfums(){
    this.parfumService.rechercherParNom(this.nomParfum).
    subscribe(parfums => {
      console.log(parfums);
      this.parfums=parfums;});
  }

  onKeyUp(filterText : string){
    this.parfums = this.allParfums.filter(item =>
    item.nomParfum?.toLowerCase().includes(filterText));
    }
    
}
