
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';



const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        username
        email
      }
      token
    }
  }
`;




import { Apollo, gql } from 'apollo-angular';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _coreService: CoreService,
    
    private apollo: Apollo
  ) {
    this.loginForm = this._fb.group({
      
      email: '',
      password:""
    });
  }

  ngOnInit(): void {
    
  }

  onFormSubmit() {
    console.log(this.loginForm)
    this.apollo
    .watchQuery({
      query: LOGIN_QUERY,
      variables: this.loginForm.value
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
      this._coreService.openSnackBar('You Loged In successfully.');

      const token = val.data.login.token;
      localStorage.setItem('token', token);
  
      this.router.navigateByUrl('/employees');
      
     
    });
  
       
      }
  
}
