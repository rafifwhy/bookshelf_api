const { getAllBooksHandler, addBookHandler, getBookDetailHandler, updateBookHandler, deleteBookHandler } = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookDetailHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookHandler
    }
];

module.exports = routes;