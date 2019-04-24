import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/service.index';
import { slideOutLeftOnLeaveAnimation, slideInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    slideOutLeftOnLeaveAnimation({ anchor: 'leave', duration: 400, delay: 100}),
    slideInRightOnEnterAnimation({ anchor: 'enter', duration: 400, delay: 100})
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  subsCategories: any;
  categories: any;
  subLevels: any;
  showCategory: number;
  arrayCategory: any;
  nameCategory: string;
  levelID: string;
  nameLevel: string;

  constructor(public serviceCategories: CategoriesService, private router: Router) {
    this.subsCategories = this.serviceCategories.getCategories().subscribe((result: any) => {
      this.categories = result.categories;
    });
  }

  ngOnInit() {
    this.subLevels = [{ id: 0, name: 'name'}];
    this.showCategory = 0;
  }

  hasSublevels(levelShow: number, e: HTMLElement) {
    if (this.arrayCategory[0].sublevels !== undefined) {
      this.subLevels = this.arrayCategory[0].sublevels;
      this.levelID = e.getAttribute('data-levelID');
      this.nameLevel = e.getAttribute('data-nameCategory');
      this.showCategory = levelShow;
    } else {
      this.showLevelItems(e);
    }
  }

  findSublevels(e: HTMLElement) {

    const liElement = e.closest('li');
    this.nameCategory = liElement.getAttribute('data-nameCategory');
    let levelShow = 0;

    if (this.showCategory === 0) {
      this.arrayCategory = this.categories.filter((c: any) => c.name === this.nameCategory);
      levelShow = 1;
      this.hasSublevels(levelShow, liElement);
    } else {
      this.arrayCategory = this.subLevels.filter((c: any) => c.name === this.nameCategory);
      levelShow = this.showCategory === 1 ? 2 : 1;
      this.hasSublevels(levelShow, liElement);
    }

  }

  showLevelItems(e: HTMLElement) {
    const levelID = e.getAttribute('data-levelID');
    const sidebar = document.getElementById('sidebar');

    let nameCategoty = e.getAttribute('data-nameCategory').replace(/\s+/g, '');
    nameCategoty = nameCategoty.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    this.router.navigate([`/category/${nameCategoty}&sublevel${levelID}`]);

    sidebar.classList.remove('sb-show');
    sidebar.classList.add('sb-hidden');
    this.showCategory = 0;
  }

  ngOnDestroy() {
    this.subsCategories.unsubscribe();
  }
}
