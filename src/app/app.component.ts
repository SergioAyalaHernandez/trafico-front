import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-trafico';

  isMobile: boolean = false;
  isCollapsed: boolean = false;

  ngOnInit(): void {
    this.checkIfMobile();
  }

  // Método para verificar si la pantalla es móvil
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  // Comprobación si el ancho de la pantalla es menor que el tamaño de un dispositivo móvil (ej. 768px)
  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  // Método para alternar el estado del sidebar
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
