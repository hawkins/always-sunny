import Series from "./series";
export default Series.map(s => s.episodes).reduce((a, b) => a.concat(b));
