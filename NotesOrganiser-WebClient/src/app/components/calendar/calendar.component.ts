import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Note } from 'src/app/models/note/note.model';
import { Task } from 'src/app/models/task/task.model';
import { NoteService } from 'src/app/services/note/note.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  isDoneLoading: boolean = false;
  data: any;
  notes: any;
  tasks: any;
  events: any;
  email: String;

  calendarOptions: CalendarOptions = {
    nextDayThreshold: '02:00:00',
    initialView: 'dayGridMonth',
    displayEventTime: true,
    height: "auto",
    contentHeight: "auto",
    expandRows: true,
    buttonText: {
      today: 'Today'
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      meridiem: false
    }
  };

  constructor(private _router: Router, private _user: UserService, private noteService: NoteService, private taskService: TaskService) { }

  ngOnInit(): void {
    this._user.getUser().subscribe(
      res=>this.getAccount(res),
      err=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
    this.getNoteData();
  }

  noteToEvent(note : Note){
    return {
      title: note.name,
      start: note.time.toLocaleString().replace('Z', ''),
      url: "/#/note/edit/" + note._id
    };
  }

  taskToEvent(task : Task){
    return {
      title: task.name,
      start: task.time.toLocaleString().replace('Z', ''),
      url: "/#/task/edit/" + task._id
    };
  }

  getNoteData() {
    this.noteService.getDataByUser(this.email).subscribe(
      res => {
        this.notes = Object.keys(res).map(index => { let note = res[index];
          if(note.time != null) { return this.noteToEvent(note); }
          else { return; }
        });

        this.notes = this.notes.filter(function(note) {
          return note !== undefined;
        });

        this.events = this.notes;
        this.getTaskData();
      }
    );
  }

  getTaskData() {
    this.taskService.getDataByUser(this.email).subscribe(
      res => {
        this.tasks = Object.keys(res).map(index => { let task = res[index];
          if(task.time != null) { return this.taskToEvent(task); }
          else { return; }
        });

        this.tasks = this.tasks.filter(function(task) {
          return task !== undefined;
        });

        this.calendarOptions.events = this.events.concat(this.tasks);
        this.isDoneLoading = true;
      }
    );
  }
}
