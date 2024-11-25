import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  http = inject(HttpClient);

  contactForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null), // Corrected default value type
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false),
  });

  contacts$ = this.getContacts();

  onDelete(id: string) {
    this.http.delete(`http://localhost:5128/api/Contacts/${id}`)
    .subscribe({
      next: (value)=> {
        alert("Contact deleted")
        this.contacts$= this.getContacts();
      }
    })
  }

  onFormSubmit() {
    const addContactRequest = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      favorite: this.contactForm.value.favorite,
    }

    this.http.post('http://localhost:5128/api/Contacts', addContactRequest)
    .subscribe({
      next: (value)=> {
        console.log(value);
        this.contacts$= this.getContacts();
        this.contactForm.reset;
      }
    })
    
  }

  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:5128/api/Contacts');
  }
}
