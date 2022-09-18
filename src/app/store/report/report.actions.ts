import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/models/report';

export const loadReports = createAction('loadReports');

export const loadReportsSuccess = createAction(
  'loadReportsSuccess',
  props<{ reports: Report[] }>()
);
