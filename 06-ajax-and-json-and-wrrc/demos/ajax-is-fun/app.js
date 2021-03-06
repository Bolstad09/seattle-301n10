const url = 'https://server-wuvttyijde.now.sh/books';
  
// Why am I doing this here?
const bookTemplate = $('#book-template').text();
const bookRender = Handlebars.compile(bookTemplate);

$('#get-books').on('click', getBooks);

$('#make-book-form').on('submit', function(event) {
    event.preventDefault();
    makeBook();
});

function getBooks() {
    
    $.getJSON(url)
        .then(books => {
            console.log('Total Books:', books.length);

            $('ul').empty();

            books.forEach(book => {
                console.log(book);
                $('ul').append(bookRender(book));
            });
        });
}

function makeBook() {

    const book = $('#make-book-form').serialize(); // how handy!

    $('#make-book-form')[0].reset(); // note the [0]

    $.post(url, book).then((data, status) => {
        console.log('status', status);
        getBooks();
    });

}


// AJAX Formats

/* FORMAT OF $.ajax
$.ajax({
    url:
    method:
    success:
    fail:
  })
  
  // FORMAT OF $.get
  $.get(url)
    .done(successCallback)
    .fail(failureCallback)
    .always(everyTimeCallback)
    .then(nextCallback)
  
  // FORMAT OF $.getJSON
  $.getJSON(url)
    .then(successCallback, failureCallback)
*/

/*
$.getJSON('data/invalid-data.json')
    .then(data => console.log(data))
    .catch(err => console.error(err))
    .always(result => console.log('always runs'));
*/

// BONUS: Star Wars if Fun!
// $.get('https://swapi.co/api/people/1')
//     .then(result => console.log(result));