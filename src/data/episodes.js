const Series = require("./series");
module.exports = Series.map(s => s.episodes).reduce((a, b) => a.concat(b));
