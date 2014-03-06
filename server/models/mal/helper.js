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

function parseMalObject(input,schema,cb){
    input.start_date = parseDate(input.start_date);
    input.end_date = parseDate(input.end_date);
    var synonyms = [];
    input.synonyms.split(';').forEach(function(item){
        synonyms.push(item.trim());
    });
    input.synonyms = synonyms;

    var malItem = new schema(input);
    malItem.save(cb);
}

exports.parseMalObject = parseMalObject;
