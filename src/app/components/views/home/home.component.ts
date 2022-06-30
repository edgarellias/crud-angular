// import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PeriodicElement } from '../../models/PeriodicElement';
import { PeriodicElementService } from '../../services/periodicElement.service';

import { CreateModalComponent } from '../../shared/create-modal/create-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PeriodicElementService],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = [ 'name', 'weight', 'age', 'action'];
  dataSource!: PeriodicElement[];

  constructor(
    public dialog: MatDialog,
    public PeriodicElementService: PeriodicElementService
  ) {
    this.PeriodicElementService.getElements().subscribe(
      (data: PeriodicElement[]) => {
        this.dataSource = data;
      }
    );
  }

  ngOnInit(): void {}

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '250px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result){
        return;
      }

      const index = this.dataSource.findIndex((e) => e._id === result._id);
      if(index === -1){
        this.PeriodicElementService.createElements(result).subscribe((data: PeriodicElement) => {
          this.dataSource.push(data);
          this.table.renderRows();
}
)
} else{
  this.PeriodicElementService.editElement(result).subscribe(() => {
    this.dataSource[index] = result;
    this.table.renderRows();
  }
  )
}
  });
}

  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }

  deleteElement(_id: string): void {
    this.PeriodicElementService.deleteElement(_id).subscribe(() => {
      this.dataSource = this.dataSource.filter((p) => p._id !== _id);
    });
  }
}
