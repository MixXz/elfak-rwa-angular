import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { GunAd } from 'src/app/models/gun-ad';
import { selectAdById } from 'src/app/store/gun-ad/gun-ad.selector';

@Component({
  selector: 'app-gun-ad-details',
  templateUrl: './gun-ad-details.component.html',
  styleUrls: ['./gun-ad-details.component.css'],
})
export class GunAdDetailsComponent implements OnInit {
  adId!: string;
  ad? :GunAd;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.adId = params['adId']));
    this.store.select(selectAdById(Number(this.adId)))
    .subscribe((item) => {
      this.ad = item;
    });
    console.log(this.ad);
  }
}

