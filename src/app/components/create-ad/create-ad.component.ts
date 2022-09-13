import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';
import { createAd } from 'src/app/store/gun-ad/gun-ad.actions';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css'],
})
export class CreateAdComponent implements OnInit {
  categoryControl = new FormControl<String | null>(null, Validators.required);

  categories: Category[] = [];

  dataFormGroup = this._formBuilder.group({
    titleControl: ['', Validators.required],
    priceControl: [0, Validators.max(10000)],
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

  imagesSelected: boolean = false;

  file: File | null = null;

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
    const gunAdData = {
      categoryId: this.categoryControl.value,
      title: this.dataFormGroup.controls['titleControl'].value,
      price: this.dataFormGroup.controls['priceControl'].value,
      brand: this.dataFormGroup.controls['brandControl'].value,
      caliber: this.dataFormGroup.controls['caliberControl'].value,
      desc: this.dataFormGroup.controls['descControl'].value,
    };

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
    formData.append('description', this.dataFormGroup.controls['descControl'].value!);
    formData.append(
      'caliber',
      this.dataFormGroup.controls['caliberControl'].value!
    );

    this.store.dispatch(createAd({ formData }));
  }

  handleSelectedFiles(event: any) {
    this.file = event.target.files[0];

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

    // const file: File | null = this.file;
    // if(file)
    //   this.store.dispatch(createAd({ file }))
    //   console.log(file);
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
