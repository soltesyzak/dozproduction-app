export default interface IClientData {
    _id?: string | null,
    _rev?: string | null,
    name: string,
    maxAge: number,
    minAge: number,
    sex: string,
    isKid: boolean,
    isVisible: boolean
}