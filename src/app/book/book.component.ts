import { Component , OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookService } from '../book-service.service';
import { Book } from '../Models/Book';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import * as jsonpatch from 'fast-json-patch';


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

  /**
   *
   */
  constructor(private formbulider: FormBuilder,
    private bookService: BookService,private router: Router,
    private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

    ngOnInit() {
      this.bookForm = this.formbulider.group({
        title: ['', [Validators.required]],
        bookAuthor: ['', [Validators.required]],
        bookShortDescription: ['', [Validators.required]],
        bookPublishDate: ['', [Validators.required]]
      });
      this.getBookList();
    }

    clearForm(): void {    
      this.bookForm.reset();
    }

    getBookList() {
      this.BookList1 = this.bookService.getBookList();
      this.BookList = this.BookList1;
    }

    PostBook(book: Book) {
      const book_Master = this.bookForm.value;
      this.bookService.postBookData(book_Master).subscribe(
        () => {
          this.getBookList();
          this.bookForm.reset();
          this.toastr.success('Data Saved Successfully');
        }
      );
    }

    BookDetailsToEdit(bookId: string) {
      this.bookService.getBookDetailsById(bookId).subscribe(bookResult => {
        this.bookId = bookResult.id;
        this.bookForm.controls['title'].setValue(bookResult.title);
        this.bookForm.controls['bookShortDescription'].setValue(bookResult.shortDescription);
        this.bookForm.controls['bookAuthor'].setValue(bookResult.author);
        this.bookForm.controls['bookPublishDate'].setValue(bookResult.publishDate);
      });
    }

    //
    // UpdateBook(bookData: Book) {
      
    //   bookData.id = this.bookId; 
    //   this.bookService.updateBook(bookData.id, bookData).subscribe(() => {
    //     this.toastr.success('Data Updated Successfully');
    //     this.bookForm.reset();
    //     this.getBookList();
    //   });
    // }
    //
    // PatchBook(bookData: Book) {
      
    //   bookData.id = this.bookId; 
    //   this.bookService.patchBook(bookData.id, bookData).subscribe(() => {
    //     this.toastr.success('Data Updated Successfully');
    //     this.bookForm.reset();
    //     this.getBookList();
    //   });
    // }

    PatchBook(bookData: Book){
      
      if (!this.bookId) {
        this.toastr.error('No book selected for update.');
        return;
      }
    
      // // Prepare patch data here based on the Form
      // const patchData = [];
      // const originalBook =  this.bookService.getOneBook(this.bookId)
      // // Compare each field with the original book data and create patch operations
      // if (bookData.title !== originalBook.) {
      //   patchData.push({ op: 'replace', path: '/title', value: bookData.title });
      // }
      // if (bookData.shortDescription !== this.originalBook.shortDescription) {
      //   patchData.push({ op: 'replace', path: '/shortDescription', value: bookData.shortDescription });
      // }
      // if (bookData.author !== this.originalBook.author) {
      //   patchData.push({ op: 'replace', path: '/author', value: bookData.author });
      // }
      // if (bookData.publishDate !== this.originalBook.publishDate) {
      //   patchData.push({ op: 'replace', path: '/publishDate', value: bookData.publishDate });
      // }
    
      // if (patchData.length === 0) {
      //   this.toastr.warning('No changes to apply.');
      //   return;
      // }
    
      // // Apply the patch data to the original book details
      // const patchedBook = jsonpatch.applyPatch(this.originalBook, patchData).newDocument;
    
      // // Send the updated book details to the server
      // this.bookService.patchBook(this.bookId, patchedBook).subscribe(
      //   () => {
      //     this.toastr.success('Data Updated Successfully');
      //     this.clearForm();
      //     this.getBookList();
      //   },
      //   (error) => {
      //     console.error('Error updating book:', error);
      //     this.toastr.error('Error updating book. Please try again.');
      //   }
      // );

      // if (!this.bookId) {
      //   this.toastr.error('No book selected for update.');
      //   return;
      // }

      // const patchData = jsonpatch.compare(this.bookService.getOneBook(this.bookId), bookData);

      // if (patchData.length === 0) {
      //   this.toastr.warning('No changes to apply.');
      //   return;
      // }

      // this.bookService.patchBook(this.bookId, patchData).subscribe(
      //   () => {
      //     this.toastr.success('Data Updated Successfully');
      //     this.clearForm();
      //     this.getBookList();
      //   },
      //   error => {
      //     console.error('Error updating book:', error);
      //     this.toastr.error('Error updating book. Please try again.');
      //   }
      // );

      

    }

    //

    DeleteBook(bookId: string) {
      if (confirm('Do you want to delete this book?')) {
        this.bookService.deleteBookById(bookId).subscribe(() => {
          this.toastr.success('Data Deleted Successfully');
          this.getBookList();
        });
      }
    }

    //
    Clear(book: Book){
      this.bookForm.reset();
    }

    //
    public logOut = () => {
      localStorage.removeItem("jwt");
      this.router.navigate(["/"]);
    }

    //
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
