
/**
 * @overview configs of ccm component quiz_builder
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 21.06.2019.
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    data: {
      "store": [ "ccm.store", '../resources/datasets.js' ],
      "key": "small"
    },
    // Mapping of names in the form, in which questions and answers have been collected, to the names in this component
    mapping: {
      question: 'Frage',
      answer1: 'Antwort1',
      answers: [
        { text: 'Antwort2', comment: 'Fehler2' },
        { text: 'Antwort3', comment: 'Fehler3' }
      ]
    },

    description: "Wählen Sie die korrekte Antwort aus: ",
    min_length: 10,
    selection_type: "radio",
    log_small: true,

    quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js", {
      shuffle: true,
      random: true,
      skippable: true,
      show_results: false,
      start_button: true,
      feedback: true,
      navigation: true,
      onfinish: { "restart": false, "store": true },
      css: [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
      data: {
        "store": [ "ccm.store", { "name": "se_ss19_solutions", "url": "https://ccm2.inf.h-brs.de" } ],
        "key": "le11_a1"
      },
      placeholder: {
        "start": "Quiz starten",
        "question": "Frage",
        "correct": "Korrekte Lösung: ",
        "prev": "Zurück",
        "submit": "Auflösung",
        "next": "Nächste Frage",
        "finish": "Beenden"
      },
      "html.question.inner.0.inner.0.inner": "Frage"
    } ],

    user: [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.1.js", {
      "realm": "hbrsinfpseudo", "logged_in": true } ]
  }
};
