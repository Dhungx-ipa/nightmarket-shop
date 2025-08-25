import { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
}

export default function AdBanner({ className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!adRef.current) return;
    
    console.log('Setting up ad container...');
    
    // Clear any existing content
    adRef.current.innerHTML = '';
    
    // Create config script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.text = `
      atOptions = {
        'key': 'cc61a1ecbfbe8fe0abf996aa80d8cc13',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    `;
    
    // Create invoke script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/cc61a1ecbfbe8fe0abf996aa80d8cc13/invoke.js';
    
    // Add both scripts to the container
    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);
    
    scriptRef.current = invokeScript;
    
    invokeScript.onload = () => {
      console.log('Ad script loaded and executed');
    };

    return () => {
      // Cleanup
      if (scriptRef.current) {
        scriptRef.current.onload = null;
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`flex justify-center py-4 ${className}`} data-testid="ad-banner">
      <div 
        ref={adRef}
        className="bg-night-darker border border-night-purple/20 rounded overflow-hidden"
        style={{ width: '728px', minHeight: '90px' }}
      >
        {/* Ad scripts will be injected here */}
      </div>
    </div>
  );
}