const { AddressRepository } = require("../repository/index");
const { ServiceError } = require("../utils");

class AddressService {
    constructor() {
        this.addressRepository = new AddressRepository();
    }

    async create(data) {
        try {
            let requiredData = {};
            requiredData.addressLine = data.addressLine;
            requiredData.city = data.city;
            requiredData.state = data.state;
            requiredData.pincode = data.pincode;

            const address = await this.addressRepository.create(requiredData);
            console.log(address);
            return address;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);

            if (error.name == "ValidationError") {
                throw error;
            }

            throw new ServiceError();
        }
    }

    async delete(addressId) {
        try {
            const address = await this.addressRepository.delete(addressId);
            return true;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);

            if (error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }

    async get(addressId) {
        try {
            const address = await this.addressRepository.get(addressId);
            return address;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);

            if (error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }
}

module.exports = AddressService;