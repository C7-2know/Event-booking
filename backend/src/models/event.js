const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Music',
            'Sports',
            'Arts & Culture',
            'Food & Drink',
            'Health & Wellness',
            'Technology',
            'Education',
            'Community & Charity',
            'Travel & Adventure',
            'Fashion & Beauty',
            'Film & Entertainment',
            'Gaming',
            'Science & Innovation',
            'Politics & Activism',
            'Religious & Spiritual'
        ]
    },
    eventType: {
        type: String,
        enum: ['Online', 'Indoor', 'Outdoor'],
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true,
        trim: true
    },
    locationAddress: {
        type: String,
        required: true,
        trim: true
    },
    locationCity: {
        type: String,
        required: true,
        trim: true
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    availabelSeats: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Event", eventSchema);