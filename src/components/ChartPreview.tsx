import React from 'react';
import { EquilibriaCard } from 'equilibria-react';

interface ChartPreviewProps {
    parsedData: any | null;
    error: string | null;
}

export const ChartPreview: React.FC<ChartPreviewProps> = ({ parsedData, error }) => {
    // If there's a parse error from upstream (e.g. invalid YAML), show it.
    if (error) {
        return (
            <div className="engine-container">
                <div className="error-overlay visible" style={{ position: 'relative', transform: 'none' }}>
                    <div className="error-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        YAML Parse Error
                    </div>
                    <div className="error-message">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    if (!parsedData) {
        return (
            <div className="engine-container" style={{ color: 'var(--text-muted)' }}>
                Waiting for model data...
            </div>
        );
    }

    return (
        <div className="engine-container">
            <EquilibriaCard
                config={parsedData}
                style={{ width: '100%', height: '100%' }}
                title={parsedData?.metadata?.title || "Model Preview"}
                description={parsedData?.metadata?.description || "Interactive dynamic model"}
            />
        </div>
    );
};
