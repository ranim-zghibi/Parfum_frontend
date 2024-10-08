import { Component, Input, OnInit, Output,EventEmitter, } from '@angular/core';
import { Marque } from '../models/marque.model';

@Component({
  selector: 'app-update-marques',
  templateUrl: './update-marques.component.html',
  styles: ``
})
export class UpdateMarquesComponent implements OnInit {
  @Input()
  marque! : Marque;

  @Input()
  ajout!:boolean;

  @Output()
  marqueUpdated = new EventEmitter<Marque>();
  
  @Output()
  cancelEvent = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
    console.log(this.marque);

  }
  saveMarque() {
    this.marqueUpdated.emit(this.marque);

  }
  cancel() {
    this.cancelEvent.emit();
  }

}
