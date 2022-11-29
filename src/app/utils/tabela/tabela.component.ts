import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Coluna } from './colunas.model';

@Component({
  selector: 'taugs-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  @Input() dataSource: any;
  @Input() columns: Coluna[] = [];
  @Input() titulo: any
  @Input() align: string = 'left'
  @Input() habVisualizar: boolean = true;
  @Input() habDeletar: boolean = true;
  @Input() habEditar: boolean = true;
  @Input() tooltip: string = '';

  @Output() deletar = new EventEmitter<any>();
  @Output() visualizar = new EventEmitter<any>();
  @Output() editar = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  botaoDeletar(item: any) {
    this.deletar.emit(item)
  }
  botaoVisualizar(item: any) {
    this.visualizar.emit(item)
  }
  botaoEditar(item: any) {
    this.editar.emit(item)
  }

}
