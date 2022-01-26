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
exports.clientRouter = void 0;
const express_1 = __importDefault(require("express"));
const clientModel = __importStar(require("../models/client.models"));
const clientRouter = express_1.default.Router();
exports.clientRouter = clientRouter;
clientRouter.get("/", async (req, res) => {
    clientModel.getAll((err, clients) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        return res.status(200).json({ data: clients });
    });
});
clientRouter.post("/", async (req, res) => {
    const newClient = req.body;
    clientModel.create(newClient, (err, id) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        res.status(200).json({ profileId: id });
    });
});
clientRouter.get("/:id", async (req, res) => {
    const clientId = req.params.id;
    clientModel.getOne(clientId, (err, client) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        return res.status(200).json({ ...client });
    });
});
clientRouter.put("/:id", async (req, res) => {
    const client = req.body;
    clientModel.update(client, (err) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        return res.status(200).json({ OK: true });
    });
});
