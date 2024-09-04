import Auth from "./auth";
import UserData from "./types";

export default interface MyUserdata extends UserData {
  // Additional fields if needed
}



class MyAuth extends Auth<MyUserdata> {
  async _signup(data: MyUserdata): Promise<void> {
    const hash = await this._encryptPassword(data.password)
    console.log(hash);
  }

  async _login(): Promise<void> {
    console.log("Logged in");
  }
}

const user: MyUserdata = {
  fullName: "Bruce Audo",
  password: "12345",
  passwordConfrimation: "12345",
  email: "audo401@gmail.com",
};

const userInstance = new MyAuth(user);

async function run() {
  // Log the data returned from getData
  console.log("User Data:", userInstance.getData());

  // Await async methods
  await userInstance._login();
  await userInstance._signup(userInstance.getData());
}

run().catch((error) => {
  console.error("Error:", error);
});
