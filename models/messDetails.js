const mongoose = require("mongoose");
const MessDetailsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    messAdvance:{
        type:Number,
    },
    manDay:{
        type:Number,
    },
    dietPerDay:{
        type:Number
    },
    specialLunch:{
        type:Number
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Mess", MessDetailsSchema);
