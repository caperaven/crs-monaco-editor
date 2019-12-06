/**
 * Web component that enables the language usage
 */

class LanguageEditor extends HTMLElement {
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

        const ready = () => {
            this.parent.removeEventListener("ready", ready);
            this.init();
        };

        this.parent.addEventListener("ready", ready);
    }

    _loaded(event) {
        this.monaco = event.detail.monaco;
        this.parent.removeEventListener("loaded", this._loadedHandler);
    }

    init() {
        const url = import.meta.url.replace(".js", ".html");

        this.parent.language = "mySpecialLanguage";
        this.parent.theme = "myCoolTheme";
        this.parent.loadInnerPage(url);
    }
}

customElements.define("lang-editor", LanguageEditor);