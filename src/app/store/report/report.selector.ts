import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Report } from 'src/app/models/report';

export const selectReportFeature = createSelector(
  (state: AppState) => state.report,
  (report) => report
);

export const selectReportIds = createSelector(
  selectReportFeature,
  (report) => report.ids
);

export const selectReportList = createSelector(selectReportFeature, (report) =>
  report.ids
    .map((id) => report.entities[id])
    .filter((report) => report != null)
    .map((report) => <Report>report)
);
