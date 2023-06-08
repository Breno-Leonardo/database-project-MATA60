export interface CollaboratorType{
    matricula:string;
    nome:string;
    typeCollaborator:number;
    email:string;
    cpf:string;
    gmail:string;
    cargo:string;
    saldoDiasFerias:number;
    modeloContratacao:string;
    dataAdmissao:Date;
    fimAquisitivo:Date;
    time:{
        id:number;
        nome:string;
    }

}
