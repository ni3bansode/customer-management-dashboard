import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-delete-dialog-customer',
  templateUrl: './delete-dialog-customer.component.html',
  styleUrls: ['./delete-dialog-customer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogCustomerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomersService
  ) {}

  ngOnInit(): void {}

  confirmDelete() {
    this.customerService.delete(this.data.id).subscribe(() => {
      this.dialogRef.close(this.data.id);
    });
  }
}
