import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-novo-grupo',
  templateUrl: './modal-novo-grupo.component.html',
  styleUrls: ['./modal-novo-grupo.component.scss']
})
export class ModalNovoGrupoComponent implements OnInit {

  @Input() display: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
