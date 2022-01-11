const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

let aujourdhui = new Date();
let options = {weekday:'long'};
let jourActuel = aujourdhui.toLocaleDateString('fr-Fr', options);
// console.log(jourActuel, aujourdhui);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

/* on découpe la semaine en un tableau allant du jour actuel jusqu'à la fin de la semaine, auquel on concatène un tableau allant du début de la semaine au jour actuel.*/
let joursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
console.log(joursEnOrdre);

export default joursEnOrdre;
