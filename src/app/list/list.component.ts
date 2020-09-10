import { Component, OnInit } from '@angular/core';
import { Post } from '../classes/post';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  allPosts: Post[] = [];
  currentPosts: Post[] = [];
  selectedPost: Post = null;

  postCount = 0;
  pageCount = 10;
  currentPage = 0;

  loading = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentPage = parseInt(params.get('page'), 10) || 0;
    });
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').subscribe(
      posts => {
        this.allPosts = posts.reverse();
        this.showPage(this.currentPage);
      }, error => {
        this.loading = false;
        this.messageService.error('There was a problem loading the posts.');
      }
    );
  }

  showPage(pageNumber): void {
    this.loading = true;
    this.currentPage = pageNumber;
    // URL change
    const url = `/list/${pageNumber}`;
    this.location.go(url);
    // List change
    const startIndex = pageNumber * this.pageCount;
    const endIndex = startIndex + this.pageCount;
    this.currentPosts = [];
    for (let i = startIndex; i < endIndex; i++) {
      this.currentPosts.push(this.allPosts[i]);
    }
    this.loading = false;
  }

  newPost(): void {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '300px',
    });
  }

}
