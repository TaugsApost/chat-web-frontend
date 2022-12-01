import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-nova-conversa',
  templateUrl: './modal-nova-conversa.component.html',
  styleUrls: ['./modal-nova-conversa.component.scss']
})
export class ModalNovaConversaComponent implements OnInit {
  @Input() display: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
