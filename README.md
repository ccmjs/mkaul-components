# _ccm_ Components

* See [github.com/akless/ccm](https://github.com/akless/ccm) what _ccm_ and what a _ccm_ component is.
* See [mkaul.github.io/ccm-components](https://mkaul.github.io/ccm-components) for examples and embed code.
* See [Web Component Cloud](https://akless.github.io/w2c/) for more _ccm_ components

## _ccm_ Components developed by Manfred Kaul

Click on a link for online demo. Include the following HTML code for including the web component into your own web site. 

* [game_chooser](https://mkaul.github.io/ccm-components/game_chooser/index.html)
```
 <script src="https://mkaul.github.io/ccm-components/game_chooser/ccm.game_chooser.min.js"></script>
 <ccm-game_chooser></ccm-game_chooser>
```
* [geogebra](https://mkaul.github.io/ccm-components/geogebra/index.html)
```
 <script src="https://mkaul.github.io/ccm-components/geogebra/ccm.geogebra.min.js"></script>
 <ccm-geogebra></ccm-geogebra>
```
* [learning_app](https://mkaul.github.io/ccm-components/learning_app/index.html)
```
 <script src="https://mkaul.github.io/ccm-components/learning_app/ccm.learning_app.min.js"></script>
 <ccm-learning_app></ccm-learning_app>
```
* [uml](https://mkaul.github.io/ccm-components/uml/index.html)
```
 <script src="https://mkaul.github.io/ccm-components/uml/ccm.uml.min.js"></script>
 <ccm-uml></ccm-uml>
```
* [upload](https://mkaul.github.io/ccm-components/upload/index.html)
```
 <script src="https://mkaul.github.io/ccm-components/upload/ccm.upload.min.js"></script>
 <ccm-upload></ccm-upload>
```
* [fine_upload](https://mkaul.github.io/ccm-components/fine_upload/index.html)
```
 <script src="https://mkaul.github.io/ccm-components/fine_upload/ccm.fine_upload.min.js"></script>
 <ccm-fine_upload></ccm-fine_upload>
```
* [form](https://mkaul.github.io/ccm-components/form/index.html)
```
 <script src="https://mkaul.github.io/ccm-components/form/ccm.form.min.js"></script>
 <ccm-form></ccm-form>
```

## Multiple Embedding Techniques for HTML including _ccm_ Components

* via loader
```
<script src="//kaul.inf.h-brs.de/data/ccm/loader/ccm.loader.js"></script><ccm-loader nr="1"></ccm-loader>
```
* via content und HTML (attention: JSON-Format!)
```
<script src="//akless.github.io/ccm-components/content/ccm.content.js"></script>
<ccm-content inner='[ "ccm.load", "//kaul.inf.h-brs.de/data/2017/se1/le00.html" ]'></ccm-content>

// or as nested Attribut:

<ccm-content>
  <ccm-load-inner src="https://kaul.inf.h-brs.de/data/2017/se1/le00.html"></ccm-load-inner>
</ccm-content>
```
* via content und JavaScript loading HTML
```
<body>
<script src="https://akless.github.io/ccm/ccm.js"></script>
<script src="https://akless.github.io/ccm-components/content/ccm.content.js"></script>
<script>
  ccm.start('content',{ root: document.body, inner: [ 'ccm.load', 'https://kaul.inf.h-brs.de/data/2017/se1/le00.html' ] });
</script>
```
* via content und JSON config
```
<script src="https://akless.github.io/ccm-components/content/ccm.content.js"></script>
<ccm-content key='["ccm.get","https://kaul.inf.h-brs.de/data/2017/se1/json/configs.js", "le04"]'></ccm-content>
```
* via ccm.form.js loading a remote config
```
<script src="https://kaul.inf.h-brs.de/data/ccm/form/ccm.form.js"></script>
<ccm-form key='["ccm.get","https://kaul.inf.h-brs.de/data/2017/se1/json/forms.js", "orga_profil"]'></ccm-form>
```