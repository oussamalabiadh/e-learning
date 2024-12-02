import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { PublicModule } from './public/public.module';
import { InstructorModule } from './instructor/instructor.module';
import {HttpClientModule  } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseDialogComponent } from './shared/components/response-dialog/response-dialog.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; // If using dialogs
import { MatButtonModule } from '@angular/material/button'; // For buttons in dialogs
import { MatIconModule } from '@angular/material/icon'; // For icons
import { MatInputModule } from '@angular/material/input'; // For inputs if needed
import { MatCardModule } from '@angular/material/card'; // For card styling
import { MatToolbarModule } from '@angular/material/toolbar'; // For toolbar
import { MatSidenavModule } from '@angular/material/sidenav'; // For sidenav
@NgModule({
  declarations: [
    AppComponent,
    ResponseDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    UserModule,
    PublicModule,
    InstructorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
