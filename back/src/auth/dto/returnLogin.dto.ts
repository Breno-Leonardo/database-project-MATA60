export class ReturnLoginDto {
  collaborator: {
    matricula: string;
    nome: string;
    typeCollaborator: number;
  };
  acessToken: string;
}
