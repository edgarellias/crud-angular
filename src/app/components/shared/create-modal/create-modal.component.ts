import { Component, OnInit, Inject } from '@angular/core';
import { PeriodicElement } from '../../views/home/home.component'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit {
  element!: PeriodicElement;
  isChange!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<CreateModalComponent>,
  ) {}

  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true;
    } else{
      this.isChange = false;
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
