// const apiBaseUrl = process.env.API_URL;
const apiBaseUrl = process.env.REACT_APP_API_URL;

exports.apiBaseUrl = apiBaseUrl;
exports.login = apiBaseUrl + 'auth/login/';
exports.register = apiBaseUrl + 'auth/register/';
exports.getCars = apiBaseUrl + 'booking/cars/';
exports.createCheckoutSession = apiBaseUrl + 'booking/checkout/';
exports.getOrderList = apiBaseUrl + 'orders/list';
exports.markAsReturned = apiBaseUrl + 'orders/mark-returned';

exports.getTimeline = apiBaseUrl + 'posts/timeline/';
exports.updateLike = apiBaseUrl + 'posts/like/';
exports.getPost = apiBaseUrl + 'posts/';
exports.newPost = apiBaseUrl + 'posts/';
exports.deletePost = apiBaseUrl + 'posts/';
exports.sendComment = apiBaseUrl + '%postId /comment';
exports.getUserPosts = apiBaseUrl + 'posts/user/';
exports.updateProfile = apiBaseUrl + 'users/';
exports.updateFollowingStatus = apiBaseUrl + 'users/';
// exports.getUsersForAutocomplete = apiBaseUrl + 'users/autocomplete/get';
exports.getUsersForAutocomplete = apiBaseUrl + 'users/autocomplete/';
