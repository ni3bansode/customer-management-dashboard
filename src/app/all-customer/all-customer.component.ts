import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogCustomerComponent } from '../delete-dialog-customer/delete-dialog-customer.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-all-customer',
  templateUrl: './all-customer.component.html',
  styleUrls: ['./all-customer.component.css'],
})
export class AllCustomerComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  allCustomersSource: Customer[] = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'actions',
  ];
  dataSource = new MatTableDataSource(this.allCustomersSource);
  constructor(
    private customerService: CustomersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.customerService.get().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogCustomerComponent, {
      width: '250px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.allCustomersSource.filter(
          (_) => _.id !== id
        );
      }
    });
  }
}
