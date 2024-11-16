import { Component, OnInit } from '@angular/core';
import { Parfum } from '../models/parfum.model';
import { ParfumService } from '../parfum.service';
import { Marque } from '../models/marque.model';
import { Router } from '@angular/router';
import { Image } from '../models/image.model';


@Component({
  selector: 'app-add-parfum',
  templateUrl: './add-parfum.component.html',
  styleUrl: './add-parfum.component.css'
})
export class AddParfumComponent implements OnInit {
  newParfum = new Parfum();
  message: string = "";
  marques !: Marque[];
  newIdMarque !: number;
  newMarque !: Marque;
  uploadedImage!: File;
  imagePath: any;
  constructor(private parfumService: ParfumService,
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
  /*addParfum() {
    this.newParfum.marque = this.marques.find(marque => marque.id == this.newIdMarque)!;
    this.parfumService.ajouterParfum(this.newParfum)
      .subscribe(parfum => {
        console.log(parfum);
        this.router.navigate(['parfums']);
      });
  }*/
      /*addParfum() {
        this.parfumService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
          .subscribe((img: Image) => {
            console.log(img);

            this.newParfum.image = img;
            console.log(this.newParfum);
            this.newParfum.marque = this.marques.find(marque => marque.id == this.newIdMarque)!;
            this.parfumService.ajouterParfum(this.newParfum)
              .subscribe(parfum => {
                console.log(parfum);
                this.router.navigate(['parfums']);
              });
          });
      }*/

        /*  addParfum() {
            this.newParfum.marque= this.marques.find(cat => cat.id == this.newIdMarque)!;
            this.parfumService
              .ajouterParfum(this.newParfum)
              .subscribe((prod) => {
                this.parfumService
                  .uploadImageFS(this.uploadedImage,
                    this.uploadedImage.name, prod.idParfum!)
                  .subscribe((response: any) => { }
                  );
                this.router.navigate(['parfums']);
              });
          }
*/
addParfum() {
  this.newParfum.marque = this.marques.find(marq => marq.id == this.newIdMarque)!;
  this.parfumService
    .ajouterParfum(this.newParfum)
    .subscribe((parfum) => {
      this.parfumService
        .uploadImageProd(this.uploadedImage, this.uploadedImage.name, parfum.idParfum!)
        .subscribe((response: any) => { this.router.navigate(['parfums']); }
        );
    });
}
  
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
}
