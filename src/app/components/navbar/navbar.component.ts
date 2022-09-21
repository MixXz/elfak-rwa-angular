import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { loadCategories } from 'src/app/store/category/category.actions';
import { selectCategoryList } from 'src/app/store/category/category.selector';
import { logoutUser } from 'src/app/store/user/user.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  categories: Category[] = [];

  baseUrl: string = environment.api + '/';

  constructor(private store: Store<AppState>, public router: Router) {}
  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.store.subscribe((state) => (this.user = state.user.user));
    this.store
      .select(selectCategoryList)
      .subscribe((categories) => (this.categories = categories));
  }

  handleLog() {
    if (this.user) {
      this.store.dispatch(logoutUser());
    } else {
      this.router.navigate(['login']);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
