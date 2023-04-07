const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
            }
        }
    ]
}, { timestamps: true });

cartSchema.virtual('listOfItems', {
    ref: 'Item',
    localField: 'items._id',
    foreignField: '_id'
});

cartSchema.set('toJSON', { virtuals: true });
cartSchema.set('toObject', { virtuals: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;