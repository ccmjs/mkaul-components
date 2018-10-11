/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    "key": "demo",
    default: 'Bob->Alice : hello',
    style: {
      img: {
        border: 'solid',
        "border-width": '2px'
      },
      textarea: {
        width: '35em',
        height: '18em'
      }
    }
  },
  "class_diagram": {
    "key": "class_diagram",
    default: '@startuml\n' +
    'class Car\n' +
    '\n' +
    'Driver - Car : drives >\n' +
    'Car *- Wheel : have 4 >\n' +
    'Car -- Person : < owns\n' +
    '\n' +
    '@enduml'
  },
  "sequence_diagram": {
    "key": "sequence_diagram",
    default: '@startuml\n' +
    'Alice -> Bob: Authentication Request\n' +
    'Bob --> Alice: Authentication Response\n' +
    '\n' +
    'Alice -> Bob: Another authentication Request\n' +
    'Alice <-- Bob: another authentication Response\n' +
    '@enduml'
  },
  "use_case_diagram": {
    "key": "use_case_diagram",
    default: '@startuml\n' +
    'left to right direction\n' +
    'skinparam packageStyle rectangle\n' +
    'actor customer\n' +
    'actor clerk\n' +
    'rectangle checkout {\n' +
    '  customer -- (checkout)\n' +
    '  (checkout) .> (payment) : include\n' +
    '  (help) .> (checkout) : extends\n' +
    '  (checkout) -- clerk\n' +
    '}\n' +
    '@enduml'
  },
  "component_diagram": {
    "key": "component_diagram",
    default: '@startuml\n' +
    '\n' +
    'interface "Data Access" as DA\n' +
    '\n' +
    'DA - [First Component] \n' +
    '[First Component] ..> HTTP : use\n' +
    '\n' +
    'note left of HTTP : Web Service only\n' +
    '\n' +
    'note right of [First Component]\n' +
    '  A note can also\n' +
    '  be on several lines\n' +
    'end note\n' +
    '\n' +
    '@enduml'
  },
  "activity_diagram": {
    "key": "activity_diagram",
    default: '@startuml\n' +
    '(*) --> "Initialization"\n' +
    '\n' +
    'if "Some Test" then\n' +
    '  -->[true] "Some Activity"\n' +
    '  --> "Another activity"\n' +
    '  -right-> (*)\n' +
    'else\n' +
    '  ->[false] "Something else"\n' +
    '  -->[Ending process] (*)\n' +
    'endif\n' +
    '\n' +
    '@enduml'
  },
  "state_chart": {
    "key": "state_chart",
    default: '@startuml\n' +
    '\n' +
    '[*] --> State1\n' +
    'State1 --> [*]\n' +
    'State1 : this is a string\n' +
    'State1 : this is another string\n' +
    '\n' +
    'State1 -> State2\n' +
    'State2 --> [*]\n' +
    '\n' +
    '@enduml'
  },
  "gantt_chart": {
    "key": "gantt_chart",
    default: '@startgantt\n' +
    '[Task1] lasts 10 days\n' +
    'then [Task2] lasts 4 days\n' +
    '-- Phase Two --\n' +
    'then [Task3] lasts 5 days\n' +
    'then [Task4] lasts 6 days\n' +
    '@endgantt'
  }
};