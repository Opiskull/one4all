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

function parseTmdbObject(input,schema,cb){
    var tvdbItem = new schema(input);
    tvdbItem.save(cb);
}

exports.parseTmdbObject = parseTmdbObject;
exports.parseDate = parseDate;
