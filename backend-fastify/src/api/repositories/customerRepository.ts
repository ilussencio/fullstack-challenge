import db from "../../database";
import Customer from "../models/customer";

class CustomerRepository {
    private db: any;

    constructor() {
        this.db = db
    }

    async findById(id: string): Promise<Customer |  null> {
        const customer = await this.db.query("select customer_id, name, email from customer where customer_id = $1;", [id]);
        if (customer.length === 0)
            return null
        return new Customer(customer[0]);
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const customer = await this.db.query("select customer_id, name, email from customer where email = $1;", [email]);
        if (customer.length === 0)
            return null
        return new Customer(customer[0]);
    }

    async saveCustomer(name: string, email: string): Promise<void> {
        console.log("\n\n\n")
        console.log("dsfasdf");
        console.log("\n\n\n")
        await this.db.query("insert into customer (name, email) values ($1, $2);", [name, email]);
        return Promise.resolve();
    }
}

export default CustomerRepository;