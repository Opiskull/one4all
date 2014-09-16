angular.module('one4all').factory('logger', ['$log','growl', function ($log,growl) {

    function handle400Error(data){
        if(data.name === 'ValidationError'){
            var msgs = [data.message];
            angular.forEach(data.errors, function(item){
                msgs.push(item.message);
            });
            return msgs.join('<br>');
        }
        return "Bad Request";
    }

    function handle401Error(data){
        return "Not Authorized";
    }

    function handleErrorResponse(response){
        if(response.data){
            var msg = '';
            switch(response.status){
                case 0:
                    msg = 'No server connection';
                    break;
                case 400:
                    msg = handle400Error(response.data);
                    break;
                case 401:
                    msg = handle401Error(response.data);
                    break;
            }
        }
        logError(response.data,msg);
    }

    function logError(error,message) {
        if (error)
            $log.error(error);
        if(message)
            growl.error(message);
    }

    function successMessageFromContext(context){
        growl.success(context.moduleTitle + " '"+context.item.title+"' added");
    }

    return {
        handleRestErrorResponse: handleErrorResponse,
        successMessageFromContext: successMessageFromContext,
        error: logError,
        growl: growl
    };
}]);