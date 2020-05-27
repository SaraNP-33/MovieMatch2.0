module.exports=function(sequelize, DataTypes){
    var User= sequelize.define("Users",{

        Name:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false  
        }
        
       
    
    });
    return User
}