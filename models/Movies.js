module.exports=function(sequelize, DataTypes){
    var Movies= sequelize.define("Movies",{

        movieTitle:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        moviePoster:{
            type:DataTypes.STRING,
            allowNull:false
        },
        moviePlot:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        movieGenre:{
            type:DataTypes.STRING,
            allowNull:false  
        },
        movieYear:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        
       
    
    });
    return Movies
}