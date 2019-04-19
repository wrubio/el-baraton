import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  subsCategories: any;
  categories: any;

  constructor(public serviceCategories: CategoriesService) { }

  ngOnInit() {
    this.subsCategories = this.serviceCategories.getCategories().subscribe((result: any) => {
      this.categories = result;
      console.log(this.categories);
    });
  }

}
