import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/models/report';

export const loadReports = createAction('loadReports');

export const loadReportsSuccess = createAction(
  'loadReportsSuccess',
  props<{ reports: Report[] }>()
);

export const createReport = createAction(
  'createReport',
  props<{ gunAdId: number; text: string }>()
);
export const createReportSuccess = createAction(
  'createReportSuccess',
  props<{ report: Report }>()
);
