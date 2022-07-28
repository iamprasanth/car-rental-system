// Common function for returning a success response with appropriate data
const succesResponse = (res, data) => {
    res.status(200).json({ success: true, response: data });
}

// Common function for returning an error response with appropriate status code & message
const errorResponse = (res, status, message) => {
    console.log(message);

    res.status(status).json({ success: false, message: message });
}

module.exports = {
    succesResponse,
    errorResponse
}
