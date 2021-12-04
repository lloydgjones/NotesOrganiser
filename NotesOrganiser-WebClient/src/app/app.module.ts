import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@Angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { QuillModule } from 'ngx-quill'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoteComponent } from './note/note/note.component';
import { AddNoteComponent } from './note/add-note/add-note.component';
import { EditNoteComponent } from './note/edit-note/edit-note.component'

import { TaskComponent } from './task/task/task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component'

import { UserService } from './services/user.service';
import { SettingsComponent } from './settings/settings.component';

const appRoutes:Routes = [
  {
    path: '', redirectTo:'login', pathMatch:'full'
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'register', component:RegisterComponent
  },
  {
    path: 'settings', component:SettingsComponent
  },
  {
    path: 'notes', component:NoteComponent
  },
  {
    path: 'tasks', component:TaskComponent
  },
  {
    path: 'add-note', component:AddNoteComponent
  },
  {
    path: 'add-task', component:AddTaskComponent
  },
  {
    path: 'note/edit/:id', component:EditNoteComponent
  },
  {
    path: 'task/edit/:id', component:EditTaskComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NoteComponent,
    TaskComponent,
    AddNoteComponent,
    AddTaskComponent,
    EditNoteComponent,
    EditTaskComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    QuillModule.forRoot({
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    })
  ],
  providers: [UserService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
