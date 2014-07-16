function parseBook(output,input){
    output.id = input.id;
    if(input.volumeInfo){
        output.title = input.volumeInfo.title;
        output.authors = input.volumeInfo.authors;
        output.publisher = input.volumeInfo.publisher;
        output.publishedDate = input.volumeInfo.publishedDate;
        output.description = input.volumeInfo.description;
        output.page_count = input.volumeInfo.pageCount;
        output.language = input.volumeInfo.language;
        if(input.volumeInfo.imageLinks){
            output.img = input.volumeInfo.imageLinks.thumbnail;
        }
        if(input.volumeInfo.industryIdentifiers){
            output.isbn_13 = parseISBN13(input.volumeInfo.industryIdentifiers);
            output.isbn_10 = parseISBN10(input.volumeInfo.industryIdentifiers);
        }
    }

}

function parseISBN13(items){
    return parseISBN(items,'ISBN_13');
}

function parseISBN(items,type){
    var value;
    items.forEach(function(item){
        if(item.type === type)
            value = item.identifier;
    });
    return value;
}

function parseISBN10(items){
    return parseISBN(items,'ISBN_10');
}

exports.parseBook = parseBook;