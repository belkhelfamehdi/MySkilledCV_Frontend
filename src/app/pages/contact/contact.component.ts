import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contact = {
    name: '',
    email: '',
    message: ''
  };

  successMessage = '';
  errorMessage = '';

  sendMessage() {
    if (this.contact.name && this.contact.email && this.contact.message) {
      this.successMessage = 'Your message has been sent!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill out all fields.';
      this.successMessage = '';
    }
  }

}
