import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { loadCategories } from 'src/app/store/category/category.actions';
import { logoutUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  categories: Category[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}
  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.store.subscribe((state) => {
      this.user = state.user.user;
      this.categories = state.category.categories;
    });
  }

  handleLog() {
    if (this.user) {
      this.store.dispatch(logoutUser());
    } else {
      this.router.navigate(['login']);
    }
  }
}
