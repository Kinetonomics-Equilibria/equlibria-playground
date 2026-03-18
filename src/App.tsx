import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { Book, Settings, Download, Github, Code2 } from 'lucide-react';
import { YamlEditor } from './components/YamlEditor';
import { ChartPreview } from './components/ChartPreview';
import { DocsViewer } from './components/DocsViewer';
import { defaultYamlModel } from './models/defaultModel';

const App: React.FC = () => {
  const [yamlContent, setYamlContent] = useState<string>(defaultYamlModel);
  const [parsedData, setParsedData] = useState<any | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [showDocs, setShowDocs] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (!yamlContent.trim()) {
        setParsedData(null);
        setParseError(null);
        return;
      }
      const parsed = yaml.load(yamlContent);
      setParsedData(parsed);
      setParseError(null);
    } catch (err: any) {
      console.error('YAML Parse Error:', err);
      setParseError(err.message || 'Invalid YAML format');
    }
  }, [yamlContent]);

  return (
    <div className="app-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="pulse-glow" style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--accent-gradient)', marginRight: '16px', boxShadow: 'var(--shadow-glow)' }}></div>
          <h1 className="header-title">Equilibria</h1>
          <span className="header-subtitle">Interactive Playground</span>
        </div>

        <div style={{ flex: 1 }}></div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="icon-btn"
            onClick={() => setShowEditor(!showEditor)}
            title={showEditor ? 'Hide Editor' : 'Show Editor'}
            style={showEditor ? { background: 'var(--bg-surface)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,229,255,0.2)' } : {}}
          >
            <Code2 size={20} />
          </button>
          <button
            className="icon-btn"
            onClick={() => setShowDocs(!showDocs)}
            title="Documentation"
            style={showDocs ? { background: 'var(--bg-surface)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,229,255,0.2)' } : {}}
          >
            <Book size={20} />
          </button>
          <button className="icon-btn" title="Settings">
            <Settings size={20} />
          </button>
          <button className="icon-btn" title="View Source">
            <Github size={20} />
          </button>
          <button className="icon-btn" title="Export Model" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', padding: '8px 14px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600 }}>
            <Download size={16} style={{ marginRight: '8px' }} />
            Export
          </button>
        </div>
      </header>

      <main className="workspace">
        {showDocs && (
          <section className="pane docs-pane">
            <DocsViewer onClose={() => setShowDocs(false)} />
          </section>
        )}

        {showEditor && (
          <section className="pane">
            <header className="pane-header">
              Model Editor (YAML)
            </header>
            <div className="pane-content">
              <YamlEditor
                value={yamlContent}
                onChange={(val) => setYamlContent(val || '')}
              />
            </div>
          </section>
        )}

        <section className="pane">
          <header className="pane-header">
            Live Preview
          </header>
          <div className="pane-content">
            <ChartPreview
              parsedData={parsedData}
              error={parseError}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
