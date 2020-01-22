export function createHoverProvider(monaco) {
    const result = {
        provideHover: function(model, position, token) {
            console.log(model.getWordAtPosition(position));

            return {
                contents: [
                    { value: '**SOURCE**' },
                    { value: 'test content' },
                    { value: 'sub content' }
                ]
            }
        }
    };

    return result;
}