/**
 * @overview datasets for ccm component peer_builder
 * @version 0.0.1
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019 Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2019 on 25.12.2019.
 */

ccm.files[ 'datasets.js' ] = {

  "demo": {
    "key": "demo",
    "solutions": [
      { "_id": "le05_a1,user1",
        "Einkaufsliste": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Shopping list</title>\n</head>\n<body>\n    <h1>Einkaufsliste</h1>\n    <label>Enter a new item:</label>\n    <input type=\"text\"></input>\n    <button>Add item</button>\n    <ul>\n\n    </ul>\n\n</body>\n\n\n</html>"
      },
      { "_id": "le05_a1,user2",
        "Einkaufsliste": "<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset=\"UTF-8\">\n    </head>\n    <body>\n        <h1>Einkaufsliste</h1>\n\n        <label for=\"textInput\">Enter new item:</label>\n        <input id=\"textInput\" type=\"text\"/>\n        <button id=\"buttonInput\" type=\"button\" onclick=\"addItem()\">Add item</button>\n        <ul id=\"list\">\n\n        </ul>\n    </body>\n    \n</html>"
      },
      { "_id": "le05_a1,user3",
        "Einkaufsliste": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>&hearts; Einkaufsliste</title>\n</head>\n<body>\n    <h1>Einkaufsliste</h1>\n    <label>Enter a new item:</label>\n    <input type=\"text\">\n    <button>Add item</button>\n    <ul></ul>\n\n\n</body>\n</html>"
      }
    ]
  }
};
