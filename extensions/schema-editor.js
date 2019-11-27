class SchemaEditor extends HTMLElement {
    get parent() {
        if (this._parent == null) {
            this._parent = document.querySelector(`#${this.getAttribute("for")}`);
        }
        return this._parent;
    }

    set parent(newValue) {
        this._parent = newValue;
    }

    connectedCallback() {
        this._loadedHandler = this._loaded.bind(this);
        this.parent.addEventListener("loaded", this._loadedHandler);
    }

    disconnectedCallback() {
        this.parent = null;
        this._loadedHandler = null;
    }

    _loaded(event) {
        this.parent.removeEventListener("loaded", this._loadedHandler);

        this.parent.language = "json";
        this.parent.value = JSON.stringify({
            "variables": {
                "translations": {

                }
            },
            "datasets": [

            ],
            "datasources": [

            ],
            "templates": [

            ],
            "body": {

            }
        }, null, 3);
    }
}

customElements.define("schema-editor", SchemaEditor);