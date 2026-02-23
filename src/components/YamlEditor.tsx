import React from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

interface YamlEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
}

export const YamlEditor: React.FC<YamlEditorProps> = ({ value, onChange }) => {
    const monaco = useMonaco();

    React.useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme('equilibria-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: 'type', foreground: 'B562DF' },
                    { token: 'string', foreground: '00E676' },
                    { token: 'number', foreground: '3E8BFF' },
                    { token: 'keyword', foreground: '00E5FF' },
                ],
                colors: {
                    'editor.background': '#151A22',
                    'editor.lineHighlightBackground': '#1E2530',
                    'editorLineNumber.foreground': '#647082',
                    'editorIndentGuide.background': '#ffffff14',
                    'editorIndentGuide.activeBackground': '#ffffff30',
                }
            });
            monaco.editor.setTheme('equilibria-dark');
        }
    }, [monaco]);

    const handleEditorChange = (value: string | undefined) => {
        onChange(value);
    };

    return (
        <Editor
            height="100%"
            defaultLanguage="yaml"
            value={value}
            theme="equilibria-dark"
            onChange={handleEditorChange}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                fontLigatures: true,
                wordWrap: 'on',
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                overviewRulerLanes: 0,
                renderLineHighlight: 'all',
                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                }
            }}
        />
    );
};
