import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';
import { loadMyAds } from 'src/app/store/gun-ad/gun-ad.actions';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css'],
})
export class MyAdsComponent implements OnInit {
  user: User | null = null;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadMyAds());
    this.store.subscribe((state) => {
      this.user = state.user.user;
    });
  }
}
