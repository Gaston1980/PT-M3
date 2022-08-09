function sumArray(array, n) { // estas variables se pueden llamar como queramos, solo deben representar bien lo que van a recibir por req.body
    if (!Array.isArray(array)) throw new TypeError('array');
    if(typeof n !== 'number') throw new TypeError('number');
    for(var i = 0; i < array.length ; i ++) {
      for(var j = i + 1; j < array.length ; j ++) {
        if ( array[i] + array[j] === n) return true;
      }
    }
    return false;
};

function pluck(array, prop) {
  return array.map(e => e[prop]) // recorre el array de objetos, y en cada uno toma el valor de la propiedad pasada x parametro
}                                  // devulve un nuevo array con los valores sin modificar el array original

module.exports = {
    sumArray, 
    pluck
}