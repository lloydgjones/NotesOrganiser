import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(body:any){
    return this.httpClient.post(environment.apiUrl+'/user/register', body,{
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    return this.httpClient.post(environment.apiUrl+'/user/login', body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getUser(){
    return this.httpClient.get(environment.apiUrl+'/user', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  logout(){
    return this.httpClient.get(environment.apiUrl+'/user/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
}
