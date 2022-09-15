import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { GunAd } from 'src/app/models/gun-ad';
import { User } from 'src/app/models/user';
import { deleteAd, loadAds } from 'src/app/store/gun-ad/gun-ad.actions';
import { selectAdById } from 'src/app/store/gun-ad/gun-ad.selector';

@Component({
  selector: 'app-gun-ad-details',
  templateUrl: './gun-ad-details.component.html',
  styleUrls: ['./gun-ad-details.component.css'],
})
export class GunAdDetailsComponent implements OnInit {
  user: User | null = null;

  adId!: number;
  ad?: GunAd;
  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
  slideConfigSmall = { slidesToShow: 5, slidesToScroll: 5 };
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadAds());
    this.route.params.subscribe((params) => (this.adId = params['adId']));
    this.store.select(selectAdById(this.adId)).subscribe((item) => {
      this.ad = item;
    });
    this.store.subscribe((state) => {
      this.user = state.user.user;
    });
  }

  handleDelete() {
    if (this.ad !== undefined && this.ad !== null)
      this.store.dispatch(deleteAd({ adId: Number(this.ad.id) }));
  }
}
