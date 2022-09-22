import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css'],
})
export class ReportDialogComponent implements OnInit {
  textControl = new FormControl('');

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  handleClose() {
    this.dialogRef.close();
  }
  
  handleReport() {
    if (this.textControl.value !== '' && this.textControl.value) {
      this.data = this.textControl.value;
      this.dialogRef.close(this.data);
    }
  }
}
