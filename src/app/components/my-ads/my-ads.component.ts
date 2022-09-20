import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';
import { loadMyAds } from 'src/app/store/gun-ad/gun-ad.actions';
import { editProfile } from 'src/app/store/user/user.actions';
import { environment } from 'src/environments/environment';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css'],
})
export class MyAdsComponent implements OnInit {
  user: User | null = null;
  baseUrl: string = environment.api + '/';

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadMyAds());
    this.store.subscribe((state) => {
      this.user = state.user.user;
    });
  }

  handleEdit() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: 'auto',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (!res) return;

      const formData: FormData = new FormData();

      formData.append('image', res.image);
      formData.append('firstName', res.firstName);
      formData.append('lastName', res.lastName);
      formData.append('address', res.address);
      formData.append('phone', res.phone);

      this.store.dispatch(editProfile({ userData: formData }));
    });
  }
}
