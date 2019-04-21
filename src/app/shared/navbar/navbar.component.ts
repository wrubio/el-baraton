import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

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
