import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { EditAddUserComponent } from './edit-add-user/edit-add-user.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  users: User[] = [];
  page: number = 0;
  totalPages: number = 0;
  size: number = 5;
  currentPage: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService,
    private modalService: NgbModal){}

  ngOnInit(): void {
    this.getUsers();
    this.getPageNumbers();
  }

  async getUsers () {
    await this.userService.getUsers(this.page-1, this.size).then((result: any) => {
      this.users = result.content;
      this.totalPages = result.totalPages;
      this.currentPage = result.pageable.pageNumber+1;
    });
  }

  changePage(page): void {
    this.page = page.innerText;
    this.getUsers();
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  openModal(user?: User) {
    const modalRef = this.modalService.open(EditAddUserComponent, {size: 'lg'});
    console.log();

    modalRef.componentInstance.user = user;
    modalRef.result
    .then((result) => {
      if(!result) {
        this.getUsers();
      }
    })

  }

  openDeleteModal(user: User) {
    let modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.result
    .then(result => {
      if(result) {
        this.userService.deleteUser(user).then(async () => {
          this.successMessage = "Se ha borrado el usero con exito";
          await this.getUsers();
        })
        .catch(error => {
          this.errorMessage = error.message;
        })
        }
      })
      modalRef = null;
  }
}
