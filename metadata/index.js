const promisify = require('util').promisify;
const fs = require('fs/promises');
const yaml_parse = require('yamljs').parse;
const parse = promisify(yaml_parse);
const glob = promisify(require('glob'));
const mergeFile = require('./merge.json');

const sortFunc = (a, b) => b.count - a.count;

const arrayify = (key, obj, nju) => el => {
  const ob = {
    name: el,
    count: obj[key][el].count
  };

  if (obj[key][el].img) {
    ob.img = obj[key][el].img;
  }

  if (obj[key][el].pos) {
    ob.pos = obj[key][el].pos;
  }

  nju[key].push(ob);
};

const objectify = (key, nju) => el => {
  nju[key][el.name] = nju[key][el.name] || { count: 0 };
  nju[key][el.name].img = nju[key][el.name].img || el.img;
  nju[key][el.name].count++;
};

const mapify = (map) => {
  if (map) {
    const res = /.*#.*\/(.*)\/(.*)/.exec(map);
    if (res.length > 2) {
      return {
        lat: parseFloat(res[1]),
        lng: parseFloat(res[2])
      }
    }
  }
  return undefined;
}

const mergify = (property, metadata, mergeFile) => key => {
  const img = mergeFile[property][key].map(el => {
    if (metadata[property][el] && metadata[property][el].img) {
      return metadata[property][el].img;
    }
  })
    .reduce((prev, curr) => curr || prev);

  const pos = mergeFile[property][key].map(el => {
    if (metadata[property][el] && metadata[property][el].pos) {
      return metadata[property][el].pos;
    }
  })
    .reduce((prev, curr) => curr || prev);

  const count = mergeFile[property][key].map(el => {
    if (metadata[property][el]) {
      const count = metadata[property][el].count;
      delete metadata[property][el];
      return count;
    }
    return 1;
  })
    .reduce((prev, curr) => prev + curr);

  metadata[property][key] = { count: count || 1, img: img, pos: pos };
};

function map(fn) {
  return this.then(function(list) {
    return Promise.all(list.map(fn));
  });
};

Promise.prototype.map = map;

glob('../technologieplauscherl.github.io/_plauscherl/**/*.html')
  .map(file => fs.readFile(file))
  .map(result => result.toString().split('---')[1])
  .map(el => parse(el))
  .then(results => {
    const metadata = {};
    metadata.locations = {};
    metadata.speakers = {};
    results.forEach((el) => {
      const id = el.location.name;

      metadata.locations[id] = metadata.locations[id] || { count: 0 };
      metadata.locations[id].count++;
      metadata.locations[id].pos = el.location.oldmap
        || metadata.locations[id].pos || mapify(el.location.map) || {};

      el.speakers.forEach(objectify('speakers', metadata));
    })
    return metadata;
  })
  .then(metadata => {
    Object.keys(mergeFile.speakers).forEach(mergify('speakers', metadata, mergeFile));
    Object.keys(mergeFile.locations).forEach(mergify('locations', metadata, mergeFile));
    return metadata;
  })
  .then(metadata => {
    var all = { locations: [], speakers: [] };
    Object.keys(metadata.locations).forEach(arrayify('locations', metadata, all));
    Object.keys(metadata.speakers).forEach(arrayify('speakers', metadata, all));
    return all;
  })
  .then(all => {
    all.locations.sort(sortFunc);
    all.speakers.sort(sortFunc);
    return all;
  })
  .then(all => {
    console.log(all);
    console.log('Speakers', all.speakers.length);
    console.log('Locations', all.locations.length);
    return fs.writeFile('dist/metadata.json', JSON.stringify(all, null, '  '));
  })
  .then(() => console.log('Done'));
