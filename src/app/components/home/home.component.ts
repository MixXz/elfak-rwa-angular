import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { loadCategories } from 'src/app/store/category/category.actions';
import { logoutUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  categories: Category[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}
  ngOnInit(): void {
    this.store.dispatch(loadCategories())
    this.store.subscribe((state) => {
      this.user = state.user.user;
    });
    this.store.subscribe((state) => {
      this.categories = state.category.categories;
    })
    console.log(this.categories);
  }

  handleLog() {
    if (this.user) {
      this.store.dispatch(logoutUser());
    }
    this.router.navigate(['login']);
  }
}
