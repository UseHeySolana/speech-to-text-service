"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stt_1 = __importDefault(require("./requests/stt"));
const tts_1 = __importDefault(require("./requests/tts"));
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/stt", upload.single("audio"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    try {
        const file = req.file;
        const response = yield (0, stt_1.default)(file);
        if (response) {
            return res.status(200).json({ status: "success", text: response });
        }
    }
    catch (e) {
        console.error(e);
        res.json({ error: "Failed" + e });
    }
}));
app.get("/api/tts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "No text uploaded" });
        }
        const response = yield (0, tts_1.default)(text);
        if (response) {
            return res.status(200).json({ status: "success", text: response });
        }
    }
    catch (e) {
        console.error(e);
        res.json({ error: "Failed" + e });
    }
}));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
