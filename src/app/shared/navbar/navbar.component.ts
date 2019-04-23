import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/home') {
          document.getElementById('navbar').classList.add('bg-navbar');
        } else {
          document.getElementById('navbar').classList.remove('bg-navbar');
        }
      }
    });
  }

  ngOnInit() {
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
}
