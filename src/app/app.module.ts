import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParfumsComponent } from './parfums/parfums.component';
import { AddParfumComponent } from './add-parfum/add-parfum.component';
import { FormsModule } from '@angular/forms';
import { UpdateParfumComponent } from './update-parfum/update-parfum.component';
import { HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { UpdateMarquesComponent } from './update-marques/update-marques.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


@NgModule({
  declarations: [
    AppComponent,
    ParfumsComponent,
    AddParfumComponent,
    UpdateParfumComponent,
    RechercheParMarqueComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeMarquesComponent,
    UpdateMarquesComponent,
    LoginComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientXsrfModule,
    HttpClientModule,
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
