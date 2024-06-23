import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  newCostomerFormGroup! : FormGroup;

  constructor(private fb : FormBuilder,private customerservice:CustomerService,private router:Router) {}

    ngOnInit(): void {
    this.newCostomerFormGroup=this.fb.group({
        name : this.fb.control(null,[Validators.required]),
        email:this.fb.control(null,[Validators.email,Validators.required])
    });
    }

  handleSaveCustomers() {
   let customer:Customer=this.newCostomerFormGroup.value;
   this.customerservice.saveCustomer(customer).subscribe({
     next: data=>{
       alert("Customer saved !");
       this.router.navigateByUrl("/customers")

     },
     error :  err=>
     {console.log(err);}
   });


  }
}
