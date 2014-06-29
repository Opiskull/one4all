function parseDate(input){
    if(!input){
        return undefined;
    }
    var array = input.split("-");
    if(array[0] === '0000')
        return undefined;
    if(array[1]=== '00')
        array[1] = '01';
    if(array[2]==='00')
        array[2]='01';
    return array.join("-");
}

function parseTitle(input){
    var output = {};
    output.title = input.title;
    output.lang = input.iso_3166_1;
    return output;
}

function parseTitles(input){
    var output = [];
    if(input.titles) {
        input.titles.forEach(function (item) {
            output.push(parseTitle(item));
        });
    }
    return output;
}

function parseTmdbObject(input,schema,cb){
    var tvdbItem = new schema(input);
    tvdbItem.save(cb);
}

exports.parseTmdbObject = parseTmdbObject;
exports.parseDate = parseDate;
exports.parseTitles = parseTitles;
