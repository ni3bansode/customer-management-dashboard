import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AddCustomerComponent } from './add-customer.component';
import { CustomersService } from '../customers.service';
import { Customer } from '../customer';

describe('AddCustomerComponent', () => {
  let component: AddCustomerComponent;
  let fixture: ComponentFixture<AddCustomerComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockCustomerService: jasmine.SpyObj<CustomersService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);
    mockCustomerService = jasmine.createSpyObj('CustomersService', [
      'create',
      'getById',
      'update',
    ]);

    TestBed.configureTestingModule({
      declarations: [AddCustomerComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CustomersService, useValue: mockCustomerService },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCustomerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call create method on form submission when title is "Add"', () => {
    component.title = 'Add';
    const mockFormData: Customer = {
      id: 1,
      firstName: 'Nitin',
      lastName: 'B',
      email: 'nitin.b@example.com',
      phoneNumber: 1234567890,
    };
    mockCustomerService.create.and.returnValue(of(mockFormData));

    component.onFormSubmit();

    expect(mockCustomerService.create).toHaveBeenCalledWith(
      component.form.value
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/all-customers']);
  });

  it('should call update method on form submission when title is not "Add"', () => {
    component.title = 'Update';
    spyOn(component, 'update');

    component.onFormSubmit();

    expect(component.update).toHaveBeenCalled();
  });
});
