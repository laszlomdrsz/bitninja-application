import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../classes/post';
import { Comment } from '../classes/comment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post: Post;

  comments: Comment[] = [];

  expanded = false;
  loading = true;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  opened(): void {
    this.expanded = true;
    this.loading = true;
    this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${this.post.id}/comments`).subscribe(
      comments => {
        this.comments = comments.reverse();
        this.loading = false;
      }, error => {
        this.loading = false;
        this.messageService.error('There was a problem loading the comments.');
      }
    );
  }

  closed(): void {
    this.expanded = false;
  }

}
