/** 
Funcție auxiliară pentru formatrarea numarului afisat in balanta si in Sum (amount). 
-Se grupeaza cate de 3 cifre despartite de un mic spatiu.
-Limitare la 2 zecimale.
*/

export function formatNumberWithSpaces(number) {
  // Limităm numărul la două zecimale:
  const roundedNumber = Number(number).toFixed(2);

  // Separăm partea întreagă de cea zecimală:
  const parts = roundedNumber.split(".");

  // Formatăm partea întreagă cu spații:
  const integerPartWithSpaces = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Returnăm numărul formatat cu spații și două zecimale:
  return `${integerPartWithSpaces}.${parts[1]}`;
}
