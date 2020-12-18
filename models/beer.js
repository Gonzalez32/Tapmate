const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
    {
        reviewer: String,
        reviewerPhoto: String,
        rating: { type: Number, min: 1, max: 10 },
        content: String,
    },
    {
        timestamps: true,
    }
);

const beerSchema = new Schema(
    {
        id: Number,
        name: String,
        tagline: String,
        first_brewed: Date,
        description: String,
        image_url: String,
        favoritedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
        reviews: [reviewSchema],
    },{
        timestamps: true,
    }
);

module.exports = mongoose.model("Beer", beerSchema);