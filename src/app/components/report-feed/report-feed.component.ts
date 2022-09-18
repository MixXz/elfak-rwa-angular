import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Report } from 'src/app/models/report';
import { selectReportList } from 'src/app/store/report/report.selector';

@Component({
  selector: 'app-report-feed',
  templateUrl: './report-feed.component.html',
  styleUrls: ['./report-feed.component.css'],
})
export class ReportFeedComponent implements OnInit {
  reports: Report[] | null = null;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectReportList).subscribe((reports) => {
      this.reports = reports;
    });
  }
}
