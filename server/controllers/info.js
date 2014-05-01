// TODO check for partial info load
//module.exports.add = function(server,router,parent,loadParent){
//    server.get(router.getInfo(parent),router.isAuthenticated,loadParent,listInfo);
//    server.post(router.getInfo(parent),router.isAuthenticated,loadParent,createInfo);
//    server.get(router.getInfoId(parent),router.isAuthenticated, loadParent, getInfo);
//    server.del(router.getInfoId(parent),router.isAuthenticated, loadParent, delInfo);
//    server.put(router.getInfoId(parent),router.isAuthenticated,loadParent,updateInfo);
//};
//
//function listInfo(req,res,next){
//    res.json(req.model.infos);
//    return next();
//}
//
//function createInfo(req,res,next){
//    req.model.infos.push(req.body);
//    req.model.save(function(err,model){
//        if(err)
//            return next(err);
//        res.json(model.infos[model.infos.length-1]);
//        return next();
//    });
//}
//
//function getInfo(req,res,next){
//    if(req.model.infos){
//        res.json(req.model.infos.id(req.params.infoid));
//    }
//    return next();
//}
//
//function updateInfo(req,res,next){
//    var info = req.model.infos.id(req.params.infoid);
//    info = req.body;
//    req.model.save(function(err,model){
//        if(err){
//            return next(err);
//        }
//        res.json(model.infos[req.params.infoid]);
//        return next();
//    });
//}
//
//function delInfo(req,res,next){
//    req.model.infos.id(req.params.infoid).remove();
//    req.model.save(function(err,model){
//        if(err) return next(err);
//        res.send();
//        return next();
//    });
//}
