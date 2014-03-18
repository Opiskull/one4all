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

exports.parseTitles = parseTitles;
exports.parseDate = parseDate;
