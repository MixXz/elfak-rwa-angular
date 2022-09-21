import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { GunAd } from 'src/app/models/gun-ad';
import { Report } from 'src/app/models/report';
import { checkReport } from 'src/app/store/report/report.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  @Input() report: Report | null = null;
  imgPath: string = environment.api;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  gotoDetails() {
    this.router.navigate(['gun-ad-details/' + this.report?.gunAd?.id]);
  }

  handleChecked() {
    if (this.report) {
      this.store.dispatch(checkReport({ id: this.report.id }));
    }
  }
}
