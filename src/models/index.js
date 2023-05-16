const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");

Actors.belongsToMany(Movies, { through: "MoviesActors" });
Movies.belongsToMany(Actors, { through: "MoviesActors" });

Directors.belongsToMany(Movies, { through: "MoviesDirectors" });
Movies.belongsToMany(Directors, { through: "MoviesDirectors" });

Genres.belongsToMany(Movies, { through: "MoviesGenres" });
Movies.belongsToMany(Genres, { through: "MoviesGenres" });
