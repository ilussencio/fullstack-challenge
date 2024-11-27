
class Customer {
    customer_id: string;
    name: string;
    email: string;

    constructor(customer: any) {
        this.customer_id = customer.customer_id;
        this.name = customer.name;
        this.email = customer.email;
    }
}

export default Customer;