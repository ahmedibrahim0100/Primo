import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../Models/customer.model';
import { CustomersService } from '../../Services/customers.service';


@Component({
  selector: 'app-customers-selector',
  templateUrl: './customers-selector.component.html',
  styleUrls: ['./customers-selector.component.css']
})
export class CustomersSelectorComponent implements OnInit {

  selectedCustomers :  Customer[];
   @Output()
   gotCustomers : EventEmitter<Customer[]> = new EventEmitter<Customer[]>();
   @Output()
   cannotGetCustomers : EventEmitter<any> = new EventEmitter();

  constructor(
    private customersService : CustomersService
  ) { }

  ngOnInit(): void {
  }

  getCustomersByIdentifier(identifier) {
    this.customersService.getCustomersByIdentifier(identifier).then(
      res => {
        if(res)
        this.selectedCustomers = res as Customer[];
        }
    ).then(() => {
      if(this.selectedCustomers && this.selectedCustomers.length > 0){
        this.gotCustomers.emit(this.selectedCustomers);
      }else{
        this.cannotGetCustomers.emit();
      }
    });
  }

}
