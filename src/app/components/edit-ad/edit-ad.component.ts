import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';
import { GunAd } from 'src/app/models/gun-ad';
import { loadSingleAd, updateAd } from 'src/app/store/gun-ad/gun-ad.actions';
import { selectAdById } from 'src/app/store/gun-ad/gun-ad.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css'],
})
export class EditAdComponent implements OnInit {
  adId: number = 0;
  ad?: GunAd;

  selectedCategory: string | null = null;
  title: string = '';
  price: number = 0;
  desc: string = '';
  caliber: string = '';
  brand: string = '';

  categories: Category[] = [];

  previews: string[] = [];
  imgPath: string = environment.api + '/';
  selectedFiles?: FileList;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.adId = params['id']));
    this.store.dispatch(loadSingleAd({ adId: this.adId }));
    this.store.subscribe((state) => {
      this.categories = state.category.categories;
    });
    this.store.select(selectAdById(this.adId)).subscribe((item) => {
      this.ad = item;

      if (this.ad) {
        this.title = this.ad.title;
        this.price = this.ad.price;
        this.brand = this.ad.brand;
        this.desc = this.ad.description;
        this.caliber = this.ad.caliber;
        this.selectedCategory = this.ad.category.id;
        this.previews = this.ad.gallery;
      }
    });
  }

  handleSaveChanges() {
    const formData = new FormData();
    let gallery: string[] = [];

    if (!this.selectedFiles) {
      this.previews.forEach((el) => {
        formData.append('gallery', el);
      });
    }

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('images', this.selectedFiles[i]);
      }
    }

    formData.append('id', String(this.ad?.id));
    formData.append('title', this.title);
    formData.append('price', String(this.price));
    formData.append('caliber', this.caliber);
    formData.append('brand', this.brand);
    formData.append('description', this.desc);
    formData.append('categoryId', String(this.selectedCategory));

    this.store.dispatch(updateAd({ formData }));
  }

  handleSelectedFiles(event: any) {
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
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.previews, event.previousIndex, event.currentIndex);
  }

  removeImg(value: string) {
    const index: number = Number(value);
    if (index !== -1) {
      this.previews.splice(index, 1);
    }
  }

  setTitle(value: string) {
    if (!value || value === '') return;
    this.title = value;
  }

  setPrice(value: string) {
    const val: number = Number(value);
    if (val < 0 || !val) return;
    this.price = val;
  }

  setBrand(value: string) {
    if (!value || value === '') return;
    this.brand = value;
  }

  setCaliber(value: string) {
    if (!value || value === '') return;
    this.caliber = value;
  }

  setDesc(value: string) {
    if (!value || value === '') return;
    this.desc = value;
  }

  setCategory(value: string) {
    this.selectedCategory = value;
  }
}
