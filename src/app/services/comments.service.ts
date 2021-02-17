import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';
//import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _http:HttpClient) { }

  getComments(){
    return this._http.get(api+'comments');
  }

  getCommentsByPost(userId:number){
    return this._http.get(api + 'posts' + '/'+userId + '/comments');
  }
}
