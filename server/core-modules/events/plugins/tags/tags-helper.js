var lodash = require('lodash');

function without(tag1, tag2){
    return tag1.filter(function(tag){
        return tag2.indexOf(tag) === -1;
    });
}

function createTagsChange(oldItem, newItem , user){
    var oldTags = [];
    if(oldItem && oldItem.tags)
        oldTags = lodash.pluck(oldItem.tags, 'text');
    var newTags = [];
    if(newItem && newItem.tags)
        newTags = lodash.pluck(newItem.tags, 'text');
    var removedTags = without(oldTags, newTags);
    var addedTags = without(newTags, oldTags);
    var changed = false;
    if(removedTags.length > 0 || addedTags.length > 0){
        changed = true;
    }
    return {
        added: addedTags,
        removed: removedTags,
        changed: changed,
        user: user
    }
}

function addTags(usedTags, addedTags){
    lodash.each(addedTags,function(tag){
        var usedTag = lodash.find(usedTags,{'text': tag});
        if(!usedTag){
            usedTag = {'text': tag, 'count': 0};
            usedTags.push(usedTag);
            usedTag = lodash.find(usedTags,{'text':tag});
        }
        if(!usedTag.count){
            usedTag.count = 0;
        }
        usedTag.count +=1;
    });
}

function removeTags(usedTags, removedTags){
    lodash.each(removedTags,function(tag){
        var usedTag = lodash.find(usedTags,{'text': tag});
        if(!usedTag) return;
        if(usedTag.count == 1){
            usedTags.splice(usedTags.indexOf(usedTag),1);
        } else{
            usedTag.count -= 1;
        }
    });
}

function executeTagsChange(context) {
    if (!context.user) throw "User not defined!";
    addTags(context.user.usedTags, context.added);
    removeTags(context.user.usedTags, context.removed);
    context.user.save();
}

module.exports = {
    create : createTagsChange,
    execute: executeTagsChange
};