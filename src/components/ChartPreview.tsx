import React, { useEffect, useRef, useState } from 'react';
import { KineticGraph } from 'equilibria-engine-js';

interface ChartPreviewProps {
    parsedData: any | null;
    error: string | null;
}

export const ChartPreview: React.FC<ChartPreviewProps> = ({ parsedData, error }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<KineticGraph | null>(null);
    const [engineError, setEngineError] = useState<string | null>(null);

    useEffect(() => {
        // Cleanup previous engine if it exists
        if (engineRef.current) {
            try {
                engineRef.current.destroy();
            } catch (e) {
                console.error("Error destroying engine:", e);
            }
            engineRef.current = null;
        }

        setEngineError(null);

        if (containerRef.current && parsedData) {
            try {
                containerRef.current.innerHTML = '';
                const configToPass = parsedData.schema ? parsedData.schema : parsedData;
                const engine = new KineticGraph(configToPass);
                engine.mount(containerRef.current);
                engineRef.current = engine;
            } catch (err: any) {
                console.error("Engine Render Error:", err);
                setEngineError(err.message || 'Unknown engine rendering error');
            }
        }

        return () => {
            if (engineRef.current) {
                try {
                    engineRef.current.destroy();
                } catch (e) {
                    console.error("Error destroying engine on unmount:", e);
                }
                engineRef.current = null;
            }
        };
    }, [parsedData]);

    const displayError = error || engineError;

    return (
        <div className="engine-container">
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

            <div className={`error-overlay ${displayError ? 'visible' : ''}`}>
                <div className="error-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Error Parsing/Rendering Model
                </div>
                <div className="error-message">
                    {displayError}
                </div>
            </div>
        </div>
    );
};
