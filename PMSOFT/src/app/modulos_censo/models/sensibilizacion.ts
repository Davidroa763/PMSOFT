export class SensibilizacionModel{
	constructor(
        public Op: String,
        public Municipio: String,
        public Fecha: Date,
        public Nobre_Propietario: String,
        public Nobre_Establecimiento: String,
        public Direccion_Establecimiento: String,
        public Actividad_Economica: String,
        public Telefono_Propietario: Number,
        public Firma: String,
        public Usuario_Creacion: String,
        public Fecha_Creacion: Date,
        public Usuario_Cambio: String,
        public Fecha_Cambio: Date
	){}
}