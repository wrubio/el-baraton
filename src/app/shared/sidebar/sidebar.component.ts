import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/service.index';
import { bounceInRightOnEnterAnimation, bounceOutLeftOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    bounceOutLeftOnLeaveAnimation({ anchor: 'leave'}),
    bounceInRightOnEnterAnimation({ anchor: 'enter'})
  ]
})
export class SidebarComponent implements OnInit {

  subsCategories: any;
  categories: any;
  subLevels: any;
  showCategory: number;
  arrayCategory: any;

  constructor(public serviceCategories: CategoriesService) {
    this.subsCategories = this.serviceCategories.getCategories().subscribe((result: any) => {
      this.categories = result.categories;
    });
  }

  ngOnInit() {
    this.subLevels = [{ id: 0, name: 'name'}];
    this.showCategory = 0;
  }

  hasSublevels(levelShow: number) {
    if (this.arrayCategory[0].sublevels !== undefined) {
      this.subLevels = this.arrayCategory[0].sublevels;
      this.showCategory = levelShow;
    }
  }

  findSublevels(e: HTMLElement) {

    const liElement = e.closest('li');
    const nameCategory = liElement.getAttribute('data-nameCategory');
    let levelShow = 0;

    if (this.showCategory === 0) {
      this.arrayCategory = this.categories.filter((c: any) => c.name === nameCategory);
      levelShow = 1;
      this.hasSublevels(levelShow);
    } else {
      this.arrayCategory = this.subLevels.filter((c: any) => c.name === nameCategory);
      levelShow = this.showCategory === 1 ? 2 : 1;
      this.hasSublevels(levelShow);
    }

  }

}
