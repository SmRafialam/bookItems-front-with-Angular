import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './book-header.component.html',
  styleUrl: './book-header.component.css'
})
export class BookHeaderComponent {
  searchTerm: string = ''; // Property to store the search term

  constructor(private bookService:BooksService){

  }

  onSearchChange(term:string){
    console.log(term);
    this.bookService.updateSearchTerm(term);
  }

}
