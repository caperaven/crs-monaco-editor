const documentText = `
{
    "variables": {
        "translations": {
    
        }
    },
    "body": {
        "elements": [
        
        ]
    }
}
`;


const bodyText = `
"body": {
    "elements": [

    ]
}`;

const elementText = `
{
    "element": "",
    "attributes": {
    },
    "styles": []  
}`;

const elementsText = `
"elements": [
    {
        "element": ""
    }
]`;

const templatesText = `
"templates": [
    {
        "id": -1,
        "elements": [
        ]
    }
],`;

const datasetText = `
{
    "id": -1,
    "name": "dataset-name",
    "fields": [
        {
            "name": "id"
        }
    ]
}`;

const datasetsText = `
"datasets": [
    {
        "id": -1,
        "name": "dataset-name",
        "fields": [
            {
                "name": "id"
            }
        ]
    }
],`;

const fieldText = `
{
    "name": ""
}`;

const datasourcesText = `
"datasources": [
    {
        "id": -1,
        "remote": ""
    }
],`;

const dataSourceText = `
{
    "id": -1,
    "remote": ""
}`;

const resourceDataSourceText = `
{
    "id": -1,
    "resource": [
        {
            "id": -1,
            "title": ""
        }
    ]
}`;

const perspectivesText = `
"perspectives": [
    {
        "id": -1,
        "id-field": "id",
        "data": {
            "cache": "detail-lookup",
            "aggregate": "count",
            "sorting": {
                "code": "ascending"
            }
        }
    }
],
`;

const processesText = `
"processes": [
    {
        "id": -1,
        "title": "my process",
        "steps": [
            {
                "id": -1,
                "title": "",
                "type": "",
                "next-id": -2,
            }
        ]
    }
],`;

const lookupsText = `
"lookups": [
    {
        "id": -1,
        "name": "",
        "mapping": {
            "sourceField": "targetField",
            "sourceField2": "targetField2"
        },
        "perspective": -1,
        "template": -1,
        "datasource": -1
    }
],`;

const lookupText = `
{
    "id": -1,
    "name": "",
    "mapping": {
        "sourceField": "targetField",
        "sourceField2": "targetField2"
    },
    "perspective": -1,
    "template": -1,
    "datasource": -1
}`;

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

    get elementsProposal() {
        return [
            {
                label: '"element"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "element property",
                insertText: elementText.trim()
            },
            {
                label: '"elements"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "elements collection property",
                insertText: elementsText.trim()
            }
        ]
    }

    get datasetsProposal() {
        return [
            {
                label: '"dataset"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "dataset object",
                insertText: datasetText.trim()
            },
            {
                "label": '"field"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "field property for dataset",
                insertText: fieldText.trim()
            }
        ]
    }

    get datasourcesProposal() {
        return [
            {
                label: '"datasource"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "datasource object",
                insertText: dataSourceText.trim()
            },
            {
                label: '"reesource datasource"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "resource datasource object",
                insertText: resourceDataSourceText.trim()
            }
        ]
    }

    get lookupProposals() {
        return [
            {
                label: '"lookup"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "lookup object",
                insertText: lookupText.trim()
            },

        ]
    }

    get schemaProposals() {
        return [
            {
                label: '"body"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                document: "root element required for schema",
                insertText: bodyText.trim()
            },
            {
                label: '"elements"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "elements collection property",
                insertText: elementsText.trim()
            },
            {
                label: '"datasets"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "dataset collection property",
                insertText: datasetsText.trim()
            },
            {
                label: '"datasources"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "dataset collection property",
                insertText: datasourcesText.trim()
            },
            {
                label: '"perspectives"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "perspective collection property",
                insertText: perspectivesText.trim()
            },
            {
                label: '"processes"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "processes collection property",
                insertText: processesText.trim()
            },
            {
                label: '"lookups"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "lookup collection property",
                insertText: lookupsText.trim()
            }
        ]
    }

    connectedCallback() {
        this._loadedHandler = this._loaded.bind(this);
        this._provideCompletionItemsHandler = this._provideCompletionItems.bind(this);
        this.parent.addEventListener("loaded", this._loadedHandler);
    }

    disconnectedCallback() {
        this.parent = null;
        this._loadedHandler = null;
        this.monaco = null;
    }

    _loaded(event) {
        this.monaco = event.detail.monaco;
        this.parent.removeEventListener("loaded", this._loadedHandler);

        this.parent.language = "json";
        this.parent.value = documentText.trim();
        event.detail.monaco.languages.registerCompletionItemProvider('json', {
            provideCompletionItems: this._provideCompletionItemsHandler
        });
    }

    _provideCompletionItems(model, position) {
        const textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});

        let result = [];

        const isElements = textUntilPosition.match(/"elements"\s*/);
        if (isElements) result = [...result, ...this.elementsProposal];

        const isLookup = textUntilPosition.match(/"lookups"\s*/);
        if (isLookup) result = [...result, ...this.lookupProposals];

        const isDatasources = textUntilPosition.match(/"datasources"\s*/);
        if (isDatasources) result = [...result, ...this.datasourcesProposal];

        const isDatasets = textUntilPosition.match(/"datasets"\s*/);
        if (isDatasets) result = [...result, ...this.datasetsProposal];

        if (position.column <= 6) {
            result = [...result, ...this.schemaProposals];
        }

        return {
            suggestions: result
        };
    }
}

customElements.define("schema-editor", SchemaEditor);
