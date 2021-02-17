import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private _postService:PostsService,
              private _dataService:DataService) { }
  user;
  postsList = [];
  selectedPostId;
  animation = false;

  ngOnInit() {
    this.getPosts();
    this._dataService.userEvent$.subscribe(userEmited=>{
      this.user = userEmited;
      this.getPosts();
    })

    
  }

  getPosts(){
    if(this.user){
      this._postService.getPostsByUser(this.user.id).subscribe((res:any[])=>{
        this.postsList = res;
        this.animation = true;
      }, error=> {
  
      });
    }
    else{
      this._postService.getPosts().subscribe((res:any[])=>{
        this.postsList = res;
        this.animation = true;
      }, error=> {
  
      });
    }
   
  }
  postSelected(post){
    this.selectedPostId = post.id;
    this._dataService.emitPostEvent(post);
  }
}
