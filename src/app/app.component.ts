import { Component } from '@angular/core';
import { LoaderService } from './utils/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadService: LoaderService;
  constructor(private _loadService: LoaderService) {
    this.loadService = _loadService;
  }
  title = 'Chat-frontend';
}
