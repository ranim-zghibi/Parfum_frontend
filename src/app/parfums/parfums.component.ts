import { Component, OnInit } from '@angular/core';
import { Parfum } from '../models/parfum.model';
import { ParfumService } from '../parfum.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-parfums',
  templateUrl: './parfums.component.html',
  styleUrl: './parfums.component.css'
})
export class ParfumsComponent implements OnInit {
  parfums?: Parfum[];
  constructor(private parfumService: ParfumService, public authService: AuthService) {

  }
  ngOnInit(): void {
    this.parfumService.listeParfum().subscribe(parfums => {
      console.log(parfums);
      this.parfums = parfums;
    });

  }
  chargerParfums() {
    this.parfumService.listeParfum().subscribe(parfums => {
      console.log(parfums);
      this.parfums = parfums;
    });
  }
  supprimerParfum(p: Parfum) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.parfumService.supprimerParfum(p).subscribe(() => {
        console.log("Parfum supprimé");
        this.chargerParfums();
      });
  }
}
