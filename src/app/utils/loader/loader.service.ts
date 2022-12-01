import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { StorageService } from "src/app/login/service/storege.service";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    visibility: BehaviorSubject<boolean>;

    constructor(private storageService: StorageService) {
        this.visibility = new BehaviorSubject(storageService.isLoggin() ? true : false);
    }

    show() {
        this.visibility.next(true);
    }

    hide() {
        this.visibility.next(false);
    }
}