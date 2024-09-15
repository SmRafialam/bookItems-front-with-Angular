import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { BookHeaderComponent } from "./books/book-header/book-header.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BookHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'bookItems-front';
  showHeader: boolean = true;

  constructor(private router:Router){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.showHeader = !(event.url === '/login' || event.url === '/registration');
    });
  }

  ngOnInit(): void {
    // const currentUrl = this.router.url;
    // this.showHeader = !(currentUrl === '/login' || currentUrl === '/registration')
  }
}
