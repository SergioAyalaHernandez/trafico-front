import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcaComponent } from './modules/dashboard/marca/marca.component';
import { NavbarComponent } from './modules/navbar/navbar/navbar.component';
import { NavbarMobileComponent } from './modules/navbar/navbar-mobile/navbar-mobile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModeloComponent } from './modules/dashboard/modelo/modelo.component';
import { VehiculoComponent } from './modules/dashboard/vehiculo/vehiculo.component';
import { PersonasComponent } from './modules/dashboard/personas/personas.component';

@NgModule({
  declarations: [
    AppComponent,
    MarcaComponent,
    NavbarComponent,
    NavbarMobileComponent,
    ModeloComponent,
    VehiculoComponent,
    PersonasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
