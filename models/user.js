const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, default: "Ivan" },
  age: { type: Number, min: 18, index: true },
  createdAt: { type: Date, default: Date.now },
  visited: [
    {
      id: String,
      imgUrl: String,
      name: String,
      capital: String,
      continent: String,
    },
  ],
  password: String,
  email: String,
});

module.exports = model("User", userSchema);

// bio: { type: String, match: /[a-z]/ },
