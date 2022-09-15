import { Component, OnInit } from '@angular/core';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;

  user: User | null = null;
  categories: Category[] | null = null;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.user = state.user.user;
      this.categories = state.category.categories;
    });
  }

}
