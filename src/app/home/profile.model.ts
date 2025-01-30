export interface Value {
    name: string;
    ponderacion: number;
  }

export interface Subseccion {
name: string;
values: Value[];
ponderacion: number;
}

export interface Seccion {
name: string;
Subsecciones: Subseccion[];
ponderacion: number;
}

export interface Profile {
Tag: string;
Secciones: Seccion[];
}

export interface PersonalMap {
_id: string;
nombre_completo: string;
correo: string;
telefono: string;
aspiracion_salarial: number;
}