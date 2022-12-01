import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';

@Component({
  selector: 'modal-nome',
  templateUrl: './modal-nome.component.html',
  styleUrls: ['./modal-nome.component.scss']
})
export class ModalNomeComponent implements OnInit {

  @Input() display = false;
  @Output() nomeContato: EventEmitter<any> = new EventEmitter
  @Output() fechar: EventEmitter<any> = new EventEmitter

  formulario: FormGroup

  constructor(private msgService: MensagensService) {
    this.formulario = new FormGroup({
      nome: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  escolherNome() {
    if (this.formulario.valid) {
      this.display = false;
      this.nomeContato.emit(this.formulario.controls['nome'].value)
    } else {
      this.msgService.mostrarMensagem('Erro', 'Campo obrigatorio em branco');
    }
  }

  fecharModal() {
    this.display = false;
    this.fechar.emit();
  }

}
