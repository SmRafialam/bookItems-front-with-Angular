import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { SearchfilterPipe } from '../../pipes/searchfilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-lists',
  standalone: true,
  imports: [CommonModule,SearchfilterPipe,NgxPaginationModule,ToastrModule],
  templateUrl: './book-lists.component.html',
  styleUrl: './book-lists.component.css'
})
export class BookListsComponent implements OnInit{
  bookLists: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 20;
  searchTerm: string = '';
  p: number = 1;
  
  constructor(private bookService: BooksService,private router:Router, private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.getAllBokks();

    this.bookService.currentSearchTerm.subscribe((term)=>{
      this.searchTerm = term;
      this.getAllBokks(); 
    })
  }

  getAllBokks(){
    this.isLoading = true;
    this.bookService.getBooks(this.currentPage, this.limit).pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load book lists. Please try again later.';
        console.error('Error fetching book lists:', error);
        this.isLoading = false;
        return of({ items: [], total: 0 });
      })
    ).subscribe((data:any) => {
      this.bookLists = data.items;
      this.totalPages = Math.ceil(data.total / this.limit);
      this.isLoading = false;
      console.log("Here is all the Book lists:", data);
      console.log("Total Pages:", this.totalPages);
    });
  }

  onEdit(id:any){
    // console.log(id);
    this.router.navigate(["/edit-book",id]);
  }

  onDelete(id:any){
    // console.log(id);
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).pipe(
        catchError(error => {
          this.errorMessage = 'Failed to delete the book. Please try again.';
          console.error('Error deleting book item:', error);
          this.toastr.error('Book item not deleted','Error');
          return of(null); 
        })
      ).subscribe((result) => {
        if (result !== null) {
          this.bookLists = this.bookLists.filter(item => item.id !== id);
          this.getAllBokks();
          this.toastr.warning('Book item deleted','Remove');
        }
      });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllBokks();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllBokks();
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getAllBokks();
    }
  }

  pageChange(page: number) {
    console.log('Changing to page:', page);
    // this.p = page;
    this.currentPage = page;
    this.getAllBokks();
  }

}
