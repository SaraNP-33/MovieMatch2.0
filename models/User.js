var bcrypt = require("bcryptjs");


module.exports=function(sequelize, DataTypes){
    var User= sequelize.define("User",{

        email:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                unique:true,
                isEmail:true,
                len:[50]
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false  
        }
        
       
    
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };

      User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
          user.password,
           bcrypt.genSaltSync(10),
           null
         );
       });

      User.associate=function(models){
          User.hasMany(models.MovieUser)
      }

    return User;
}