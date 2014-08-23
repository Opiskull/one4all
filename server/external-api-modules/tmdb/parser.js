function parseDate(input) {
    if (!input) {
        return undefined;
    }
    var array = input.split("-");
    if (array[0] === '0000')
        return undefined;
    if (array[1] === '00')
        array[1] = '01';
    if (array[2] === '00')
        array[2] = '01';
    return array.join("-");
}

function parseTitle(input) {
    var output = {};
    output.title = input.title;
    output.lang = input.iso_3166_1;
    return output;
}

function parseTitles(input) {
    var output = [];
    if (input.titles) {
        input.titles.forEach(function (item) {
            output.push(parseTitle(item));
        });
    }
    return output;
}

function parseMovie(output, input) {
    output.adult = input.adult;
    output.id = input.id;
    output.title = input.title;
    output.release_date = parseDate(input.release_date);
    output.img = input.poster_path;
    output.description = input.overview;
    output.status = input.status;
    output.imdb_id = input.imdb_id;
    output.titles = parseTitles(input.alternative_titles)
}

function parseSerie(output, input) {
    output.id = input.id;
    output.title = input.name;
    output.first_air_date = parseDate(input.first_air_date);
    output.img = input.poster_path;
    output.seasons = input.number_of_seasons;
    output.episodes = input.number_of_episodes;
    output.status = input.status;
    output.description = input.overview;
}

exports.parseMovie = parseMovie;
exports.parseSerie = parseSerie;
