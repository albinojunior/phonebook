import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
import { ContactService } from 'src/app/services/contact/contact.service';
import { NotifyService } from 'src/app/services/notify/notify.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: object[] = [];
  meta: object[];
  page: any = 1;
  displayedColumns: string[] = ['name', 'email', 'phone', 'company', 'position', 'actions'];
  paginator: any = {
    total: 0,
    per_page: 1
  };
  loading: boolean;
  search: any = '';
  order: string;
  sort: string;

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.listAll();
  }

  openDialog(contact = null) {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      width: '500px',
      data: contact ? { contact } : null
    });

    dialogRef.componentInstance.onSave.subscribe(() => {
      this.listAll();
    });
  }

  listAll(options = { page: 1, limit: 15 }) {
    this.contacts = [];
    this.loading = true;
    setTimeout(() => {
      this.contactService.getAll({ ...options, search: this.search })
        .subscribe(res => {
          this.contacts = res.data;
          this.paginator = {
            total: res.pageCount,
            per_page: options.limit
          };
          this.loading = false;
        }, res => {
          console.log(res);
          this.loading = false;
          this.notify.show('warning', res.error.message);
        });
    }, 200);
  }

  prepareListAll(options) {
    this.listAll({ page: options.pageIndex + 1, limit: options.pageSize });
  }
}
