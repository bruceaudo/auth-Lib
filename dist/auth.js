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
const argon2_1 = __importDefault(require("argon2"));
class Auth {
    constructor(data) {
        this.validateData(data);
        this.data = data;
    }
    getData() {
        return this.data;
    }
    validateData(data) {
        this.validateRequiredFields(data);
        this.validatePasswordMatch(data);
        if (data.email && !this.validateEmail(data.email)) {
            throw new Error("Invalid email address.");
        }
        if (data.phoneNumber && !this.validatePhoneNumber(data.phoneNumber)) {
            throw new Error("Invalid phone number.");
        }
    }
    validateRequiredFields(data) {
        if (!data.fullName || !data.password || !data.passwordConfrimation) {
            throw new Error("Missing required fields in user data.");
        }
    }
    validatePasswordMatch(data) {
        if (data.password !== data.passwordConfrimation) {
            throw new Error("There is a mismatch in passwords");
        }
    }
    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\d{10,15}$/;
        return phoneRegex.test(phoneNumber);
    }
    _encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield argon2_1.default.hash(password);
                return hashedPassword;
            }
            catch (err) {
                console.error("Error hashing password:", err);
                throw err;
            }
        });
    }
    _verifyPassword(hashedPassword, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield argon2_1.default.verify(hashedPassword, password);
            }
            catch (err) {
                console.error("Error verifying password:", err);
                throw err;
            }
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map