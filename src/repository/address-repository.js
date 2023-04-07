const Address = require("../models/address");
const { ValidationError } = require("../utils");

class AddressRepository {
    #findErrorAttributes(error) {
        let errors = {};
        if (error.errors.addressLine) {
            errors.addressLine = error.errors.addressLine.message;
        }

        if (error.errors.city) {
            errors.city = error.errors.city.message;
        }

        if (error.errors.state) {
            errors.state = error.errors.state.message;
        }

        if (error.errors.pincode) {
            errors.pincode = error.errors.pincode.message;
        }

        return errors;
    }

    async create(data) {
        try {
            const address = await Address.create(data);
            console.log(address);
            return address;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);

            if (error.name == "ValidationError") {
                const errorAttributes = this.#findErrorAttributes(error);
                throw new ValidationError(errorAttributes);
            }

            throw error;
        }
    }

    async delete(addressId) {
        try {
            const address = await Address.findByIdAndRemove(addressId);

            if (!address) {
                throw new AppError("ClientError", "Address not found", "Invalid Address id");
            }

            return true;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async get(addressId) {
        try {
            const address = await Address.findById(addressId);

            if (!address) {
                throw new AppError("ClientError", "Address not found", "Invalid data sent in the request");
            }

            return address;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }
}

module.exports = AddressRepository;