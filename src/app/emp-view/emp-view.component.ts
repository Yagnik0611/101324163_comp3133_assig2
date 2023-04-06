import { Component,Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
const GET_EMPLOYEE_BY_ID_QUERY = gql`
  query GetEmployeeByID($id: ID!) {
    getEmployeeByID(id: $id) {
      id
      firstname
      lastname
      email
      gender
      salary
    }
  }
`;
@Component({
  selector: 'app-emp-view',
  templateUrl: './emp-view.component.html',
  styleUrls: ['./emp-view.component.scss']
})
export class EmpViewComponent implements OnInit {
  empData:any
 

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private _coreService: CoreService
  ) {
    
  }

  ngOnInit(): void {
    if (this.data.id){
      const id  = this.data.id
      this.getEmployeeDetail(id)
    
    }
    
    
  }

  getEmployeeDetail(id: string) {
    this.apollo.watchQuery({
      query: GET_EMPLOYEE_BY_ID_QUERY,
      variables: { id }
    }).valueChanges.subscribe(({data, loading}) =>{
      
      this.empData = data
      this.empData = this.empData.getEmployeeByID
      // this.empData = result.data.getEmployeeByID;
    });
  }
  
  //get mision details
  // getEmployeeDetail(id:any) {


  //   console.log("asdf")
  //   this._empService.viewEmployee(id).subscribe({
  //     next: (res) => {
  //       console.log(res)
  //       this.empData = res;
  //       console.log(this.empData)
  //     },
  //     error: (err: any) => {
  //       console.error(err);
  //     },
  
  //   })
  // }
}

  

