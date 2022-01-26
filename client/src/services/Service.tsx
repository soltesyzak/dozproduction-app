import http from '../http';
import IClientData from '../types/Client';

class ClientDataService {
    getAll() {
        return http.get<Array<IClientData>>("/api")
    }

    get(id: string) {
        return http.get<IClientData>(`/api/${id}`)
    }

    create(data: IClientData) {
        return http.post<IClientData>("/api", data)
    }

    update(data: IClientData, id: any) {
        return http.put<any>(`/api/${id}`, data)
    }

    delete(id: any, rev: any) {
        return http.delete<any>(`/api/${id}/${rev}`)
    }

    upload(file: FormData, id:any) {
        return http.post<any>(`/api/upload/${id}`, file)
    }
}

export default new ClientDataService();

