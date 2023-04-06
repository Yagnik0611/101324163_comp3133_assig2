import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee(
    $id: String!
    $firstname: String
    $lastname: String
    $email: String
    $gender: String
    $salary: Float
  ) {
    updateEmployee(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
      gender: $gender
      salary: $salary
    ) {
      id
      firstname
      lastname
      email
      gender
      salary
    }
  }
`;

import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
const ADD_EMPLOYEE_MUTATION = gql`
  mutation AddEmployee(
    $firstname: String!
    $lastname: String!
    $email: String!
    $gender: String!
    $salary: Float!
  ) {
    addEmployee(
      firstname: $firstname
      lastname: $lastname
      email: $email
      gender: $gender
      salary: $salary
    ) {
      firstname
      lastname
      email
      gender
      salary
    }
  }
`;

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  emailError: any
  

  constructor(
    private router : Router,
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    
    private apollo: Apollo
  ) {
    this.empForm = this._fb.group({
      firstname: '',
      lastname: '',
      email: '',
      gender: '',
      salary:''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        if (this.data) {
          const updatedEmployee = {
            id: this.data.id,
            ...this.empForm.value
          };
        
        this.apollo.mutate({
          mutation: UPDATE_EMPLOYEE_MUTATION,
          variables: updatedEmployee
        }).subscribe({
              next: (val: any) => {
                this._coreService.openSnackBar('Employee detail updated!');
                this._dialogRef.close(true);
                
              },
              error: (err: any) => {
                console.error(err);
              },
            });
          }
           } else {

            this.apollo.mutate({
              mutation: ADD_EMPLOYEE_MUTATION,
              variables: this.empForm.value
            }).subscribe({
              next: (val: any) => {
                const errorData = val?.data?.addEmployee;
                console.log(errorData)
                if (errorData.email.includes('Validator failed for')) {
                
                  this._coreService.openSnackBar('Employee Email validation Failed!');
                } else {
                  this._coreService.openSnackBar('Employee added successfully');
                  this._dialogRef.close(true);
                  window.location.reload();                }
                
                console.log(val)
              },
              error: (err: any) => {
                console.error(err);
                const errorData = err?.error?.data?.addEmployee;
                if (errorData && errorData.email) {
                  this.emailError = errorData.email;
                } else {
                  this._coreService.openSnackBar('Failed to add employee');
                }
              },
            });
            
        
      }
      }
  }
}
