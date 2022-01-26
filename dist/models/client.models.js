"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getAll = exports.getOne = exports.create = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '../.env' });
const create = async (client, callback) => {
    axios_1.default.post(`${process.env.CLOUDANT}`, { ...client })
        .then((response) => {
        callback(null, response.data);
    }).catch((err) => {
        console.log(err);
        callback(err);
    });
};
exports.create = create;
const getOne = (id, callback) => {
    axios_1.default.get(`${process.env.CLOUDANT}/${id}`)
        .then((response) => {
        callback(null, response.data);
    }).catch((err) => {
        console.log(err);
        callback(err);
    });
};
exports.getOne = getOne;
const getAll = (callback) => {
    axios_1.default.get(`${process.env.CLOUDANT}/_all_docs?include_docs=true`)
        .then((response) => {
        callback(null, response.data);
    }).catch((err) => {
        console.log(err);
        callback(err);
    });
};
exports.getAll = getAll;
const update = (client, callback) => {
    axios_1.default.put(`${process.env.CLOUDANT}/${client._id}`, { ...client })
        .then((response) => {
        callback(null, response.data);
    }).catch((err) => {
        console.log(err);
        callback(err);
    });
};
exports.update = update;
