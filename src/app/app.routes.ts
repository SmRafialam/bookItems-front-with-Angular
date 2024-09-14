import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookListsComponent } from './books/book-lists/book-lists.component';
import { AddBookComponent } from './books/add-book/add-book.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegisterComponent
    },
    {
        path: 'book-lists',
        component: BookListsComponent
    },
    { 
        path: 'add-book', 
        component: AddBookComponent
    },
    { 
        path: 'edit-book/:id', 
        component: AddBookComponent
    }
];
