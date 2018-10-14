# _ccm_ Components

* See [Digital Maker Space (DMS)](https://ccmjs.github.io/digital-maker-space/)
* See [ccm Wiki](https://github.com/ccmjs/ccm/wiki) what _ccm_ and what a _ccm_ component is.
* See [https://ccmjs.github.io/mkaul-components](https://ccmjs.github.io/mkaul-components) for my components, examples and embed code.
* See [Web Component Cloud (W2C)](https://tkless.github.io/w2c/) for more _ccm_ components

## _ccm_ Components developed by Manfred Kaul

Click on a link for online demo. Include the following HTML code for including the web component into your own web site. 

* [game_chooser](https://ccmjs.github.io/mkaul-components/game_chooser/index.html)
```
 <script src="https://ccmjs.github.io/mkaul-components/game_chooser/ccm.game_chooser.min.js"></script>
 <ccm-game_chooser></ccm-game_chooser>
```
* [geogebra](https://ccmjs.github.io/mkaul-components/geogebra/index.html)
```
 <script src="https://ccmjs.github.io/mkaul-components/geogebra/ccm.geogebra.min.js"></script>
 <ccm-geogebra></ccm-geogebra>
```
* [learning_app](https://ccmjs.github.io/mkaul-components/learning_app/index.html)
```
 <script src="https://ccmjs.github.io/mkaul-components/learning_app/ccm.learning_app.min.js"></script>
 <ccm-learning_app></ccm-learning_app>
```
* [uml](https://ccmjs.github.io/mkaul-components/uml/index.html)
```
 <script src="https://ccmjs.github.io/mkaul-components/uml/ccm.uml.min.js"></script>
 <ccm-uml></ccm-uml>
```
* [upload](https://ccmjs.github.io/mkaul-components/upload/index.html)
```
 <script src="https://ccmjs.github.io/mkaul-components/upload/ccm.upload.min.js"></script>
 <ccm-upload></ccm-upload>
```
* [fine_upload](https://ccmjs.github.io/mkaul-components/fine_upload/index.html)
```
 <script src="https://ccmjs.github.io/mkaul-components/fine_upload/ccm.fine_upload.min.js"></script>
 <ccm-fine_upload></ccm-fine_upload>
```
* [form](https://ccmjs.github.io/mkaul-components/form/index.html)
```
 <script src="https://ccmjs.github.io/mkaul-components/form/ccm.form.min.js"></script>
 <ccm-form></ccm-form>
```

## Multiple Embedding Techniques for HTML including _ccm_ Components

* via HTML tags
```
<script src="https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.0.js"></script>
<ccm-menu-2-4-0 key='["ccm.get","https://ccmjs.github.io/akless-components/menu/resources/configs.js","demo"]'></ccm-menu-2-4-0>
```
* via content und HTML import (attention: JSON-Format with Double Quotes used in HTML attributes)
```
<script src="https://ccmjs.github.io/akless-components/content/ccm.content.js"></script>
<ccm-content inner='[ "ccm.load", "//kaul.inf.h-brs.de/data/2017/se1/le03.html" ]'></ccm-content>

// or as nested Attribut:

<ccm-content>
  <ccm-load-inner src="https://kaul.inf.h-brs.de/data/2017/se1/le00.html"></ccm-load-inner>
</ccm-content>

```
* via content und JavaScript loading HTML
```
<body>
<script src="https://ccmjs.github.io/akless-components/content/ccm.content.js"></script>
<script>
  ccm.start('content',{ root: document.body, inner: [ 'ccm.load', 'https://kaul.inf.h-brs.de/data/2017/se1/le00.html' ] });
</script>

```
* via content und remote config
```
<script src="https://ccmjs.github.io/akless-components/content/ccm.content.js"></script>
<ccm-content key='["ccm.get","https://kaul.inf.h-brs.de/data/2017/se1/json/configs.js", "le04"]'></ccm-content>
```
