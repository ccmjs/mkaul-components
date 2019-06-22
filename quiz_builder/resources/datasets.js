
/**
 * @overview datasets for ccm component quiz_builder
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 21.06.2019.
 */

ccm.files[ 'datasets.js' ] = {

  "small": {
    "key": "small",
    "questions": [
      {
        "Frage": "Was ist ein Vorteil des Strukturmusters Kompostium?",
        "Antwort1": "Das Strukturmuster Kompositum erlaubt es, verschachtelte Strukturen auf einfache\nWeise zu erzeugen bzw. um neue Blatt- bzw. Kompositum-Klassen zu erweitern.",
        "Antwort2": "Design und der Aufbau der Baumstruktur sind immer übersichtlich, auch wenn man\nviele unterschiedliche Blatt- und Kompositionsklassen verwendet.",
        "Fehler2": "Wenn man viele unterschiedliche Blatt- und Kompositionsklassen verwendet, wird die Struktur des Kompositum sehr unübersichtlich. Jedes neue Blatt bzw. Kompostium muss also wohl überlegt sein.",
        "Antwort3": "Man kann beliebige Änderungen vornehmen.\n",
        "Fehler3": "Sobald Änderungen an der Basisschnittstelle durchgeführt werden, wie z. B. das Hinzufügen einer neuen\nMethode, bedeutet dies auch, dass alle davon abgeleiteten Klassen potenziell ebenfalls geändert werden müssen. Änderungen können also schwerwiegende Folgen mit sich tragen."
      },
      {
        "Frage": "Welches Problem möchte das Composite-Pattern lösen?",
        "Antwort1": "Antwort: Man möchte Objekte einer Hierarchie in einer Baum-Ähnlichen Struktur speichern, ohne dem Client die Zugrundeliegende Struktur offen zu legen",
        "Antwort2": "Man möchte mit Hilfe des Composite-Patterns Funktionalität dynamisch bilden",
        "Fehler2": "Das ist mit dem Composite-Pattern so nicht möglich, dafür wird das Dekorierer-Muster benötigt. Wenn man im Composite-Pattern an der obersten Stelle der Struktur etwas verändert muss das für alle unteren Objekte auch geändert werden, daher ist das Pattern relativ starr.",
        "Antwort3": "Man möchte starre Objekte erschaffen, auf die nur komplett zugegriffen werden kann.",
        "Fehler3": "Das Composite-Pattern ist an an sich schon veränderbar, allerdings mit Aufwand. Für Starre strukturen, auf die man nur als ganzes Zugreifen kann (Beispiel: Auto, alle Autos bestehen grundsätzlich aus Motor, Fahrwerk, getriebe, etc.) gibt es das Whole-Pattern oder Assembly-Parts Pattern"
      }
    ]
  }
};
