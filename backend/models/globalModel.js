const globalModel = {
    successResponse: (data) => {
        return {
            status: "success",
            message: data,
        };
    },
    failureResponse: (data) => {
        return {
            status: "failure",
            message: data,
        };
    },
}


module.exports = globalModel