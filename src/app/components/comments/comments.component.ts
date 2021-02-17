import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { Subscription, timer } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  constructor(private _commentService:CommentsService,
              private _dataService:DataService,
              private _toast:AngularBootstrapToastsService) { }
  
  $subscriptionCommentsTimer:Subscription;
  $subscriptionComments:Subscription;
  commentsList = []
  source = timer(1, 15000);
  post;
  animation = false;

  ngOnInit() {
    this.startTimer();
  }

  /**
   * every 15 seconds refreshes the comments data from server
   */
  startTimer(){
    this.$subscriptionCommentsTimer = this.source.subscribe(val => this.getComments());
    this.$subscriptionComments = this._dataService.postEvent$.subscribe(postEmited=>{
      this.post = postEmited;
      this.$subscriptionCommentsTimer.unsubscribe();
      this.$subscriptionCommentsTimer = this.source.subscribe(val => this.getComments());
    })
  }

  getComments(){
    if(this.post){
      this._commentService.getCommentsByPost(this.post.id).subscribe((res:any[])=>{
        this.commentsList = res;
        this.animation = true;
      },error=>{
        this._toast.showSimpleToast({text:'An error occurred in the server',bodyClass:"danger"})
      })
    }
    else{
      this._commentService.getComments().subscribe((res:any[])=>{
        this.commentsList = res;
        this.animation = true;
      },error=>{
        this._toast.showSimpleToast({text:'An error occurred in the server',bodyClass:"danger"})
      })
    }
    
  }

  ngOnDestroy(){
    if(this.$subscriptionCommentsTimer){
      this.$subscriptionCommentsTimer.unsubscribe();
    }
    if(this.$subscriptionComments){
      this.$subscriptionComments.unsubscribe();
    }
  }

}
