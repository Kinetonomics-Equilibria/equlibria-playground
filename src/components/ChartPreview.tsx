import React from 'react';
import { EquilibriaCard } from 'equilibria-react';

interface ChartPreviewProps {
    parsedData: any | null;
    error: string | null;
}

/**
 * Inline CSS-variable overrides scoped to this subtree.
 * These defeat the equilibria-react bundled CSS which resets :root to light-mode values.
 */
const chartThemeVars: React.CSSProperties = {
    // Card shell
    ['--eq-card-bg' as any]: 'rgba(10, 14, 26, 0.97)',
    ['--eq-card-border' as any]: 'rgba(99, 102, 241, 0.22)',
    ['--eq-card-radius' as any]: '14px',
    ['--eq-card-shadow' as any]: '0 4px 32px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(99,102,241,0.22)',
    ['--eq-card-shadow-hover' as any]: '0 8px 48px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(129,140,248,0.35)',
    ['--eq-card-blur' as any]: '0px',

    // Typography
    ['--eq-title-color' as any]: '#F0F4F8',
    ['--eq-description-color' as any]: '#A0ABC0',
    ['--eq-title-size' as any]: '1.05rem',

    // Skeleton pulse - indigo/cyan palette matching the app
    ['--eq-skeleton-bg' as any]: 'rgba(15, 20, 40, 0.8)',
    ['--eq-skeleton-color-1' as any]: 'rgba(99, 102, 241, 0.15)',
    ['--eq-skeleton-color-2' as any]: 'rgba(59, 130, 246, 0.15)',
    ['--eq-skeleton-color-3' as any]: 'rgba(0, 229, 255, 0.10)',
};

export const ChartPreview: React.FC<ChartPreviewProps> = ({ parsedData, error }) => {
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
        <div className="engine-container" style={chartThemeVars}>
            <EquilibriaCard
                config={parsedData}
                style={{ width: '100%', height: '100%' }}
                title={parsedData?.metadata?.title || "Model Preview"}
                description={parsedData?.metadata?.description || "Interactive dynamic model"}
            />
        </div>
    );
};
