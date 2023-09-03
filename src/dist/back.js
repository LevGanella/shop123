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
const userClass_1 = __importDefault(require("./userClass"));
const productsClass_1 = __importDefault(require("./productsClass"));
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
const dbClient = new mongodb_1.MongoClient('mongodb://localhost:27017');
//const db = dbClient.db('usersShop');
//const collection = db.collection('messages');
//collection.deleteMany({})
const server = app.listen(5000, () => {
    logDb();
    console.log('Server is running on port 5001230');
});
const addToDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbClient.connect();
        console.log('connected');
        const db = dbClient.db('usersShop');
        const collection = db.collection('users');
        yield collection.insertOne(user);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield dbClient.close();
    }
});
const findInDb = (req, req2) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbClient.connect();
        console.log('connected2');
        const db = dbClient.db('usersShop');
        const collection = db.collection('users');
        let exist = yield collection.findOne({ login: req, password: req2 });
        if (exist) {
            return (true);
        }
        else {
            return false;
        }
    }
    catch (err) {
        throw err;
        console.log(err);
    }
    finally {
        yield dbClient.close();
    }
    ;
});
const logDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbClient.connect();
        const db = dbClient.db("usersShop");
        const collection = db.collection("users");
        const arr = yield collection.find({}).toArray();
        arr.forEach((el) => {
            console.log('{login: ' + el.login + ', password: ' + el.password + ', isBoss: ' + el.isBoss + '}');
        });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield dbClient.close();
    }
});
const addProductIndB = (product, login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbClient.connect();
        const db = dbClient.db("usersShop");
        const collection = db.collection(`products/${login}`);
        const exist = yield collection.findOne({ name: product.name });
        console.log(product);
        if (exist) {
            yield collection.updateOne({ name: product.name }, { $set: { count: (product.count + exist.count) } });
        }
        else {
            yield collection.insertOne(product);
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield dbClient.close();
    }
});
const deleteProductIndB = (product, login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbClient.connect();
        const db = dbClient.db('usersShop');
        const collection = db.collection(`products/${login}`);
        console.log(login);
        console.log(product);
        const delete1 = yield collection.deleteOne({
            id: product.id,
            name: product.name,
            price: product.price,
            count: product.count
        });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield dbClient.close();
    }
});
const PrintProdactsFromDb = (login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbClient.connect();
        const db = dbClient.db("usersShop");
        const collection = db.collection(`products/${login}`);
        const arrProduct = yield collection.find({}).toArray();
        return arrProduct;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield dbClient.close();
    }
});
const meassagesToDb = (messages) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbClient.connect();
        const db = dbClient.db("usersShop");
        const collection = db.collection(`${messages.chat}`);
        messages = { name: messages.name, text: messages.text };
        yield collection.insertOne(messages);
    }
    catch (err) {
        console.log('err1', err);
    }
    finally {
        yield dbClient.close();
    }
});
const messagesPrintFromDb = (login) => __awaiter(void 0, void 0, void 0, function* () {
    let dbClient;
    try {
        dbClient = yield mongodb_1.MongoClient.connect("mongodb://localhost:27017");
        const db = dbClient.db("usersShop");
        const collection = db.collection(`${login}`);
        console.log(login);
        const arrMessages = yield collection.find({}).toArray();
        console.log(arrMessages);
        const filter = arrMessages.map((mes) => ({
            name: mes.name,
            text: mes.text
        }));
        return filter;
    }
    catch (err) {
        console.log('Ошибка при запросе из базы данных:', err);
        throw err;
    }
    finally {
        if (dbClient) {
            yield dbClient.close();
        }
    }
});
const getChats = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbClient.connect();
        const db = dbClient.db("usersShop");
        const collection = yield db.listCollections({ name: { $regex: 'messages/' } }).toArray();
        return collection;
    }
    catch (err) {
        console.log('err1', err);
    }
    finally {
        yield dbClient.close();
    }
});
app.get("/getchats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield getChats();
    res.send(chats);
}));
app.post("/messagesAdd", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mes = { text: req.body.text, name: req.body.name, chat: req.body.chat };
    yield meassagesToDb(mes);
}));
app.post("/messagesPrint", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const arr = yield messagesPrintFromDb(req.body.chat);
    res.send(arr);
}));
app.post('/reg', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new userClass_1.default(req.body.login1, req.body.password1, false);
    const exist1 = yield findInDb(req.body.login1, req.body.password1);
    if (!exist1 && user.login != '') {
        yield addToDb(user);
    }
    else {
        console.log('CУЩЕСТВУЕТ');
    }
}));
app.post('/enter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boss = req.body.login == '1' ? true : false;
    let user = new userClass_1.default(req.body.login, req.body.password, boss);
    const exist = yield findInDb(req.body.login, req.body.password);
    if (exist) {
        console.log(user.login);
        res.send(user.login);
    }
    else {
        console.log('-');
        return (false);
    }
}));
app.post('/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const arr = yield PrintProdactsFromDb(req.body.login);
    res.send(arr);
}));
app.post('/cart/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productsClass_1.default(req.body.id, req.body.name, req.body.price, req.body.count);
    yield addProductIndB(product, req.body.login);
}));
app.delete('/cart/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productsClass_1.default(req.body.id, req.body.name, req.body.price, req.body.count);
    yield deleteProductIndB(product, req.body.user);
    res.send(true);
}));
