import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { NavbarInstructorComponent } from './components/navbar-instructor/navbar-instructor.component';
import { HomeInstructorComponent } from './components/home-instructor/home-instructor.component';
import { ChatInstructorComponent } from './components/chat-instructor/chat-instructor.component';
import { RoomInstructorComponent } from './components/room-instructor/room-instructor.component';
import { CoursesInstructorComponent } from './components/courses-instructor/courses-instructor.component';
import { AsidebarInstructorComponent } from './components/asidebar-instructor/asidebar-instructor.component';
import { CategoryinstructorComponent } from './components/categoryinstructor/categoryinstructor.component';
import { CategoryinstructorDetailsComponent } from './components/categoryinstructor-details/categoryinstructor-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubCategoryinstructorComponent } from './components/sub-categoryinstructor/sub-categoryinstructor.component';
import { CoursesInstructorDetailsComponent } from './components/courses-instructor-details/courses-instructor-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { PublicationInstructorComponent } from './components/publication-instructor/publication-instructor.component';
@NgModule({
  declarations: [
    InstructorComponent,
    NavbarInstructorComponent,
    HomeInstructorComponent,
    ChatInstructorComponent,
    RoomInstructorComponent,
    CoursesInstructorComponent,
    AsidebarInstructorComponent,
    CategoryinstructorComponent,
    CategoryinstructorDetailsComponent,
    SubCategoryinstructorComponent,
    CoursesInstructorDetailsComponent,
    PublicationInstructorComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule, 
     MatExpansionModule,
    MatListModule,
  ]
})
export class InstructorModule { }
