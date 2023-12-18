import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerComponent implements OnInit {
  form: FormGroup;
  customerForm: Customer = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
  };
  title: string = 'Add';
  constructor(
    private customerService: CustomersService,
    private router: Router,
    public fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      if (id) {
        this.getById(id);
        this.title = 'Update';
      }
    });
  }
  onFormSubmit() {
    if (this.title == 'Add') {
      this.customerService.create(this.form.value).subscribe(() => {
        this.router.navigate(['/all-customers']);
      });
    } else {
      this.update();
    }
  }
  getErrorMessage(controlName) {
    if (this.form.controls[controlName].hasError('required')) {
      return 'Required field';
    } else if (this.form.controls[controlName].hasError('email')) {
      return 'Not a valid email';
    } else if (
      controlName === 'phoneNumber' &&
      this.form.controls[controlName].invalid
    ) {
      return 'Not a valid phone';
    } else return 'Not a valid';
  }
  getById(id: number) {
    this.customerService.getById(id).subscribe((data) => {
      this.form.patchValue({
        id: data['id'],
        firstName: data['firstName'],
        lastName: data['lastName'],
        email: data['email'],
        phoneNumber: data['phoneNumber'],
      });
    });
  }
  update() {
    new Promise((resolve, reject) => {
      this.customerService.update(this.form.value).subscribe((res) => {
        resolve(res);
      });
    }).then((res) => {
      this.router.navigate(['/all-customers']);
    });
  }
}
