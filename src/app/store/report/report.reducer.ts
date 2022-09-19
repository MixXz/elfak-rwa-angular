import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Report } from 'src/app/models/report';
import * as ReportActions from './report.actions';

export interface ReportState extends EntityState<Report> {}

const adapter: EntityAdapter<Report> = createEntityAdapter<Report>();

export const initialState: ReportState = adapter.getInitialState({});

export const reportReducer = createReducer(
  initialState,
  on(ReportActions.loadReportsSuccess, (state: ReportState, { reports }) => {
    return adapter.setAll(reports, state);
  }),
  on(ReportActions.createReportSuccess, (state: ReportState, { report }) => {
    return adapter.addOne(report, state);
  }),
  on(ReportActions.checkReportSuccess, (state: ReportState, { id }) => {
    return adapter.removeOne(id, state);
  })
);
