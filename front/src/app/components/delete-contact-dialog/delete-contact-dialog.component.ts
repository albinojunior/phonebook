import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactService } from 'src/app/services/contact/contact.service';
import { NotifyService } from 'src/app/services/notify/notify.service';

@Component({
  selector: 'app-delete-contact-dialog',
  templateUrl: './delete-contact-dialog.component.html',
  styleUrls: ['./delete-contact-dialog.component.css']
})
export class DeleteContactDialogComponent implements OnInit {

  contact: any;
  loading: boolean;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>(true);

  constructor(
    private dialogRef: MatDialogRef<DeleteContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    if (this.data && this.data.hasOwnProperty('contact')) {
      this.contact = this.data.contact;
    }
  }

  deleteContact() {
    this.loading = true;
    setTimeout(() => {
      this.contactService.delete(this.contact._id)
        .subscribe(res => {
          this.dialogRef.close();
          this.onDelete.emit();
          this.loading = false;
          this.notify.show('success', res.message);
        }, err => {
          console.log(err);
          this.loading = false;
        });
    }, 500);
  }

}
