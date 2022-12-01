import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './utils/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chat-frontend';
  loadService: LoaderService;

  constructor(private _loadService: LoaderService, private router: Router) {
    this.loadService = _loadService;
  }
  ngOnInit(): void {
    //this.router.navigate(['/home']);
  }

}
