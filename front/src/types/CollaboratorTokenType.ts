export interface CollaboratorTokenType{
    matricula:string;
    nome:string;
    typeCollaborator:number;
    saldoDiasFerias:number;
    modeloContratacao:string;
    dataAdmissao:Date;
    fimAquisitivo:Date;
    time:{
        id:number;
        nome:string;
    }

}
