export interface Region {
    id: number;
    nombre: string;
    codigo: string;
    numero: string;
    created_at: string;
    updated_at: string;
}

export interface Comuna {
    id: number;
    nombre: string;
    idRegion: number;
    region: Region;
    created_at: string;
    updated_at: string;
}

export interface Empresa{
    id: number;
    nombre: string;
    rut :string;
    contacto: string;
    correoElectronico: string;
    direccion: string;
    idComuna: number;
    comuna: Comuna
    created_at: string;
    updated_at: string;
}

export interface Usuario {
    id: number;
    name: string;
    email: string;
    password : string;
    idEmpresa: number;
    empresa: Empresa;
    created_at: string;
    updated_at: string;
}

export interface Documento {
    id: number;
    nombre: string;
    ubicacion: string;
    created_at: string;
    updated_at: string;
}

export interface Centro {
    id: number;
    nombre: string;
    codigo: string;
    fecha: string;
    idEmpresa: number;
    empresa: Empresa;
    created_at: string;
    updated_at: string;
}

export interface Jaula {
    id: number;
    nombre: string;
    dimension: string;
    posicion: string;
    fecha: string;
    idEstadoJaula: number;
    idModulo: number;
    created_at: string;
    updated_at: string;
    documentos_jaula: Documento[];
}

export interface Pasillo {
    id: number;
    nombre: string;
    anchoCentral: string;
    anchoCabecera: string;
    anchoLaterales: string;
    posicion: string;
    fecha: string;
    idEstadoPasillo: number;
    idModulo: number;
    created_at: string;
    updated_at: string;
    documentos_pasillos: Documento[];
}

export interface Linea {
    id: number;
    nombre: string;
    posicion: string;
    fecha: string;
    idEstadoLinea: number;
    idModulo: number;
    created_at: string;
    updated_at: string;
    documentos_lineas: Documento[];
}

export interface Boya {
    id: number;
    nombre: string;
    posicion: string;
    fecha: string;
    idEstadoBoya: number;
    idModulo: number;
    created_at: string;
    updated_at: string;
    documentos_boyas: Documento[];
}

export interface RedLobera {
    id: number;
    codigo: string;
    fecha: string;
    idEstadoRedLobera: number;
    idModulo: number;
    created_at: string;
    updated_at: string;
    documentos_red_lobera: Documento[];
}

export interface ModuloData {
    id: number;
    nombre: string;
    fecha: string;
    fabricante: string;
    flotadores: string;
    pasadores: string;
    idCentro: number;
    created_at: string;
    updated_at: string;
    centro: Centro;
    jaulas: Jaula[];
    pasillos: Pasillo[];
    lineas: Linea[];
    boyas: Boya[];
    redes_loberas: RedLobera[];
}

export interface ApiResponse {
    res: boolean;
    data: ModuloData[];
}

export interface CentroModuleAPIProps {
    cellSize?: number;
    aisleSections?: number;
    aisleUnit?: number;
    apiUrl?: string;
    moduloId?: number;
    centroId?: number;
    onSave?: (moduloData: ModuloData) => void;
}

export interface TooltipPosition {
    x: number;
    y: number;
}

export type ElementType = "jaula" | "pasillo" | "base" | "linea" | "boya" | "red";

export interface HoveredElement {
    type: ElementType;
    id: string;
}