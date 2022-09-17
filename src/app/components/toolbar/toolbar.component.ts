import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { loadSearchedAds } from 'src/app/store/gun-ad/gun-ad.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;

  user: User | null = null;
  categories: Category[] | null = null;

  input: string = '';
  selectedCategory: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.user = state.user.user;
      this.categories = state.category.categories;
    });
  }

  handleSearch() {
    this.store.dispatch(
      loadSearchedAds({ input: this.input, categoryId: this.selectedCategory })
    );
  }

  setCategory(value: string) {
    this.selectedCategory = value;
  }
}
