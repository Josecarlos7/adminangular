import { ApplicationRef, Injectable, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalBaseService {
  constructor(
    private ngbModal: NgbModal,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) { }
  
}
