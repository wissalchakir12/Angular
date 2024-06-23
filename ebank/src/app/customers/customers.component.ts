import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  searchFormGroup!:FormGroup;
  errormessage!:string;


  constructor(private customerService: CustomerService, private fb: FormBuilder) {}

  ngOnInit() {

    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });

   this.customers=this.customerService.getCustomers().pipe(
     catchError(err=> {
       this.errormessage=err.message;
       return throwError(err);
     })
   );
  }

  handleSearchCustomers() {
   let kw=this.searchFormGroup.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err=> {
        this.errormessage=err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp)=>{
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1);
            return data;
          })
        )
      }
    })
  }
}
