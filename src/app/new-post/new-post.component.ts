import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  title = '';
  body = '';

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getErrorText(control): string {
    if (!control || !control.errors) { return ''; }
    if (control.errors.required) { return 'This field is required'; }
    if (control.errors.minlength) { return `This field needs to be at least ${control.errors.minlength.requiredLength} characters long`; }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(form): void {
    if (!form.form.valid) { return; }
    this.loading = true;
    const newPost = {
      title: this.title,
      body: this.body
    };
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts/', newPost).subscribe(
      post => {
        this.loading = false;
        this.messageService.success(`Post successfully created with ID ${post.id}`);
        this.dialogRef.close();
      }, error => {
        this.loading = false;
        this.messageService.error('There was an error creating the post, please try again!');
      }
    );
  }

}
