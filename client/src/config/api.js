// const apiBaseUrl = process.env.API_URL;
const apiBaseUrl = process.env.REACT_APP_API_URL;

exports.apiBaseUrl = apiBaseUrl;
exports.login = apiBaseUrl + 'auth/login/';
exports.register = apiBaseUrl + 'auth/register/';
exports.getCars = apiBaseUrl + 'booking/cars/';
exports.createCheckoutSession = apiBaseUrl + 'booking/checkout/';
exports.getOrderList = apiBaseUrl + 'orders/list';
exports.markAsReturned = apiBaseUrl + 'orders/mark-returned';
