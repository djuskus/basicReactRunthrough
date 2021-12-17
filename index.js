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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const app = (0, express_1.default)();
const port = 3000;
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 4. Connect to MongoDB
(0, mongoose_1.connect)("mongodb://localhost:27017/vanilla");
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({
        message: "Hello World!",
    });
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let message = req.body.message;
    if (message == null) {
        return res.status(400).send({
            message: "Ain't no message here!",
        });
    }
    saveMessageToDB(req.body.message);
    return res.status(200).send({
        message: "Hello World!",
    });
}));
try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    console.error(`Error occured: ${error.message}`);
}
// 2. Create a Schema corresponding to the document interface.
const schema = new mongoose_1.Schema({
    message: { type: String, required: true },
});
// 3. Create a Model.
const UserModel = (0, mongoose_1.model)("User", schema);
function saveMessageToDB(dbMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doc = new UserModel({
                message: dbMessage,
            });
            yield doc.save();
            console.log(doc.message); // 'bill@initech.com'
        }
        catch (err) {
            console.log(err);
        }
    });
}
const server = app.listen(5000, () => console.log(`Server started on port 5000`));
exports.default = server;
