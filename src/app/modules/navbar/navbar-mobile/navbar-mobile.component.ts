import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "../../../models/menu-item.model";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent implements OnInit{
  isMenuOpen = false;
  isMobile = false;
  menuItems: MenuItem[] | undefined;

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit() {
    this.checkScreenSize();
    this.menuItems = this.menuService.getMenuItems();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768; // Detectar si es móvil
  }

  toggleSubmenu(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  filterMenuItems(items: MenuItem[]): MenuItem[] {
    return items
      .map(item => ({
        ...item,
        children: item.children ? this.filterMenuItems(item.children) : undefined
      }));
  }

}
