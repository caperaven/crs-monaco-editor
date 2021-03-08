# Depreciated.

This is overly complex.
A new, simpler version can be found in crs-components.


# CRS Monaco Editor

## Introduction
This is a web component that encapsulates the monaco editor in a custom element for modular use.  
This is a vanilla web component and is not extensive at all, i just creates a web component wrapper around monaco.

A small detail but a important one is that the component relies on es6 modules so please load the script using a module script.
See the examples below for details.

## Usage

```html
<crs-monaco-editor id="editor"></crs-monaco-editor>
<script type="module" src="./path/crs-monaco-editor.js"></script>
```

Please note that this is a blank canvas.
You can set the language attribute to a supported monaco language but there are no features enabled or disabled by default.

If you want to bring certain language features to the front you can write a separate component that modifies editor.

## Extending the default behaviour

This component dispatches a custom event called "loaded" when it has loaded all it's required resources and is ready to be coded against.

1. Create a custom element and give it a for attribute with the id of the crs-monaco-editor.
1. On connected callback lookup the crs-monaco-editor and set a event listener for the "loaded" event.
1. On the loaded event, commence with your add on code.

```html
<schema-editor for="editor"></schema-editor>
<script type="module" src="./path/schema-editor.js"></script>
``` 

consider the following code as a sample loaded event handler

```js
_loaded(event) {
    this.monaco = event.detail.monaco;
    this.editor = event.detail.editor;
    this.parent.removeEventListener("loaded", this._loadedHandler);

    this.parent.language = "json";
    this.parent.value = documentText.trim();
    this.monaco.languages.registerCompletionItemProvider('json', {
        provideCompletionItems: this._provideCompletionItemsHandler
    });
}
```

In the above example the parent element is the crs-monaco-editor initialised during the connected callback.  
Note that the event's detail object sends back the monaco object and instance of the editor.

If you want to set the language, you can just set the language property on the crs-monaco-editor element.  
To set the value / text on the editor, set the value property on the crs-monaco-editor.  
If you want the value of the changed text, you can just read the value property again.   
It will extract that from the monaco editor and pass it back to you.  

## Extensions
With this component there is also a sample extension in the extensions folder.

Too put them together you can just do the following.

```html
<crs-monaco-editor id="editor"></crs-monaco-editor>
<schema-editor for="editor"></schema-editor>

<script type="module" src="./pathToCode/crs-monaco-editor.js"></script>
<script type="module" src="./pathToCode/extensions/schema-editor.js"></script>
```

## Monaco not in node modules?
This component ships with two html files that it uses.  
You can edit these to alter the behaviour as required.

Monaco was never written to play nice with es6 modules.  
To make it play nice in this component, it is hosted in a iframe.  
The html that gets loaded in that iframe is crs-monaco-editor-inner.html.  
You can find this file along with the the components source file.    
You can edit this file to your liking to fit your needs. 

If you have moved your monaco source other than node_modules or want a different load strategy, go alter that file to your hears content.

## Show and hide minimap
crs-monaco-editor has a attribute for you to affect the visibility of the minimap (bar on the right).
If you want to hide the minimap you can set the show-minimap attribute to false. 

```html
<crs-monaco-editor id="editor" show-minimap="false"></crs-monaco-editor>
```

The minimap visibility is set when you set the value.  
If you do not set the attribute it will show by default.

You can also initialize this by default in the crs-monaco-editor-inner.html like this:

```js
window.editor = monaco.editor.create(document.getElementById('container'), {
    minimap: {
        enabled: true
    }
});
```

