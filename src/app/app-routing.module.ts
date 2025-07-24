import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MarcaComponent} from "./modules/dashboard/marca/marca.component";
import {ModeloComponent} from "./modules/dashboard/modelo/modelo.component";
import {PersonasComponent} from "./modules/dashboard/personas/personas.component";
import {VehiculoComponent} from "./modules/dashboard/vehiculo/vehiculo.component";
import {UnidadtransitoComponent} from "./modules/dashboard/unidadtransito/unidadtransito.component";
import {AgentetransitoComponent} from "./modules/dashboard/agentetransito/agentetransito.component";
import {InfraccionComponent} from "./modules/dashboard/infraccion/infraccion.component";
import {BalanceComponent} from "./modules/dashboard/balance/balance.component";

const routes: Routes = [
  {
    path: 'marca',
    component: MarcaComponent
  },
  {
    path: 'modelo',
    component: ModeloComponent
  },
  {
    path: 'personas',
    component: PersonasComponent
  },
  {
    path: 'vehiculos',
    component: VehiculoComponent
  },
  {
    path: 'unidad-transito',
    component: UnidadtransitoComponent
  },
  {
    path: 'agente-transito',
    component: AgentetransitoComponent
  },
  {
    path: 'infraccion-transito',
    component: InfraccionComponent
  },
  {
    path: 'balance',
    component: BalanceComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
