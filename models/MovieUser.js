module.exports=function(sequelize, DataTypes){
    var MovieUser= sequelize.define("MovieUser",{

        votes:{
            type:DataTypes.INTEGER,
            allowNull:true,
            validate:{
                len:[1]
            }
        }
       
    
    });
    
 MovieUser.associate=function(models){
     MovieUser.belongsTo(models.User)
     MovieUser.belongsTo(models.Movies)
 }

    return MovieUser;
}