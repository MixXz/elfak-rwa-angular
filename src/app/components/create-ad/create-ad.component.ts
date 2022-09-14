import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { getUser } from 'src/app/auth/user-context';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { createAd } from 'src/app/store/gun-ad/gun-ad.actions';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css'],
})
export class CreateAdComponent implements OnInit {
  user: User | null = getUser();

  categoryControl = new FormControl<String | null>(null, Validators.required);
  categories: Category[] = [];

  dataFormGroup = this._formBuilder.group({
    titleControl: ['', Validators.required],
    priceControl: [0],
    brandControl: ['', Validators.required],
    caliberControl: ['', Validators.required],
    descControl: ['', Validators.required],
  });

  previews: string[] = [];
  sliderPrev: string[] = [];

  selectedFiles?: any;
  selectedFileNames: string[] = [];

  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
  slideConfigSmall = { slidesToShow: 5, slidesToScroll: 5 };

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.categories = state.category.categories;
    });
  }

  handleCreate() {
    const formData = new FormData();

    if (this.selectedFiles)
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('images', this.selectedFiles[i]);
      }

    formData.append(
      'title',
      this.dataFormGroup.controls['titleControl'].value!
    );
    formData.append(
      'price',
      String(this.dataFormGroup.controls['priceControl'].value)
    );
    formData.append(
      'brand',
      this.dataFormGroup.controls['brandControl'].value!
    );
    formData.append('categoryId', <string>this.categoryControl.value);
    formData.append(
      'description',
      this.dataFormGroup.controls['descControl'].value!
    );
    formData.append(
      'caliber',
      this.dataFormGroup.controls['caliberControl'].value!
    );

     this.store.dispatch(createAd({ formData }));
  }

  handleSelectedFiles(event: any) {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.previews, event.previousIndex, event.currentIndex);
    this.sliderPrev = [];
  }

  refresh() {
    if (this.previews.length > 0) {
      this.sliderPrev = this.previews;
    } else {
      this.sliderPrev[0] = '../../../assets/common/noImage.png';
    }
  }
}
