import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loadSavedAds } from 'src/app/store/gun-ad/gun-ad.actions';

@Component({
  selector: 'app-saved-ads',
  templateUrl: './saved-ads.component.html',
  styleUrls: ['./saved-ads.component.css']
})
export class SavedAdsComponent implements OnInit {

  constructor(private store: Store <AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadSavedAds());
  }

}
