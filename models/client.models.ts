import { Client } from "../types/client.types"
import axios from "axios"
import * as dotenv from "dotenv";
dotenv.config({ path: '../.env' });

export const create = async (client: Client, callback: Function) => {
    axios.post(`${process.env.CLOUDANT}`, {...client})
    .then((response) => {
        callback(null, response.data);
    }).catch((err) => {
        console.log(err);
        callback(err);
    })
};  

export const getOne = (id: string, callback: Function) => {
    axios.get(`${process.env.CLOUDANT}/${id}`)
    .then((response) => {
        callback(null, response.data);
    }).catch((err) => {
        console.log(err);
        callback(err);
    })
}

export const getAll = async (callback: Function) => {
    const response:any = await axios
    .get(`${process.env.CLOUDANT}/_all_docs?include_docs=true`)
    .catch((err) => {
        console.log(err);
        callback(err);
    })
    const arr = await makeArr(response.data.rows);
    callback(null, arr);
}

const makeArr = (array:any) => {
    const madeArray = array.map((element:any) => {
        return element.doc;
    })
    return {data:madeArray};
}

export const update = (client: Client, callback: Function) => {
    axios.put(`${process.env.CLOUDANT}/${client._id}`, {...client})
    .then((response) => {
        callback(null, response.data);
    }).catch((err) => {
        console.log(err);
        callback(err);
    })
}

export const deleteOne = (id: string, rev: string, callback: Function) => {
    axios.delete(`${process.env.CLOUDANT}/${id}?rev=${rev}`)
    .then((response) => {
        callback(null, response.data);
    }).catch((err) => {
        console.log(err);
        callback(err);
    })
}