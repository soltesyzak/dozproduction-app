export interface BasicClient {
    _id: string;
    _rev: string;
}

export interface Client extends BasicClient {
    name: string;
    maxAge: number;
    minAge: number;
    sex: string;
    isKid: boolean;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}