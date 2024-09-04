import UserData from "./types";
import argon2 from "argon2";

export default abstract class Auth<_TData extends UserData> {
  private data: _TData;

  constructor(data: _TData) {
    this.validateData(data);
    this.data = data;
  }

  getData(): _TData {
    return this.data;
  }

  private validateData(data: any): asserts data is _TData {
    this.validateRequiredFields(data);
    this.validatePasswordMatch(data);

    if (data.email && !this.validateEmail(data.email)) {
      throw new Error("Invalid email address.");
    }

    if (data.phoneNumber && !this.validatePhoneNumber(data.phoneNumber)) {
      throw new Error("Invalid phone number.");
    }
  }

  private validateRequiredFields(data: any): asserts data is _TData {
    if (!data.fullName || !data.password || !data.passwordConfrimation) {
      throw new Error("Missing required fields in user data.");
    }
  }

  private validatePasswordMatch(data: any): void {
    if (data.password !== data.passwordConfrimation) {
      throw new Error("There is a mismatch in passwords");
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  }

  abstract _signup(data: _TData): Promise<void>;

  abstract _login(): Promise<void>;

  protected async _encryptPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await argon2.hash(password);
      return hashedPassword;
    } catch (err) {
      console.error("Error hashing password:", err);
      throw err;
    }
  }

  protected async _verifyPassword(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, password);
    } catch (err) {
      console.error("Error verifying password:", err);
      throw err;
    }
  }
}
