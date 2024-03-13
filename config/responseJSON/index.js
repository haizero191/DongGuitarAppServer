const responseJSON = (message, data, success) => {
    return {
        success: success,
        message: message,
        data: data
    }
}


module.exports = responseJSON;