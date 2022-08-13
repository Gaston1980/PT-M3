function* fizzBuzzGenerator(max = 100) {
  // Tu código acá:
  let counter = 1; //2

  while(counter <= max ) { 
  //while(max ? counter <= max : true) {
    if(counter % 3 === 0 && counter % 5 === 0) yield 'Fizz Buzz';
    else if(counter % 3 === 0) yield 'Fizz';
    else if(counter % 5 === 0) yield 'Buzz';
    else yield counter;
    counter++
  }
}

module.exports = fizzBuzzGenerator;
