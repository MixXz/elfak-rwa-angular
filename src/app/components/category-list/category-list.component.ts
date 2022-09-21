import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from 'src/app/store/category/category.actions';
import { selectCategoryList } from 'src/app/store/category/category.selector';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  name = new FormControl('', [Validators.required]);
  id?: string;
  edit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CategoryListComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectCategoryList)
      .subscribe((categories) => (this.categories = categories));
  }

  handleEdit(id: string) {
    this.id = id;
    const category = this.categories.find((c) => c.id == id);
    if (category) {
      this.name.setValue(category.name);
      this.edit = true;
    }
  }

  handleSubmit() {
    if (this.edit && this.id) {
      if (this.name.value && this.name.value.length > 0)
        this.store.dispatch(
          updateCategory({ id: this.id, name: this.name.value })
        );
        
      this.name.reset();
      this.edit = false;
    } else if (this.name && this.name.value?.length) {
      this.store.dispatch(createCategory({ name: this.name.value }));
      this.name.reset();
    }
  }

  handleDelete(id: string) {
    if (id && id.length) {
      this.store.dispatch(deleteCategory({ id: id }));
    }
  }

  handleCancel() {
    this.edit = false;
    this.name.reset();
  }

  handleClose() {
    this.dialogRef.close();
  }
}
