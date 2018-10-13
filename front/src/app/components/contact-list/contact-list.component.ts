import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
import { ContactService } from 'src/app/services/contact/contact.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { DeleteContactDialogComponent } from '../delete-contact-dialog/delete-contact-dialog.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: object[] = [];
  loading: boolean;
  paginator: any = {
    total: 0,
    per_page: 1
  };
  options: any = {
    limit: 12,
    page: 1,
    search: '',
  };

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService,
    private notify: NotifyService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Meus Contatos');
    this.listAll();
  }

  openDialog(contact = null) {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      width: '500px',
      data: contact ? { contact } : null
    });

    dialogRef.componentInstance.onSave
      .subscribe(() => {
        this.listAll();
      });
  }

  openDeleteDialog(contact) {
    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
      width: '250px',
      height: 'auto',
      data: { contact }
    });

    dialogRef.componentInstance.onDelete
      .subscribe(() => {
        this.listAll();
      });
  }

  listAll() {
    this.contacts = [];
    this.loading = true;
    setTimeout(() => {
      this.contactService.getAll(this.options)
        .subscribe(res => {
          this.contacts = res.data;
          this.paginator = {
            total: res.totalCount,
            per_page: this.options.limit
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
    this.options = {...this.options, page: options.pageIndex + 1, limit: options.pageSize};
    this.listAll();
  }
}
