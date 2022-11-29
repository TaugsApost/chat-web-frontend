import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MensagensService } from "../mensagens/mensagens.service";
import { BaseService } from "./service.service";

export abstract class BaseEditComponent<Filter, Entity>{

    formulario: FormGroup;
    activatedRoute: ActivatedRoute;
    service: BaseService<Filter, Entity>
    public ignoreFields: String[];
    router: Router;
    voltarPara: string;
    msgService: MensagensService;

    constructor(service: BaseService<Filter, Entity>, activatedRoute: ActivatedRoute, router: Router, voltarPara: string, msg: MensagensService) {
        this.formulario = new FormGroup({});
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.ignoreFields = [];
        this.router = router;
        this.voltarPara = voltarPara;
        this.msgService = msg;
    }

    salvar() {
        if (this.formulario.valid) {
            const obj = this.cloneObj(Object.assign({}, this.formulario.getRawValue()));
            this.service.salvar(obj).subscribe((res) => {

            });
        }
    }

    carregarRegistro() {
        const isIdPresent = this.activatedRoute.snapshot.paramMap.has('id');
        if (isIdPresent) {
            const id = this.activatedRoute.snapshot.paramMap.get('id') as any;
            this.detalhar(id);
        }
    }

    detalhar(id: number) {
        this.service.detalhar(id).subscribe(
            data => {
                this.formulario.patchValue(data);
                this.afterLoadRegistro(data);
            }
        );
    }

    public cloneObj(obj: any): any {
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

    afterLoadRegistro(registro: Entity) { }

    navegarPara(caminho: string) {
        this.router.navigateByUrl('/' + caminho);
    }

    voltar() {
        this.navegarPara(this.voltarPara);
    }
}