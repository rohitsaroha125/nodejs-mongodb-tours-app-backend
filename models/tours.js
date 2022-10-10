const mongoose = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 10,
      validate: [validator.isAlpha, 'Name should be alphabetic only'],
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    durations: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price
        },
        message: 'Discount price should be less than price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

tourSchema.virtual('durationInWeeks').get(function () {
  return this.durations / 7
})

const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour
