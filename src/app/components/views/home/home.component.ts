import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CreateModalComponent } from '../../shared/create-modal/create-modal.component';

export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  age: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Edgar', weight: 80.0, age: '26' },
  { id: 2, name: 'Helio', weight: 75.5, age: '22' },
  { id: 3, name: 'José', weight: 79.3, age: '18' },
  { id: 4, name: 'Ana', weight: 55.5, age: '16' },
  { id: 5, name: 'Paula', weight: 63, age: '20' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'weight', 'age', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '250px',
      data:
        element === null
          ? {
              id: null,
              name: '',
              weight: null,
              age: '',
            }
          : {
            id: element.id,
            name: element.name,
            weight: element.weight,
            age: element.age
          }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((p) => p.id).includes(result.id)) {
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter((p) => p.id !== id);
  }
}
