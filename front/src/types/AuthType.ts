import { CollaboratorType } from "./CollaboratorTypes";

export interface AuthType{
    acessToken:string,
    collaborator: CollaboratorType;
}