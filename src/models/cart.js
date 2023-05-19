const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            itemId: {
                type: String,
                req: true,
            },
            quantity: {
                type: Number,
                require: true,
            },
            _id: false,
        }
    ]
}, { timestamps: true });

cartSchema.virtual('listOfItems', {
    ref: 'Item',
    localField: 'items.itemId',
    foreignField: '_id',
});

cartSchema.set('toJSON', { virtuals: true });
cartSchema.set('toObject', { virtuals: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;