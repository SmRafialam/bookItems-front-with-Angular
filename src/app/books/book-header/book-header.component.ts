import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-header.component.html',
  styleUrl: './book-header.component.css'
})
export class BookHeaderComponent {

}
