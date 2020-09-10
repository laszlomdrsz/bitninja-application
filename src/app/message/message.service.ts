import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  error(message: string): void {
    this.snackBar.open(message, 'Close');
  }

  success(message: string): void {
    this.snackBar.open(message, null, {
      duration: 3000
    });
  }
}
