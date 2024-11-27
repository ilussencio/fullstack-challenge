import CustomerRepository from "../repositories/customerRepository";
import InvalidDataError from "../errors/invalidDataError";
class CustomerService {
    private customerRepository: CustomerRepository;

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async findById(id: string) {
        const customer = await this.customerRepository.findById(id);
        if (customer == null) 
            throw new InvalidDataError('Customer not found');   
        return customer
    }

    async findByEmail(email: string) {
        const customer = await this.customerRepository.findByEmail(email);
        if (customer == null) 
            throw new InvalidDataError('Customer not found');
        return customer;
    }

    async save(name: string, email: string) {
        let customer = await this.customerRepository.findByEmail(email);

        if (customer != null) 
            throw new InvalidDataError('Email already exists');

        return this.customerRepository.saveCustomer(name, email);
    }
}

export default CustomerService;