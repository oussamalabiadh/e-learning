import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AsidebarComponent } from './components/asidebar/asidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { PublicationComponent } from './components/publication/publication.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { RoomComponent } from './components/room/room.component';
import { ChatComponent } from './components/chat/chat.component';
import { FavComponent } from './components/fav/fav.component';
import { SavedComponent } from './components/saved/saved.component';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog'; // If using dialogs
import { MatButtonModule } from '@angular/material/button'; // For buttons in dialogs
import { MatIconModule } from '@angular/material/icon'; // For icons
import { MatInputModule } from '@angular/material/input'; // For inputs if needed
import { MatCardModule } from '@angular/material/card'; // For card styling
import { MatToolbarModule } from '@angular/material/toolbar'; // For toolbar
import { MatSidenavModule } from '@angular/material/sidenav';
import { SubcategoriesDetailsComponent } from './components/subcategories-details/subcategories-details.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { InstructorByIdComponent } from './components/instructor-by-id/instructor-by-id.component'; // For sidenav


@NgModule({
  declarations: [
    AsidebarComponent,
    NavbarComponent,
    HomeComponent,
    CoursesComponent,
    PublicationComponent,
    InstructorComponent,
    RoomComponent,
    ChatComponent,
    FavComponent,
    SavedComponent,
    AdminComponent,
    CategoryComponent,
    SubcategoriesDetailsComponent,
    UserAdminComponent,
    InstructorByIdComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
