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
const auth_1 = __importDefault(require("./auth"));
class MyAuth extends auth_1.default {
    _signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield this._encryptPassword(data.password);
            console.log(hash);
        });
    }
    _login() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Logged in");
        });
    }
}
const user = {
    fullName: "Bruce Audo",
    password: "12345",
    passwordConfrimation: "12345",
    email: "audo401@gmail.com",
};
const userInstance = new MyAuth(user);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("User Data:", userInstance.getData());
        yield userInstance._login();
        yield userInstance._signup(userInstance.getData());
    });
}
run().catch((error) => {
    console.error("Error:", error);
});
//# sourceMappingURL=index.js.map