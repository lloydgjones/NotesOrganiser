import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@Angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { QuillModule } from 'ngx-quill'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoteComponent } from './components/note/note/note.component';
import { AddNoteComponent } from './components/note/add-note/add-note.component';
import { EditNoteComponent } from './components/note/edit-note/edit-note.component';

import { TaskComponent } from './components/task/task/task.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SettingsComponent } from './components/user/settings/settings.component';

import { UserService } from './services/user/user.service';

const noteRoutes:Routes = [
  {
    path: 'tasks', component:TaskComponent
  },
  {
    path: 'add-task', component:AddTaskComponent
  },
  {
    path: 'task/edit/:id', component:EditTaskComponent
  }
];

const taskRoutes:Routes = [
  {
    path: 'tasks', component:TaskComponent
  },
  {
    path: 'add-task', component:AddTaskComponent
  },
  {
    path: 'task/edit/:id', component:EditTaskComponent
  }
];

const userRoutes:Routes = [
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'register', component:RegisterComponent
  },
  {
    path: 'settings', component:SettingsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NoteComponent,
    AddNoteComponent,
    EditNoteComponent,
    TaskComponent,
    AddTaskComponent,
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
    RouterModule.forRoot(noteRoutes),
    RouterModule.forRoot(taskRoutes),
    RouterModule.forRoot(userRoutes),
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
