import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  data: any;
  email: String;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    aspectRatio: 2.8,
    buttonText: {
      today: 'Today'
    }
  };

  constructor(private _router: Router, private _user: UserService) { }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
  }
}
