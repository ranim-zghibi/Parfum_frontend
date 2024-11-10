import { Component, OnInit } from '@angular/core';
import { Parfum } from '../models/parfum.model';
import { ParfumService } from '../parfum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Marque } from '../models/marque.model';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-update-parfum',
  templateUrl: './update-parfum.component.html',
  styles: ``
})
export class UpdateParfumComponent implements OnInit {
  currentParfum = new Parfum();
  marques !: Marque[];
  newIdMarque !: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private parfumService: ParfumService,
    private router: Router) { }
  ngOnInit() {
    this.parfumService.listeMarque().
      subscribe(marqs => {
        this.marques= marqs._embedded.marques;
      });
    this.parfumService.consulterParfum(this.activatedRoute.snapshot.params['id'])
      .subscribe(prod => {
        this.currentParfum = prod;
        this.newIdMarque = prod.marque?.id!;
      });
  }
/*
updateParfum() {
  this.currentParfum.marque = this.marques.find(marque => marque.id == this.newIdMarque)!;

  if (this.isImageUpdated) {
    this.parfumService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.currentParfum.image = img;
        this.parfumService
          .updateParfum(this.currentParfum)
          .subscribe((prod) => {
            this.router.navigate(['parfums']);
          });
      });
  }
  else {
    this.parfumService
      .updateParfum(this.currentParfum)
      .subscribe(prod => {
        this.router.navigate(['parfums']);
      }
      );

  }

}
*/

updateParfum() {
  this.currentParfum.marque = this.marques.find(cat => cat.id ==
  this.newIdMarque)!;
  this.parfumService
  .updateParfum(this.currentParfum)
  .subscribe((prod) => {
  this.router.navigate(['parfums']);
  });
  }

onImageUpload(event: any) {
  if (event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated = true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
  }
}

onAddImageParfum() {
  this.parfumService
    if (this.currentParfum.idParfum !== undefined) {
      this.parfumService
        .uploadImageProd(this.uploadedImage, this.uploadedImage.name, this.currentParfum.idParfum)
        .subscribe((img: Image) => {
          this.currentParfum.images.push(img);
        });
    } else {
      console.error('idParfum is undefined');
    }
  }

  supprimerImage(img: Image){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.parfumService.supprimerImage(img.idImage).subscribe(() => {
    //supprimer image du tableau currentProduit.images
    const index = this.currentParfum.images.indexOf(img, 0);
    if (index > -1) {
    this.currentParfum.images.splice(index, 1);
    }
    });
    }

}


