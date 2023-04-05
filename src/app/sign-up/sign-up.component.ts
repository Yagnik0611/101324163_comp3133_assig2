

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

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
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  singUpForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _coreService: CoreService,
    
    private apollo: Apollo
  ) {
    this.singUpForm = this._fb.group({
      username:"",
      email: '',
      password:""
    });
  }

  ngOnInit(): void {
    
  }

  onFormSubmit() {
    const { username, email, password } = this.singUpForm.value;
    this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        username,
        email,
        password,
      },
    })
    .pipe(
      catchError((error: any) => {
        console.error(error);
        const errorMessage = error.message ? error.message : 'username';
       
        const usernameIndex = errorMessage.indexOf("username: ");
const emailIndex = errorMessage.indexOf("email: ");
const username = errorMessage.slice(usernameIndex + 10, emailIndex).trim();
const email = errorMessage.slice(emailIndex + 7).trim();
console.log(username, email);
const errorString = `Username error: ${username}  Email error: ${email}`;
this._coreService.openSnackBar(errorString);
        return EMPTY;
      })
    )
    .subscribe((val: any) => {
      this._coreService.openSnackBar('User added successfully');
      this.router.navigateByUrl('/login');
    });
  
       
      
      }
  
}
