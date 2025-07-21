import {Component, EventEmitter, HostListener, OnInit, Output, Input} from '@angular/core';
import {Router} from "@angular/router";
import {MenuService} from "../../../services/menu.service";
import {MenuItem} from "../../../models/menu-item.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() collapsed = false;
  @Output() collapseChange = new EventEmitter<boolean>();
  isMobile = false;
  menuItems: MenuItem[] | undefined;

  constructor( private router: Router, private menuService: MenuService) {}

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

  filterMenuItems(items: MenuItem[]): MenuItem[] {
    return items
      .map(item => ({
        ...item,
        children: item.children ? this.filterMenuItems(item.children) : undefined
      }));
  }

}
