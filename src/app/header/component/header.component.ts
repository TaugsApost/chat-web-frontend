import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/login/service/storege.service';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  displayAddContato: boolean = false;

  constructor(private storageService: StorageService, private msgService: MensagensService, private route: Router) { }

  ngOnInit(): void {
  }

  async logout() {
    this.msgService.mostrarMensagemSimNao('Logout', 'Deseja encerrar sua sessão?').then(value => {
      if (value) {
        this.storageService.signOut();
        this.route.navigate(['/login']);
      }
    });
  }

}
