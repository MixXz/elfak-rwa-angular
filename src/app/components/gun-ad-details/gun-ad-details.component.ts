import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { GunAd } from 'src/app/models/gun-ad';
import { User } from 'src/app/models/user';
import {
  deleteAd,
  loadSingleAd,
} from 'src/app/store/gun-ad/gun-ad.actions';
import { selectAdById } from 'src/app/store/gun-ad/gun-ad.selector';
import { toggleSaveAd } from 'src/app/store/user/user.actions';
import { environment } from 'src/environments/environment';

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

  imgPath: string = environment.api + '/';
  
  constructor(private route: ActivatedRoute, private router: Router,  private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.adId = params['id']));
    this.store.dispatch(loadSingleAd({ adId: this.adId }));
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
  handleSave() {
    if (this.ad !== undefined && this.ad !== null)
      this.store.dispatch(toggleSaveAd({ adId: Number(this.ad.id) }));
  }

  handleEdit() {
    this.router.navigate(['edit-ad/' + this.ad?.id]);
  }
}
