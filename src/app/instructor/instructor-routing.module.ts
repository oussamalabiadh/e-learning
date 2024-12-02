import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { HomeInstructorComponent } from './components/home-instructor/home-instructor.component';
import { ChatInstructorComponent } from './components/chat-instructor/chat-instructor.component';
import { CoursesInstructorComponent } from './components/courses-instructor/courses-instructor.component';
import { RoomInstructorComponent } from './components/room-instructor/room-instructor.component';
import { CategoryinstructorComponent } from './components/categoryinstructor/categoryinstructor.component';
import { CategoryinstructorDetailsComponent } from './components/categoryinstructor-details/categoryinstructor-details.component';
import { SubCategoryinstructorComponent } from './components/sub-categoryinstructor/sub-categoryinstructor.component';
import { CoursesInstructorDetailsComponent } from './components/courses-instructor-details/courses-instructor-details.component';
import { PublicationInstructorComponent } from './components/publication-instructor/publication-instructor.component';


const routes: Routes = [
  {path:'',component:InstructorComponent,children:[
    {path:'' , redirectTo:'home',pathMatch:'full'},
    {path:'home', component : HomeInstructorComponent, title:'home'},
    {path:'category', component :CategoryinstructorComponent, title:'category'},
    {path:'publication', component :PublicationInstructorComponent, title:'category'},
    {path:'category/:id', component :CategoryinstructorDetailsComponent, title:'categoryDetails'},
    {path:'subcategory/:id', component :SubCategoryinstructorComponent, title:'subcategorydetails'},
    {path:'courses', component:CoursesInstructorComponent , title:'courses'},
    {
      path: 'coursesInstructorDetails/:id',
      component: CoursesInstructorDetailsComponent,
      title:'coursesDetails'
    },
    {path:'chat',component:ChatInstructorComponent, title:'chat'},
    {path:'room', component:RoomInstructorComponent , title:'Room'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
