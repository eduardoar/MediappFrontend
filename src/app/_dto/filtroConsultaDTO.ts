export class FiltroConsultaDTO{
        dni: string;
        nombreCompleto: string;
        fechaConsulta: Date;

        constructor(dni: string, nombreCompleto: string, fechaConsulta: Date){
            this.dni = dni;
            this.nombreCompleto = nombreCompleto;
            this.fechaConsulta = fechaConsulta;
        }
        
}