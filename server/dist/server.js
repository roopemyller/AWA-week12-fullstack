"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./src/index"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 1234;
// Middleware
if (process.env.NODE_ENV === 'development') {
    const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    };
    app.use((0, cors_1.default)(corsOptions));
}
app.use(express_1.default.json());
// MongoDB database connection
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = Promise;
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
//Define router
app.use("/", index_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
