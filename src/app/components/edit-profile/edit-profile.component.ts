import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);

  imagePreview: string | null = null;
  selectedImage: File | null = null;

  baseUrl: string = environment.api + '/';
  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.user = state.user.user;
      if (this.user) {
        this.firstName.setValue(this.user.firstName);
        this.lastName.setValue(this.user.lastName);
        this.phone.setValue(this.user.phone);
        this.address.setValue(this.user.address);
      }
    });
  }

  handleEdit() {
    const editedUser = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      address: this.address.value,
      phone: this.phone.value,
      image: this.selectedImage,
    };
    this.dialogRef.close(editedUser);
  }

  handleSelectedImage(event: any) {
    this.selectedImage = event.target.files[0];
    this.imagePreview = null;

    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.imagePreview = null;
  }

  handleClose() {
    this.dialogRef.close();
  }
}
