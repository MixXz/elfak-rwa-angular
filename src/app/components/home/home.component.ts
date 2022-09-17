import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';
import { loadCategories } from 'src/app/store/category/category.actions';
import { loadAds } from 'src/app/store/gun-ad/gun-ad.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User | null = null;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.store.dispatch(loadAds());
    
    this.store.subscribe((state) => {
      this.user = state.user.user;
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
