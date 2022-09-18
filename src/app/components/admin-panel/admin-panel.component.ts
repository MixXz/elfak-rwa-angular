import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Report } from 'src/app/models/report';
import { loadReports } from 'src/app/store/report/report.actions';
import { selectReportList } from 'src/app/store/report/report.selector';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  reports: Report[] | null = null;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadReports());
    this.store.select(selectReportList).subscribe((reports) => {
      this.reports = reports;    console.log(this.reports);
    });

  }
}
