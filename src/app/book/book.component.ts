import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookService } from '../Services/book-service.service';
import { Book } from '../Models/Book';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  BookList?: Observable<Book[]>;
  BookList1?: Observable<Book[]>;
  bookForm: any;
  bookId = "";

  // For reading more content
  readMoreContent: string = '';

  // Pagination
  // Initialize variables for pagination system
  // ----------------------------------------------------

   /**
   * Constructor
   * @param formbulider FormBuilder instance
   * @param bookService BookService instance
   * @param router Router instance
   * @param jwtHelper JwtHelperService instance
   * @param toastr ToastrService instance
   * @param modalService NgbModal instance
   */
  constructor(private formbulider: FormBuilder,
    private bookService: BookService, private router: Router,
    private jwtHelper: JwtHelperService, private toastr: ToastrService,
    private modalService: NgbModal) { }

  // Initialize form and fetch data on page load
  // -------------------------------------------
  ngOnInit() {
    this.bookForm = this.formbulider.group({
      Title: ['', [Validators.required]],
      Author: ['', [Validators.required]],
      ShortDescription: ['', [Validators.required]],
      PublishDate: ['', [Validators.required]]
    });
    this.getBookList();
    this.clearForm();

  }

  // Fetch the list of books from the service
  getBookList() {
    this.BookList1 = this.bookService.getBookList();
    this.BookList = this.BookList1;
  }

  // Add a new book
  PostBook(book: Book) {
    const book_Master = this.bookForm.value;
    this.bookService.postBookData(book_Master).subscribe(
      () => {
        this.getBookList();
        this.bookForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
    this.clearForm();
  }

  // Get book details for editing
  BookDetailsToEdit(bookId: string) {
    this.bookService.getBookDetailsById(bookId).subscribe(bookResult => {
      this.bookId = bookResult.id;
      this.bookForm.controls['Title'].setValue(bookResult.title);
      this.bookForm.controls['ShortDescription'].setValue(bookResult.shortDescription);
      this.bookForm.controls['Author'].setValue(bookResult.author);
      this.bookForm.controls['PublishDate'].setValue(bookResult.publishDate);
    });
    this.clearForm();
  }

  // Update book data
  UpdateBook(bookData: Book) {
    bookData.id = this.bookId;
    this.bookService.updateBook(bookData.id, bookData).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.bookForm.reset();
      this.getBookList();
    });
  }

  // Delete a book
  DeleteBook(bookId: string) {
    if (confirm('Do you want to delete this book?')) {
      this.bookService.deleteBookById(bookId).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getBookList();
      });
    }
  }

  // Open the add book modal
  openAddBookModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'addBookModalLabel' });
  }

  // Open the read more modal
  openReadMoreModal(content: string) {
    this.readMoreContent = content;
  }
  // Clear the form
  clearForm(): void {
    this.bookForm.reset();
  }

  // Log out the user
  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

  // Check if the user is authenticated
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}
