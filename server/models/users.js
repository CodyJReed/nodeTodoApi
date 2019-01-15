// Create new collection document model/schema
const User = mongoose.model("Users", {
  email: {
    required: true,
    trim: true,
    type: String,
    minlength: 1
  }
});
