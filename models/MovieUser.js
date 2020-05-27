module.exports=function(sequelize, DataTypes){
    var MovieUser= sequelize.define("Votes",{

        Votes:{
            type:DataTypes.INTEGER,
            allowNull:true,
            validate:{
                len:[1]
            }
        }
       
    
    });
    return MovieUser;
}