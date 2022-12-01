export class Usuario {
    username = '';
    nome = '';
    senha = '';
    listaDeContatos: Contato[] = [];
    listaMensagensEnviadas: MensagemChat[] = [];
    listaMensagensRecebidas: MensagemChat[] = [];
    listaGrupos: Participante[] = [];
}
export class UsuarioResponse {
    userName = '';
    nome = '';
}
export class Contato {
    usernameUsuario = '';
    usernameContato = '';
    nomeContato = '';
    //contato: Usuario = new Usuario;
}
export class Conversa {
    username1 = '';
    username2 = '';
}
export class Grupo {
    id = 0;
    nome = '';
    dataCriacao = null;
    dataAlteracao: any = null;
    listaParticipantes: Participante[] = [];
}
export class Login {
    username = '';
    senha = '';
}
export class Mensagem {
    id = 0;
    dataEnvio: any = null;
    conteudo = '';
}
export class MensagemChatClone {
    id = 0;
    dataEnvio: any = null;
    conteudo = '';
    usernameEmissor = '';
    usernameReceptor = '';
}
export class MensagemChat {
    id = 0;
    dataEnvio: any = null;
    conteudo = '';
    usernameEmissor = '';
    usernameReceptor = '';
    emissor?: boolean = false;
}
export class MensagemGrupo {
    id = 0;
    dataEnvio: any = null;
    conteudo = '';
    idGrupo = 0;
    username = '';
}
export class Participante {
    username = '';
    idGrupo = 0;
    dataInscricao: any = null;
    listaDeMensagens: MensagemGrupo[] = [];
}
