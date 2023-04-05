

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';



const SIGNUP_MUTATION = gql`
mutation Signup($username: String!, $email: String!, $password: String!) {
  signup(username: $username, email: $email, password: $password) {
    user {
      username
      email
      password
    }
    msg
  }
}
`;




import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  singUpForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
  
    private _coreService: CoreService,
    
    private apollo: Apollo
  ) {
    this.singUpForm = this._fb.group({
      
      email: '',
      password:""
    });
  }

  ngOnInit(): void {
    
  }

  onFormSubmit() {
    this.apollo
    .watchQuery({
      query: LOGIN_QUERY,
      variables: this.singUpForm.value
    })
    .valueChanges
    .pipe(
      catchError((error: any) => {
        console.error(error);
        const errorMessage = error.message ? error.message : 'Invalid credentials';
        this._coreService.openSnackBar(errorMessage);
        console.log(errorMessage)
        return EMPTY;
      })
    )
    .subscribe((val: any) => {
      this._coreService.openSnackBar('Employee added successfully');
      console.log(val);
    });
  
        // this._empService.addEmployee(this.singUpForm.value).subscribe({
        //   next: (val: any) => {
        //     this._coreService.openSnackBar('Employee added successfully');
        //     this._dialogRef.close(true);
        //   },
        //   error: (err: any) => {
        //     console.error(err);
        //   },
        // });
      
      }
  
}
