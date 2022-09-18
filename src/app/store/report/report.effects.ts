import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';
import * as ReportActions from './report.actions';

@Injectable()
export class ReportEffects {
  constructor(
    private action$: Actions,
    private reportService: ReportService
  ) {}

  loadCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReportActions.loadReports),
      mergeMap(() =>
        this.reportService.getAll().pipe(
          map((reports: Report[]) => {
            return ReportActions.loadReportsSuccess({ reports });
          }),
          catchError(({ error }) => {
            return of({ type: 'err' });
          })
        )
      )
    )
  );
}
