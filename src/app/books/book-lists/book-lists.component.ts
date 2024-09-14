import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-lists.component.html',
  styleUrl: './book-lists.component.css'
})
export class BookListsComponent implements OnInit{
  bookLists: any[] = [];

  constructor(private bookService: BooksService,private router:Router){

  }

  ngOnInit(): void {
    this.getAllBokks();
  }

  getAllBokks(){
    this.bookService.getBooks().subscribe((data)=>{
      console.log("Here is all the Book lists:", data);
      this.bookLists = data;
    })
  }

  onEdit(id:any){
    // console.log(id);
    this.router.navigate(["/edit-book",id]);
  }

  onDelete(id:any){
    // console.log(id);
    this.bookService.deleteBook(id).subscribe(()=>{
      this.bookLists = this.bookLists.filter(item=> item.id !== id);
      this.getAllBokks();

    }, error => {
      console.log('Error deleting book item:', error);
    });
  }


}
