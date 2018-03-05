// Generator for Radio Buttons

let fragebogen = '';

let words1 = ['','Erster Teampartner','Zweiter Teampartner','Selbsteinschätzung'];
let words2 = ['','Ihren ersten Teampartner (in der alphabetischen Reihenfolge der Accounts, also "amuster" vor "bmaier")','Ihren zweiten Teampartner','sich selbst'];

[1,2,3].map( who => {

  fragebogen += `<h4>6.6.${who} ${words1[who]}</h4>
    <p>Beurteilen Sie <i>${words2[who]}</i>.</p>
`;

  [ 'puenktlich', 'zuverlaessig', 'kooperativ', 'erreichbar', 'effektiv', 'hilfsbereit', 'durchsetzungsstark' ].map( dim => {

    fragebogen += `<p>${dim}: `;
    [1,2,3,4,5,6,7,8,9,10].map( i => {
      fragebogen += `<input type="radio" id="${dim}_${who}_${i}" name="${dim}_${who}" value="${i}">
  <label for="${dim}_${who}_${i}">${i}</label>
`;
    });
    fragebogen += `</p>
`;

  });

  if (who < 3) fragebogen += `<p><input type="checkbox" id="not_${who}_x" name="not_${who}" value="x">
        <label for="not_${who}_x">Kein Teampartner vorhanden</label></p>

`;
});

console.log( fragebogen );





