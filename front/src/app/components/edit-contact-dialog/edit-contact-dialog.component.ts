import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact/contact.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
import * as _ from 'lodash';
import { FormBuilderValidators } from 'src/app/validators/form-builder.validator';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.css']
})
export class EditContactDialogComponent implements OnInit {
  isEdit: boolean;
  contact: any;
  loading: boolean;
  contactForm: FormGroup;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>(true);

  constructor(
    private dialogRef: MatDialogRef<EditContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private customValidators: FormBuilderValidators,
    private contactService: ContactService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    if (this.data && this.data.hasOwnProperty('contact')) {
      this.contact = this.data.contact;
      this.isEdit = true;
    }

    this.contactForm = this.fb.group({
      name: [this.contact ? this.contact.name : '', [Validators.required, this.customValidators.nameFormat]],
      email: [this.contact ? this.contact.email : '', [Validators.required, this.customValidators.emailFormat]],
      phone: [this.contact ? this.contact.phone : '', [Validators.required]],
      company: [this.contact ? this.contact.company : '', [Validators.required]],
      position: [this.contact ? this.contact.position : '', [Validators.required]],
    });
  }

  buildContact() {
    return {
      name: this.contact ? this.contact.name : '',
      email: this.contact ? this.contact.email : '',
      phone: this.contact ? this.contact.phone : '',
      company: this.contact ? this.contact.company : '',
      position: this.contact ? this.contact.position : ''
    };
  }

  saveContact() {
    if (this.contactForm.valid && !_.isEqual(this.buildContact(), this.contactForm.value)) {
      this.loading = true;
      const contact: any = this.contactForm.value;

      if (this.contact && this.contact._id) {
        contact.id = this.contact._id;
      }

      const action = this.isEdit ? 'update' : 'create';
      this.contactService[action](contact)
        .subscribe(res => {
          this.dialogRef.close();
          this.onSave.emit();
          this.loading = false;
          this.notify.show('success', res.message ? res.message : 'Contato salvo com sucesso!');
        }, err => {
          console.log(err);
          this.loading = false;
        });
    } else {
      if (this.isEdit && _.isEqual(this.buildContact(), this.contactForm.value)) {
        this.notify.show('warning', 'Nenhuma alteração realizada');
      } else if (!this.contactForm.valid) {
        this.handleValidatorErrors(this.contactForm.controls);
      }
    }
  }

  handleValidatorErrors(controls) {
    Object.keys(controls)
      .forEach((key) => {
        if (controls[key].errors) {
          Object.keys(controls[key].errors)
            .forEach(error => {
              const typeError = error === 'required' ? 'obrigatório' : 'inválido';
              const field = this.translateKey(key);
              this.notify.show('warning', `Campo \"${field}\" ${typeError}!`);
            });
        }
      });
  }

  translateKey(key) {
    const TRANSLATED = [
      { key: 'email', name: 'Email' },
      { key: 'company', name: 'Empresa' },
      { key: 'name', name: 'Nome' },
      { key: 'phone', name: 'Telefone' },
      { key: 'position', name: 'Cargo' },
    ];

    for (const field of TRANSLATED) {
      if (field.key === key) {
        return field.name;
      }
    }
  }
}
