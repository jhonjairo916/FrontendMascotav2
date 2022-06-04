import { DepartamentoModelo } from "./Departamento.modelo";

export class CiudadModelo {
    id: number =0;
    nombre?: string;
    departamentoId?:number;
    //Its created a instance of departamento to show the name of departamento into the listar-ciudad
    departamento: DepartamentoModelo = new DepartamentoModelo();


}
