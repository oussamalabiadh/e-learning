import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/app/shared/serices/auth.service';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-navbar-instructor',
  templateUrl: './navbar-instructor.component.html',
  styleUrls: ['./navbar-instructor.component.css']
})
export class NavbarInstructorComponent implements OnInit {
  instructorId:number=0
  instructorInfo:any
  constructor(private _AuthService:AuthService,private _InstructorService:InstructorService){}
  ngOnInit(): void {
this.instructorInfoId() 
this.getInstructorInfo()
 }
  instructorInfoId(){
   this.instructorId= this._AuthService.getUserInfo().sub
  }
  getInstructorInfo(){
this._InstructorService.getInstructorById(this.instructorId).subscribe({
  next:(response) =>{
    console.log(response);
    this.instructorInfo=response;
    
  },
  error:(err)=> {
    console.log(err);
    
  },
})
  }


}
