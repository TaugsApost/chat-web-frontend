import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss'],
  //providers: [MessageService, ConfirmationService]
})
export class MensagensComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}
