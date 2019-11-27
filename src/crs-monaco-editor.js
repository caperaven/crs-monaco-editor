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
        return this.frame.contentWindow.editor;
    }
    
    get value() {
        return this.editor.getValue();
    }
    
    set value(newValue) {
        const model = this.monaco.editor.createModel(newValue);
        model.getLanguageIdentifier();
        this.monaco.editor.setModelLanguage(model, this.language);
        this.editor.setModel(model);
        this.editor.updateOptions({
            minimap: {
                enabled: this.showMiniMap
            }
        })
    }
    
    async connectedCallback() {
        const componentHTML = import.meta.url.replace(".js", ".html");
        const innerHTML = import.meta.url.replace(".js", "-inner.html");
        
        this.innerHTML = await fetch(componentHTML).then(result => result.text());
        this._loadInnerPage(innerHTML);
    }
    
    disconnectedCallback() {
        this.frame = null;
        this.innerHTML = "";
    }

    _loadInnerPage(path) {
        this.frame.onload = () => {
            this.frame.onload = null;
            this._frameLoaded();
        };
        this.frame.src = path;
    }
    
    _frameLoaded() {
        this.dispatchEvent(new CustomEvent("loaded", {
            detail: {
                monaco: this.monaco,
                editor: this.editor
            }
        }));
    }
}

customElements.define("crs-monaco-editor", MonacoEditor);