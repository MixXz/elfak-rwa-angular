import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  name = new FormControl('', [Validators.required]);
  id?: number;
  edit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CategoryListComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.categories = state.category.categories;
    });
  }

  handleEdit(id: string) {
    this.id = Number(id);
    const category = this.categories.find((c) => c.id == id);
    if (category) {
      this.name.setValue(category.name);
      this.edit = true;
    }
  }

  handleSubmit() {
    if (this.edit) {
      console.log(this.id);
      console.log(this.name.value);
      this.name.reset();
      this.edit = false;
    } else if(this.name && this.name.value?.length) {
      console.log(this.name.value);
      this.name.reset();
    }
  }

  handleDelete(id: string) {
    console.log("deleteing" + id);
  }

  handleClose() {
    this.dialogRef.close();
  }
}
