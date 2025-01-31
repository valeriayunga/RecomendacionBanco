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

// En profile.model.ts
export interface Familiares {
  parentesco: string;
  nombre: string;
  edad: number;
  profesion: string;
  telefono: string;
}

export interface PersonalInfo {
_id: any|string;
  nombre_completo: string;
  numero_cedula: string;
  telefono: string;
  correo: string;
  linkedin: string;
  estado_civil: string;
  fecha_nacimiento: string;
  edad: number;
  aspiracion_salarial: number;
  tipo_sangre: string;
  direccion: string;
  personal_map_document: null | any;
  tipo_descapacidad: null | string;
  porcentaje_descapacidad: null | number;
  familiares: Familiares[];
}

export interface PersonalMap {
  personal_info: PersonalInfo;
  Tag: string | string[]; // Añadir esta línea
}

export interface Value {
name: string;
ponderacion: number;
}

export interface Subseccion {
name: string;
values: Value[];
}

export interface Seccion {
name: string;
Subsecciones: Subseccion[];
}

export interface Profile {
Tag: string;
Secciones: Seccion[];
}