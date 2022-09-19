import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';
import * as ReportActions from './report.actions';

@Injectable()
export class ReportEffects {
  constructor(
    private action$: Actions,
    private reportService: ReportService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  loadReports$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReportActions.loadReports),
      mergeMap(() =>
        this.reportService.getAll().pipe(
          map((reports: Report[]) => {
            return ReportActions.loadReportsSuccess({ reports });
          }),
          catchError(({ error }) => {
            return of({ type: error });
          })
        )
      )
    )
  );

  createReport$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReportActions.createReport),
      mergeMap(({ gunAdId, text }) =>
        this.reportService.create(gunAdId, text).pipe(
          map((report: Report) => {
            if (report) {
              this.snackBar.open('Oglas je uspešno prijavljen', 'Uredu', {
                duration: 5000,
              });
              this.router.navigate(['home']);
            }
            return ReportActions.createReportSuccess({ report });
          }),
          catchError(({ error }) => {
            return of({ type: error });
          })
        )
      )
    )
  );

  checkReport$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReportActions.checkReport),

      mergeMap(({ id }) => {
        const reportId: number = id;
        return this.reportService.delete(id).pipe(
          map(() => {
            return ReportActions.checkReportSuccess({ id: reportId });
          }),
          catchError(({ error }) => {
            return of({ type: error });
          })
        );
      })
    )
  );
}
