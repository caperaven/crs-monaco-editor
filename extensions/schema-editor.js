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
}`;


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

const collectionFieldText = `
{
    "name": "$1",
    "collection": true,
    "datasource": $2,
    "listen-for": "$0"
}`;

const datasourcesText = `
"datasources": [
    {
        "id": $1,
        "remote": "$0"
    }
],`;

const dataSourceText = `
{
    "id": $1,
    "remote": "$0"
}`;

const resourceDataSourceText = `
{
    "id": $1,
    "resource": [
        {
            "id": $2,
            "title": "$0"
        }
    ]
}`;

const resourceItemText = `
{
    "id": $1,
    "title": "$0"
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
],`;

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

const inputText = `
{
    "element": "input",
    "title": "@translations.$1",
    "field": "model.$2",
    "description": "model.$3"
},`;

const groupText = `
{
    "element": "group",
    "title": "@titles.$1",
    "elements": [
        $2  
    ]
}`;

const actionsText = `
"actions": [
    {
        "id": $1,
        "action": "$2",
        "parameters": {
            $3
        }
    }
],`;

const selectText = `
{
    "element": "select",
    "title": "@titles.$1",
    "datasource": "model.$2",
    "field": "model.$3"
}
`;

const dateText = `
{
    "element": "date",
    "title": "@titles.$1",
    "field": "model.$2"
}`;

const checkboxText = `
{
    "element": "checkbox",
    "styles": "switch",
    "title": "@titles.$1",
    "field": "model.$2"
}`;

const memoText = `
{
    "element": "memo",
    "title": "@titles.$1",
    "field": "model.$2"
}`;

const toolbarText = `
{
    "element": "div",
    "styles": ["toolbar", "right"],
    "elements": [
        $1      
    ]
}`;

const buttonText = `
{
    "element": "button",
    "title": "@translations.$1",
    "action": $2
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
                insertText: elementText.trim(),
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
                label: '"input"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "input property",
                insertText: inputText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"group"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "group property",
                insertText: groupText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"select"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "select property",
                insertText: selectText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"date"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "date property",
                insertText: dateText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"checkbox"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "checkbox property",
                insertText: checkboxText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"memo"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "memo property",
                insertText: memoText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"toolbar"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "toolbar property",
                insertText: toolbarText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"button"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "button property",
                insertText: buttonText.trim(),
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
                label: '"field"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "field property for dataset",
                insertText: fieldText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
                label: '"collection field"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "collection field property for dataset",
                insertText: collectionFieldText.trim(),
                insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },

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

    get resourceProposal() {
        return [
            {
                label: '"resource item"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "resource item object for resource datasource",
                insertText: resourceItemText.trim(),
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
            },
            {
                label: '"actions"',
                kind: this.monaco.languages.CompletionItemKind.Property,
                documentation: "actions collection property",
                insertText: actionsText.trim(),
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

        if (window.createEditor != null) {
            window.createEditor("json", null, true);
        }

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

        const isResource = textUntilPosition.match(/"resource"\s*/);
        if (isResource) result = [...result, ...this.resourceProposal];

        if (position.column <= 6) {
            result = [...result, ...this.schemaProposals];
        }

        return {
            suggestions: result
        };
    }
}

customElements.define("schema-editor", SchemaEditor);
