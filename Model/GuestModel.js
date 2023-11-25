const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
    },

    Email: {
      type: String,
      trim: true,
    },

    ContactNum: {
      type: String,
      trim: true,
    },

    Role: {
      type: Number,
    },

    IsActive: {
      type: Number,
      default: 1,
    },
    timeslot: {
      from: String,
      to: String,
    },
    duration: Number,
    sport: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sports",
    },
    SportComplexId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sportscomplexes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
