module.exports = (data, removeList, errorMsg) => {
    if (data) {
        const dataRes = JSON.parse(JSON.stringify(data));
        if (removeList && (removeList.constructor === Array) && removeList.length) {
            for (let prop of removeList) {
                delete dataRes[prop];
            }
            delete dataRes['_id'];
            delete dataRes['created_date'];
            delete dataRes['__v'];
            dataRes.resStatus = true;
            return dataRes;
        } else {
            data.resStatus = true;
            return data;
        }
    } else {
        return { resStatus: false, resMsg: errorMsg };
    }
}