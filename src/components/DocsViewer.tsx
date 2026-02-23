import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Book, X, ChevronDown } from 'lucide-react';

interface DocsViewerProps {
    onClose: () => void;
}

const docsFiles = [
    { id: '01-getting-started.md', title: '01 - Getting Started' },
    { id: '02-parameters-and-interactions.md', title: '02 - Parameters & Interactions' },
    { id: '03-layouts.md', title: '03 - Layouts' },
    { id: '04-graphs-and-scales.md', title: '04 - Graphs & Scales' },
    { id: '05-graph-objects.md', title: '05 - Graph Objects' },
    { id: '06-econ-objects.md', title: '06 - Econ Objects' },
];

export const DocsViewer: React.FC<DocsViewerProps> = ({ onClose }) => {
    const [currentFile, setCurrentFile] = useState(docsFiles[0].id);
    const [markdown, setMarkdown] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoc = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/docs/schema/${currentFile}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch documentation.');
                }
                const text = await response.text();
                // Vite returns index.html for missing routes, so if it looks like HTML, it's missing
                if (text.trim().toLowerCase().startsWith('<!doctype html>')) {
                    throw new Error('Documentation file not found.');
                }
                setMarkdown(text);
            } catch (err: any) {
                console.error('Error fetching docs:', err);
                setError(err.message || 'Error fetching docs');
            } finally {
                setLoading(false);
            }
        };

        fetchDoc();
    }, [currentFile]);

    return (
        <div className="docs-viewer">
            <header className="pane-header docs-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Book size={16} />
                    <span>Schema Documentation</span>
                </div>
                <button className="icon-btn" onClick={onClose} title="Close Docs">
                    <X size={16} />
                </button>
            </header>

            <div className="docs-controls">
                <div className="select-wrapper">
                    <select
                        value={currentFile}
                        onChange={(e) => setCurrentFile(e.target.value)}
                        className="docs-select"
                    >
                        {docsFiles.map((file) => (
                            <option key={file.id} value={file.id}>
                                {file.title}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="select-icon" />
                </div>
            </div>

            <div className="pane-content docs-content markdown-body">
                {loading ? (
                    <div className="loading-state">Loading documentation...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {markdown}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
};
