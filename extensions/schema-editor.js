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
    "element": "$0",
    "attributes": {
    },
    "styles": []  
}`;

const elementsText = `
"elements": [
    {
        "element": "$0"
    }
]`;

const templatesText = `
"templates": [
    {
        "id": $1,
        "elements": [
            {
                "element": "$0"
            }
        ]
    }
],`;

const templateText = `
{
    "id": $1,
    "elements": [
        {
            "element": "$0"
        }
    ]
}`;

const datasetText = `
{
    "id": $1,
    "name": "dataset-name",
    "fields": [
        {
            "name": "id"
        },
        $0
    ]
}`;

const datasetsText = `
"datasets": [
    {
        "id": $1,
        "name": "$0",
        "fields": [
            {
                "name": "id"
            }
        ]
    }
],`;

const fieldText = `
{
    "name": "$0"
}`;

const datasourcesText = `
"datasources": [
    {
        "id": -1,
        "remote": "$0"
    }
],`;

const dataSourceText = `
{
    "id": -1,
    "remote": "$0"
}`;

const resourceDataSourceText = `
{
    "id": -1,
    "resource": [
        {
            "id": $1,
            "title": "$0"
        }
    ]
}`;

const perspectivesText = `
"perspectives": [
    {
        "id": $1,
        "id-field": "$0",
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
        "id": $1,
        "title": "$0",
        "steps": [
            {
                "id": -1,
                "title": "",
                "type": "",
                "next-id": -2
            }
        ]
    }
],`;

const lookupsText = `
"lookups": [
    {
        "id": $0,
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
    "id": $1,
    "name": "$0",
    "mapping": {
        "sourceField": "targetField",
        "sourceField2": "targetField2"
    },
    "perspective": -1,
    "template": -1,
    "datasource": -1
}`;

const customActionTriggersText = `
"customActionTriggers": [
    {
        "trigger": "model.$1",
        "actions": [
            $0
        ]
    }
],`;

const customActionEventsTest = `
"customActionEvents": [
    {
        "event": "$1",
        "actions": [
            $0
        ]
    }
],`;

const triggerActionText = `
{
    "action": "$1",
    "condition": "$0",
    "parameters": {       
    }
}`;

const paramterText = '"${1:param}": "${0:value}"';

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
                insertText: elementText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"elements"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "elements collection property",
                insertText: elementsText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        ]
    }

    get datasetsProposal() {
        return [
            {
                label: '"dataset"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "dataset object",
                insertText: datasetText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                "label": '"field"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "field property for dataset",
                insertText: fieldText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        ]
    }

    get datasourcesProposal() {
        return [
            {
                label: '"datasource"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "datasource object",
                insertText: dataSourceText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"reesource datasource"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "resource datasource object",
                insertText: resourceDataSourceText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        ]
    }

    get lookupProposals() {
        return [
            {
                label: '"lookup"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "lookup object",
                insertText: lookupText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        ]
    }

    get templateProposal() {
        return [
            {
                label: '"template"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "template object",
                insertText: templateText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        ]
    }

    get triggerProposal() {
        return [
            {
                label: '"action on trigger"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "action object for a trigger object",
                insertText: triggerActionText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        ]
    }

    get parametersProposal() {
        return [
            {
                label: '"parameter"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "parameter",
                insertText: paramterText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            }
        ]
    }

    get schemaProposals() {
        return [
            {
                label: '"body"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                document: "root element required for schema",
                insertText: bodyText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"elements"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "elements collection property",
                insertText: elementsText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"datasets"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "dataset collection property",
                insertText: datasetsText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"datasources"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "dataset collection property",
                insertText: datasourcesText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"perspectives"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "perspective collection property",
                insertText: perspectivesText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"processes"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "processes collection property",
                insertText: processesText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"lookups"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "lookup collection property",
                insertText: lookupsText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"templates"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "templates collection property",
                insertText: templatesText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"triggers"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "custom action triggers collection property",
                insertText: customActionTriggersText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"events"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "events collection property",
                insertText: customActionEventsTest.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
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

        const isTemplates = textUntilPosition.match(/"templates"\s*/);
        if (isTemplates) result = [...result, ...this.templateProposal];

        const isTriggers = textUntilPosition.match(/"actions"\s*/);
        if (isTriggers) result = [...result, ...this.triggerProposal];

        const isParam = textUntilPosition.match(/"actions"\s*/);
        if (isParam) result = [...result, ...this.parametersProposal];

        if (position.column <= 6) {
            result = [...result, ...this.schemaProposals];
        }

        return {
            suggestions: result
        };
    }
}

customElements.define("schema-editor", SchemaEditor);
