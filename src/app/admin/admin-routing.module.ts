import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { CoursesComponent } from './components/courses/courses.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { PublicationComponent } from './components/publication/publication.component';
import { RoomComponent } from './components/room/room.component';
import { ChatComponent } from './components/chat/chat.component';
import { FavComponent } from './components/fav/fav.component';
import { SavedComponent } from './components/saved/saved.component';
import { AdminComponent } from './admin.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { InstructorByIdComponent } from './components/instructor-by-id/instructor-by-id.component';

const routes: Routes = [
  { path: '', component: AdminComponent , children:[
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    { path: 'category-management', component: CategoryComponent },
    { path: 'course-management', component: CoursesComponent },
    { path: 'instructor-management', component: InstructorComponent },
    {path:'instructor-management/:id', component :InstructorByIdComponent, title:'instructorDetails'},

    { path: 'user-management', component: UserAdminComponent },
    { path: 'publication-management', component: PublicationComponent },
    { path: 'room', component: RoomComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'favorites', component: FavComponent },
    { path: 'saved', component: SavedComponent },
    { path: '**', redirectTo: '' } // Wildcard route for a 404 page or redirect
  ]}, // Default route

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
