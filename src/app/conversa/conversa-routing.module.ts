import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConversaComponent } from "./componente/conversa.component";

const routes: Routes = [
    {
        path: '',
        component: ConversaComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConversaRoutingModule { }