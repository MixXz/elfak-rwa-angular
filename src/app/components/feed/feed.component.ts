import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { GunAd } from 'src/app/models/gun-ad';
import { selectAdsList } from 'src/app/store/gun-ad/gun-ad.selector';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  ads: Observable<GunAd[]> | null = of([]);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ads = this.store.select(selectAdsList);
  }
}
