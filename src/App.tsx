import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { Settings, Download, Github } from 'lucide-react';
import { YamlEditor } from './components/YamlEditor';
import { ChartPreview } from './components/ChartPreview';
import { defaultYamlModel } from './models/defaultModel';

const App: React.FC = () => {
  const [yamlContent, setYamlContent] = useState<string>(defaultYamlModel);
  const [parsedData, setParsedData] = useState<any | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  useEffect(() => {
    // Parse YAML whenever it changes
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
        <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="pulse-glow" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))', marginRight: '16px' }}></div>
          <h1 className="header-title">Equilibria Playground</h1>
          <span className="header-subtitle">Interactive Economics Engine</span>
        </div>

        <div style={{ flex: 1 }}></div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="icon-btn" title="Settings">
            <Settings size={20} />
          </button>
          <button className="icon-btn" title="View Source">
            <Github size={20} />
          </button>
          <button className="icon-btn" title="Export Model" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
            <Download size={16} style={{ marginRight: '8px' }} />
            Export
          </button>
        </div>
      </header>

      <main className="workspace">
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
