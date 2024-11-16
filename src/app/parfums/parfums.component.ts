import { Component, OnInit } from '@angular/core';
import { Parfum } from '../models/parfum.model';
import { ParfumService } from '../parfum.service';
import { AuthService } from '../auth.service';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-parfums',
  templateUrl: './parfums.component.html',
  styleUrl: './parfums.component.css'
})
export class ParfumsComponent implements OnInit {
  parfums?: Parfum[];
  apiurl:string='http://localhost:8088/parfums/api';

  constructor(private parfumService: ParfumService, public authService: AuthService) {

  }
  ngOnInit(): void {
    this.chargerParfums();
  }
  /*  chargerParfums() {
      this.parfumService.listeParfum().subscribe(parfums => {
        console.log("Parfums récupérés:", parfums); 
        this.parfums = parfums;
    
        this.parfums.forEach((parfum) => {
         
          if (parfum.image?.idImage) { 
            this.parfumService
              .loadImage(parfum.image.idImage)
              .subscribe((img: Image) => {
                console.log("Image reçue:", img);
                parfum.imageStr = 'data:' + img.type + ';base64,' + img.image;
              });
          } else {
            console.log("Pas d'image associée pour ce parfum");
          }
        });
      });
    }
    */

  chargerParfums(){
    this.parfumService.listeParfum().subscribe(prods => {
      this.parfums = prods;
      this.parfums.forEach((prod) => {
        prod.imageStr = 'data:' + prod.images[0].type + ';base64,' +
        prod.images[0].image;
      });
    });
  }
/*
  chargerParfums() {
    this.parfumService.listeParfum().subscribe(parfs => {
      this.parfums = parfs;
    });
  }

*/

  supprimerParfum(p: Parfum) {
    const conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.parfumService.supprimerParfum(p.idParfum!).subscribe(() => {
        console.log("Parfum supprimé");
        this.chargerParfums();
      });
      
    }
  }
    
}
