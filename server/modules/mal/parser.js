function parseDate(input){
    var array = input.split("-");
    if(array[0] === '0000')
        return undefined;
    if(array[1]=== '00')
        array[1] = '01';
    if(array[2]==='00')
        array[2]='01';
    return array.join("-");
}

function parseTitles(input){
    var titles = [];
    input.split(';').forEach(function(item){
        var title = {};
        title.title = item.trim();
        if(title.title !== '')
            titles.push(title);
    });
    return titles;
}

function parseDescription(input){
    return input.replace(/(\r\n|\n|\r)/gm,"").replace(/<br ?\/?>/g,"<br>");
}

function parseAnime(output,input){
    output.id = input.id;
    output.title = input.title;
    output.titles = parseTitles(input.synonyms);
    output.episodes = input.episodes;
    output.status = input.status;
    output.start_date = parseDate(input.start_date);
    output.end_date = parseDate(input.end_date);
    output.description = parseDescription(input.synopsis);
    output.img = input.image;
}

function parseManga(output,input){
    output.id = input.id;
    output.title = input.title;
    output.titles = parseTitles(input.synonyms);
    output.chapters = input.chapters;
    output.volumes = input.volumes;
    output.status = input.status;
    output.start_date = parseDate(input.start_date);
    output.end_date = parseDate(input.end_date);
    output.description = parseDescription(input.synopsis);
    output.img = input.image;
}

exports.parseManga = parseManga;
exports.parseAnime = parseAnime;
