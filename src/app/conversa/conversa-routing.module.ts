import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConversaComponent } from "./componente/conversa.component";
import { GrupoComponent } from "./grupo/grupo.component";

const routes: Routes = [
    {
        path: '',
        component: ConversaComponent
    },
    {
        path: 'grupo',
        component: GrupoComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConversaRoutingModule { }