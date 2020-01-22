class MonacoEditor extends HTMLElement {
    get frame() {
        if (this._frame == null) {
            this._frame = this.querySelector("iframe");
        }
        return this._frame;
    }
    
    set frame(newValue) {
        this._frame = newValue;
    }
    
    get language() {
        if (this._language == null) {
            this._language = this.getAttribute("language") || "javascript";
        }
        return this._language;
    }

    set language(newValue) {
        this._language = newValue;
    }

    get showMiniMap() {
        return this._showMiniMap || this.getAttribute("show-minimap") || true;
    }

    set showMiniMap(newValue) {
        this._showMiniMap = newValue;
    }
    
    get monaco() {
        return this.frame.contentWindow.monaco;
    }
    
    get editor() {
        return this._editor;
    }

    set editor(newValue) {
        this._editor = newValue;
    }
    
    get value() {
        return this.editor.getValue();
    }

    get monacoHtml() {
        return this.getAttribute('html') || import.meta.url.replace(".js", "-inner.html");
    }

    get autoLoad() {
        return this.getAttribute("auto-load") == "true";
    }
    
    set value(newValue) {
        this._value = newValue;
        this.update();
    }

    get delayEditor() {
        return this.getAttribute("delay") == "true" ? true : false;
    }

    get theme() {
        if (this._theme == null) {
            this._theme = this.getAttribute("theme");
        }
        return this._theme;
    }

    set theme(newValue) {
        this._theme = newValue;
    }

    // Try and crate the editor here instead of in the html
    update() {
        const model = this.monaco.editor.createModel(this._value);
        model.getLanguageIdentifier();
        this.monaco.editor.setModelLanguage(model, this.language);

        if (this.theme != null) {
            this.monaco.editor.setTheme(this.theme);
        }

        this.editor.setModel(model);
        this.editor.updateOptions({
            minimap: {
                enabled: this.showMiniMap
            },
            parameterHints: {
                enabled: true,
                cycle: true
            }
        })
    }
    
    async connectedCallback() {
        const componentHTML = import.meta.url.replace(".js", ".html");
        this.innerHTML = await fetch(componentHTML).then(result => result.text());

        if (this.autoLoad == true) {
            const innerHTML = this.monacoHtml;
            this.loadInnerPage(innerHTML);
        }

        this.dispatchEvent(new CustomEvent("ready"));
    }
    
    disconnectedCallback() {
        this.frame = null;
        this.innerHTML = "";
        this.editor = null;
        this.monaco = null;
        this.frame = null;
    }

    loadInnerPage(path) {
        this.frame.onload = () => {
            this.frame.onload = null;
            this._frameLoaded();
        };
        this.frame.src = path;
    }

    _frameLoaded() {
        this.loadEditor();
        this.dispatchEvent(new CustomEvent("loaded", {
            detail: {
                monaco: this.monaco,
                editor: this.editor
            }
        }));
    }


    loadEditor() {

        const options = {
            language: this.language,
            minimap: {
                enabled: this.showMiniMap
            },
            parameterHints: {
                enabled: true,
                cycle: true
            }
        };

        if (this.theme != null) {
            options.theme = this.theme;
        }

        this.editor = this.monaco.editor.create(this.frame.contentDocument.querySelector("#container"), options);
    }
}

customElements.define("crs-monaco-editor", MonacoEditor);