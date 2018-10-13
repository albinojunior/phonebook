import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() contact: any;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  handleEdit(contact) {
    this.edit.emit(contact);
  }

  handleDelete(contact) {
    this.delete.emit(contact);
  }

}
