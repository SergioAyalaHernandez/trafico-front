
import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuItem[] = [
    { icon: 'home', label: 'Inicio', route: '/home' },
    {
      icon: 'user',
      label: 'Autos',
      children: [
        { icon: 'profile', label: 'Marca', route: 'marca'},
        { icon: 'profile', label: 'Modelos', route: 'modelo' },
        { icon: 'profile', label: 'Vehículos', route: 'vehiculos'},
      ]
    },
    {
      icon: 'user',
      label: 'Personas',
      children: [
        { icon: 'admin', label: 'Personas', route: 'personas' },

      ]
    },
    {
      icon: 'user',
      label: 'Transito',
      children: [
        { icon: 'admin', label: 'Unidad de transito', route: 'unidad-transito' },
        { icon: 'admin', label: 'Agente de transito', route: 'agente-transito' },
      ]
    },
    {
      icon: 'user',
      label: 'Multas',
      children: [
        { icon: 'admin', label: 'Generar infracción', route: 'infraccion-transito' },
      ]
    },
    {
      icon: 'user',
      label: 'Cifras',
      children: [
        { icon: 'admin', label: 'Balance', route: 'balance' },
      ]
    }
  ];

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
}
