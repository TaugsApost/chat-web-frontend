import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FrozenColumn } from "primeng/table";
import { MensagensService } from "../mensagens/mensagens.service";
import { Coluna } from "../tabela/colunas.model";
import { BaseService } from "./service.service";

export abstract class BasePesquisarComponent<Filter, Entity>{

    formulario: FormGroup;
    activatedRoute: ActivatedRoute;
    service: BaseService<Filter, Entity>
    public ignoreFields: String[];
    dataSource: Entity[];
    columns: Coluna[];
    router: Router;
    caminho: string;
    msgService: MensagensService;


    constructor(service: BaseService<Filter, Entity>, activatedRoute: ActivatedRoute, router: Router, caminho: string,
        msg: MensagensService) {
        this.formulario = new FormGroup({});
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.ignoreFields = [];
        this.dataSource = [];
        this.columns = [];
        this.router = router;
        this.caminho = caminho;
        this.msgService = msg;
    }

    pesquisar() {
        const obj = this.cloneObj(Object.assign({}, this.formulario.value));
        this.service.buscar(obj).subscribe((res) => {
            this.dataSource = res;
        });
    }

    excluir(id: number) {
        this.service.excluir(id).subscribe(response => {
            this.msgService.mostrarMensagem('Sucesso', 'Registro excluído com sucesso');
            this.limpar();
            this.pesquisar();
        });
    }

    limpar() {
        this.dataSource = [];
        this.formulario.reset();
    }

    excluirItem(item: any) {
        this.msgService.mensagemExcluir('Excluir', 'Tem Certeza que deseja prosseguir com a operação? Nao poderá ser desfeito.', this, item.id);
    }

    private cloneObj(obj: any): any {
        const cloneObj: any = {};
        for (const attribut in obj) {
            if (obj.hasOwnProperty(attribut)) {
                if (this.ignoreFields.indexOf(attribut) < 0) {
                    cloneObj[attribut] = obj[attribut];
                }
            }
        }
        return cloneObj;
    }

    navegarPara(caminho: string) {
        this.router.navigateByUrl('/' + caminho);
    }

    telaEditar(obj: any) {
        this.navegarPara(this.caminho + "/novo/" + obj.id);
    }

    telaVisualizar(obj: any) {
        this.navegarPara(this.caminho + "/visualizar/" + obj.id);
    }
}