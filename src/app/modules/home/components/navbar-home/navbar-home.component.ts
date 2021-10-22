import { AfterViewInit, HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss']
})
export class NavbarHomeComponent implements OnInit {
  toggleNavbar = true;
  scrollFragment = null;
  @Input() component: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.scrollFragment = this.component;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    var sh = screen.height * 0.7;
    if ((document.documentElement.scrollTop < sh)) {
      this.scrollFragment = 'inicio';
    } else if ((document.documentElement.scrollTop > sh) && (document.documentElement.scrollTop < 2 * sh)) {
      this.scrollFragment = 'sobre-nosotros';
    } else if ((document.documentElement.scrollTop > 2 * sh) && (document.documentElement.scrollTop < 3 * sh)) {
      this.scrollFragment = 'portafoliorones';
    } else if ((document.documentElement.scrollTop > 3.2 * sh)) {
      this.scrollFragment = 'contactanos';
    }
  }

  hideMenu() {
    if (!this.toggleNavbar) {
      this.toggleNavbar = true;
    }
  }

}
