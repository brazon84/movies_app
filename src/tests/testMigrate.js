const sequelize = require('../utils/connection');
require('../models/Actors')
require('../models/Directors')
require('../models/Genres')
require('../models/Movies')
require('../models')


const main = async() => {
    try{
        await sequelize.sync({ force: true });
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();