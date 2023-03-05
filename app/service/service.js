let service = {};

service.save = (item) => {
    return item.save();
};

service.findOne = (collection, search) => {
    return collection.findOne(search);
}

service.findOneAndUpdate = (collection, search, change1, change2) => {
    if(change2) return collection.findOneAndUpdate(search, change1, change2);
    return collection.findOneAndUpdate(search, change1);
}

module.exports = service;
