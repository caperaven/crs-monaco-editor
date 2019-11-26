class MonacoEditor extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
    }
    
    disconnectedCallback() {
        this.innerHTML = "";
    }
}

customElements.define("crs-monaco-editor", MonacoEditor);