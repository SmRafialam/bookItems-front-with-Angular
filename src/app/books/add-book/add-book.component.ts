import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{

  booksForm!: FormGroup;
  isEdit:boolean = false;
  bookId: any;

  constructor(private fb:FormBuilder, private bookService: BooksService,private router:Router,private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.booksForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
    })

    // Check if we're editing an existing post
    this.bookId = this.route.snapshot.paramMap.get('id');
        if (this.bookId) {
          this.isEdit = true;
          this.bookService.getBook(this.bookId).subscribe((data) => {
            this.booksForm.patchValue({
              title: data.title,
              author: data.author,
              content: data.content,
              price: data.price
            });
          });
        }
  }

  onSubmitBookList(){
    // console.log(this.booksForm.value);

    if(this.booksForm.invalid){
      return;
    }

    if (this.isEdit && this.bookId) {
      this.bookService.updateBook(this.bookId, this.booksForm.value).subscribe((data) => {
        console.log('Book item updated:', data);
        this.router.navigate(['/book-lists']); 
      },
      (error) => {
        console.error('Error updating book:', error);
      });
    } else {
      this.bookService.createBook(this.booksForm.value).subscribe((data) => {
        console.log('New book created successfully:', data);
        this.router.navigate(['/book-lists']); 
      },
      (error) => {
        console.error('Error creating book:', error);
      });
    }
  }
}
