import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@Angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddNoteComponent } from './components/note/add-note/add-note.component';
import { EditNoteComponent } from './components/note/edit-note/edit-note.component';
import { NoteComponent } from './components/note/note/note.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';
import { TaskComponent } from './components/task/task/task.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { UserService } from './services/user/user.service';

const noteRoutes:Routes = [
  {
    path: 'notes', component:NoteComponent
  },
  {
    path: 'notes/add-note', component:AddNoteComponent
  },
  {
    path: 'note/edit/:id', component:EditNoteComponent
  }
];

const taskRoutes:Routes = [
  {
    path: 'tasks', component:TaskComponent
  },
  {
    path: 'tasks/add-task', component:AddTaskComponent
  },
  {
    path: 'task/edit/:id', component:EditTaskComponent
  }
];

const userRoutes:Routes = [
  {
    path: '', redirectTo:'settings', pathMatch:'full'
  },
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

const calendarRoutes:Routes = [
  {
    path: 'calendar', component:CalendarComponent
  }
];

FullCalendarModule.registerPlugins([
  dayGridPlugin
]);

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
    SettingsComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(noteRoutes),
    RouterModule.forRoot(taskRoutes),
    RouterModule.forRoot(userRoutes),
    RouterModule.forRoot(calendarRoutes),
    FullCalendarModule,
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
