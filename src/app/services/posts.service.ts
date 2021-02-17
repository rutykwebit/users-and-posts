import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _http:HttpClient) { }

  getPosts(){
    return this._http.get(api + 'posts');
  }

  getPostsByUser(userId:number){
    return this._http.get(api+ 'users' + '/'+userId + '/posts');
  }
}
