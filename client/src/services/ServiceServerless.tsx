import http from '../http';
import IClientData from '../types/Client';

class ClientDataService {

    makeArr = (array:any) => {
        const madeArray = array.map((element:any) => {
            return element.doc;
        })
        return {data:madeArray};
    }

    async getAll() {
        const response = await http.get<any>("https://apikey-v2-1h3koj6s82gb2031y1s885to5341zq8ddgrhxkgusarx:8d50e1734dcfa19774241b629c1767ba@084ecc57-2ce5-43e0-b7f3-27c1b8b8d568-bluemix.cloudantnosqldb.appdomain.cloud/doz-clients/_all_docs?include_docs=true");
        const arr = this.makeArr(response.data.rows);
        return arr;
    }

    async get(id: string) {
        return await http.get<IClientData>(`${process.env.CLOUDANT}/${id}`)
    }

    async create(data: IClientData) {
        return await http.post<IClientData>(`${process.env.CLOUDANT}`, data)
    }

    async update(data: IClientData, id: any) {
        return await http.put<any>(`${process.env.CLOUDANT}/${id}`, data)
    }

    async delete(id: any, rev: any) {
        return await http.delete<any>(`${process.env.CLOUDANT}/${id}?rev=${rev}`)
    }
}

export default new ClientDataService();

