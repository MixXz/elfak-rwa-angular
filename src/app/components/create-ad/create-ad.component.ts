import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css'],
})
export class CreateAdComponent implements OnInit {
  dataFormGroup = this._formBuilder.group({
    titleControl: ['', Validators.required],
  });

  imagesFormControl = new FormControl<String | null>(null, Validators.required);

  categoryControl = new FormControl<String | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  categories: Category[] = [];

  previews: string[] = [];
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  imageInfos?: Observable<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.categories = state.category.categories;
    });
  }

  handleSelectedFiles(event: any) {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.previews, event.previousIndex, event.currentIndex);
  }
}
