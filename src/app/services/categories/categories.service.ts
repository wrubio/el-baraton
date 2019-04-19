import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { categoriesUrl } from '../../config/services-urls';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
    console.log('services is ready to use');
  }

  getCategories() {
    return this.http.get(categoriesUrl);
  }
}
