exports.formatData = (data) => {

    if (data) {
        const dataRes = JSON.parse(JSON.stringify(data));
        if (dataRes.constructor === Array) {
            for (let item of dataRes) {
                delete item['_id'];
                delete item['__v'];
            }
            return dataRes;
        } else if (dataRes.constructor === Object) {
            delete dataRes['_id'];
            delete dataRes['__v'];
            return dataRes;
        }
    }

}