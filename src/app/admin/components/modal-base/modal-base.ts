import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-base',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './modal-base.html',
  styleUrl: './modal-base.css'
})
export class ModalBase {
  @Input() title: string = '';
  @Input() contentTemplate: TemplateRef<any> | null = null;
  @Input() contentButton: TemplateRef<any> | null = null;

  constructor(public activeModal: NgbActiveModal) { }

  cerrarModal() {
    console.log('Modal cerrado');
    this.activeModal.dismiss('Cross click');
  }
}
