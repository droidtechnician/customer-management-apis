module.exports = (data, removeList, errorMsg) => {
    if (data) {
        const dataRes = JSON.parse(JSON.stringify(data));
        if (removeList && (removeList.constructor === Array) && removeList.length) {
            for (let prop of removeList) {
                console.log(prop);
                delete dataRes[prop];
            }
            delete dataRes['_id'];
            delete dataRes['created_date'];
            delete dataRes['__v'];
            dataRes.resStatus = true;
            console.log(dataRes);
            return dataRes;
        } else {
            return data;
        }
    } else {
        return {resStatus: false, resMsg: errorMsg};
    }
}