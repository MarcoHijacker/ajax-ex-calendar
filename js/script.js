// Esercizio Calendario JS

// Descrizione: Creiamo un calendario dinamico con le festività. Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1 - Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2 - Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
// Attenzione! Ogni volta che cambio mese dovrò:
// - Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// - Controllare quanti giorni ha il mese scelto formando così una lista
// - Chiedere all'api quali sono le festività per il mese scelto
// - Evidenziare le festività nella lista
// Consigli e domande del giorno:
// Abbiamo visto assieme una libereria che serve per gestire le date... quale sarà?
// Una chiamata ajax può anche non andare a buon fine, che si fa in quel caso? Lasciamo l'utente ad attendere? ;)
// API: https://flynn.boolean.careers/exercises/api/holidays

// Area init

function init() {
  var currentMonth = moment("2018-01-01");

  printMonth(currentMonth);
  printHoliday(currentMonth);
}

$(document).ready(init);

// Area funzioni

function printMonth(currentMonth) {
  var daysInMonth = currentMonth.daysInMonth();
  var template = $('#template').html();
  var compiled = Handlebars.compile(template);
  var target = $('.month-calendar');

  target.html('');

  for (var i = 1; i <= daysInMonth; i++) {
    var fullDate = moment({
      year: currentMonth.year(),
      month: currentMonth.month(),
      day: i
    });
    var daysHTML = compiled({
      'value': i,
      'fulldate': fullDate.format("YYYY-MM-DD")
    });
    target.append(daysHTML);
  }
}

function printHoliday(currentMonth) {
  var year = currentMonth.year();
  var month = currentMonth.month();
  
  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',
    data: {
      'year': year,
      'month': month
    },
    success: function(data) {
      var success = data['success'];
      var holidays = data['response'];
      if (success) {
        for (var i = 0; i < holidays.length; i++) {
          var element = $("#month-calendar li[data-fulldate='" + holidays[i]["date"] + "']")
          element.addClass('holidays');
          element.append(' ' + holidays[i]['name']);
        }
      } else {
        console.log('error');
      }
    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });

}
