const { books } = require('./books');
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
    //Payload Data
    const { title, year, publisher, author } = request.payload;

    const id = nanoid(8);

    const newBook = {
        id,
        title,
        year,
        publisher,
        author
    }

    //Book Validation
    const bookTitleCheck = () =>{
        if(title === undefined){
            return true;
        }
        if(title.length != 0){
            return false;
        }else{
            return true;
        }
    };

    console.log(bookTitleCheck())

    //Checking Book Title is Valid
    if(!bookTitleCheck()){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
                title: title,
                year: year,
                publisher: publisher,
                author: author
            },
        });
        response.code(201);
        books.push(newBook);
        return response;
    }
    if(bookTitleCheck()){
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    const response = h.response({
        status : "error",
        message : "Buku gagal ditambahkan"
    });
    response.code(500);
    return response;
}

const getAllBooksHandler = (request, h) => {
    //Check if Books is not null 
    if(books.length != 0){
        const response = h.response({
            status: 'success',
            message: 'Berhasil menampilkan list buku',
            data: {
            books: books.map((book) => ({
                id: book.id,
                title: book.title,
                publisher: book.publisher,
                year: book.year
              })),
            },
        });
        response.code(200);
        return response;
    }
    //Check if Books is null
    if(books.length == 0){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menampilkan list buku. Mohon masukkan buku terlebih dahulu!'
        });
        response.code(400);
        return response;
    }
    const response = h.response({
        status : "error",
        message : "Buku gagal ditambahkan"
    });
    response.code(500);
    return response;
}

const getBookDetailHandler = (request, h) =>{
    //Getting Book ID
    const { id } = request.params;

    //Getting Book by ID
    const bookById = books.filter((book) => book.id === id)[0];

    //Showing Book Detail
    if(bookById !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                book: bookById
            }
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
    })
    response.code(404);
    return response;
}

const updateBookHandler = (request, h) => {
    //Getting Book ID
    const { id } = request.params;

    //Getting New Book Data
    const { title, year, publisher, author } = request.payload;

    //Book Validation
    const bookTitleCheck = () =>{
        if(title === undefined){
            return true;
        }
        if(title.length != 0){
            return false;
        }else{
            return true;
        }
    };

    //Check If Book is Not Valid
    if(bookTitleCheck()){
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    //If Book Valid
    if(!bookTitleCheck()){
        //Getting Book Index
        const bookIndex = books.findIndex((book) => book.id === id);

        if(bookIndex !== -1){
            books[bookIndex] = {
                ...books[bookIndex],
                title,
                year,
                publisher,
                author
            };

            const response = h.response({
                status: "success",
                message: "Buku berhasil diperbarui"
            });
            response.code(200);
            return response;
        }
    }

    const response = h.response({
        status : "fail",
        message : "Gagal memperbarui buku. Id tidak ditemukan"
    });
    response.code(404);
    return response;
}

const deleteBookHandler = (request, h) => {
    //Getting Book ID
    const { id } = request.params;

    //Getting Book Index
    const bookIndex = books.findIndex((book) => book.id === id);

    //Deleting The Book
    if (bookIndex !== -1){
        books.splice(bookIndex, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    //Book Not Found
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = { addBookHandler, getAllBooksHandler, getBookDetailHandler, updateBookHandler, deleteBookHandler }