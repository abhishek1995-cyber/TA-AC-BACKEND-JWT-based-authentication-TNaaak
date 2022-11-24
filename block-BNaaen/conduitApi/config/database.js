var mongoose = require('mongoose');


module.exports.connect = function(){
  mongoose.connect('mongodb://localhost/conduitApi',(err)=>{
  console.log(err ? err : "Connected");
})
}
