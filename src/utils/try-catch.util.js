// old wway of try catch before express v5

export default (func) =>{
  return function (req, res , next){
    try{
      const result = func(req, res, next);
      if(result && typeof result.then === 'function'){
        result.catch(next);
      } 
    }catch(err){
      next(err);
    }
  }
}