import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    document.getElementById('navbar').classList.add('bg-navbar');
  }

  showSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('sb-show')) {
      sidebar.classList.remove('sb-show');
      sidebar.classList.add('sb-hidden');
    } else {
      sidebar.classList.remove('sb-hidden');
      sidebar.classList.add('sb-show');
    }
  }

  home(e: HTMLElement) {
    this.router.navigate(['/home']);
  }

  shoppingCar() {
    this.router.navigate(['/shoppingCard']);
  }
}
