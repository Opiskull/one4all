function getValidationErrorMessage(body){
    var msgs = [body.message];
    for(var error in body.errors){
        msgs.push(body.errors[error].message);
    }
    return msgs.join('\n');
}

module.exports.jsonErrorResponse = function (req, res, body) {
    if (body instanceof Error) {
        if(body.name === 'ValidationError') {
            res.statusCode = 400;
            body = {
                code: 'ValidationError',
                message: getValidationErrorMessage(body)
            };
        } else {
            // snoop for RestError or HttpError, but don't rely on
            // instanceof
            res.statusCode = body.statusCode || 500;
            if (body.body) {
                body = body.body;
            } else {
                body = {
                    message: body.message
                };
            }
        }
        req.log.error(body);
    } else if (Buffer.isBuffer(body)) {
        body = body.toString('base64');
    }
    var data = JSON.stringify(body);
    res.setHeader('Content-Length', Buffer.byteLength(data));
    return (data);
};