import MongoDB from "./MongoDB/MongoDB";
import MySQL from "./MySQL/MySQL";

class Databases {
  constructor() {}

  public initDB(): void {
    const mysqlDB = new MySQL();
    mysqlDB.connect();
    const mongoDB = new MongoDB();
    mongoDB.connect();
  }
}

export default new Databases();