// Filters ...
////////////////////////////////////////////////////

exports.create_filters = (arguments, pokemonlist) => {
  if (arguments.split(' ')[0] === 'level') {
    const val = [];
    const opr = arguments.split(' ')[1];
    if (!(['>', '<', '=', '>=', '<=', ''].includes(opr))) return null;
    for (pk of pokemonlist) {
      // ...
    }
  }
}