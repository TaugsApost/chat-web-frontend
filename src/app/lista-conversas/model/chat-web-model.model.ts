export class Usuario {
    id = 0;
    nome = '';
    senha = '';
    userName = '';
    permissao = false;
    listaDeContatos: Contato[] = [];
    listaDeConversas: UsuarioConversa[] = [];
}
export class UsuarioConversa {
    idUsuario = 0;
    idConversa = 0;
    nomeConversa = '';
    listaDeMensagens: UsuarioConversaMensagem[] = [];
}
export class UsuarioConversaMensagem {
    idUsuario = 0;
    idConversa = 0;
    idMensagem = 0;
    mensagem: Mensagem = new Mensagem;
}
export class Conversa { }
export class Mensagem {
    id = 0;
    idUsuario = 0;
    idConversa = 0;
    conteudo = '';
    dataEnvio = new Date;
}
export class Contato { }