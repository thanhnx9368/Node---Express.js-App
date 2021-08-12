module.exports = {
  multipleMongooseToObject: (mongooesArray) =>
    mongooesArray.map((mongoose) => mongoose.toObject()),

  mongooseToObject: (mongooe) => (mongooe ? mongooe.toObject() : mongooe),
}
