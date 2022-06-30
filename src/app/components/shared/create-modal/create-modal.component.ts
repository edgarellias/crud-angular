import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PeriodicElement } from '../../models/PeriodicElement';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit {
  isChange!: boolean;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { list: PeriodicElement[]; element?: PeriodicElement },
    public dialogRef: MatDialogRef<CreateModalComponent>
  ) {
    this.form = new FormGroup({
      _id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.isChange = !!this.data;
    if (this.isChange) {
      this.form.setValue(this.data);
    } else {
      this.form.controls['_id'].disable();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.form.value);
  }
}
