
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPopup, setShowInstallPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the install prompt
    const hasSeenInstallPrompt = localStorage.getItem('hasSeenInstallPrompt');
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Only show if user hasn't seen it before
      if (!hasSeenInstallPrompt) {
        setShowInstallPopup(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Mark that user has seen the prompt
    localStorage.setItem('hasSeenInstallPrompt', 'true');
    setDeferredPrompt(null);
    setShowInstallPopup(false);
  };

  const handleCancelClick = () => {
    // Mark that user has seen the prompt
    localStorage.setItem('hasSeenInstallPrompt', 'true');
    setShowInstallPopup(false);
    setDeferredPrompt(null);
  };

  if (!showInstallPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-6 relative">
        <button
          onClick={handleCancelClick}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="text-center">
          {/* App Logo */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
            <img 
              src="https://i.postimg.cc/pTH1nLQb/Picsart-25-07-04-21-11-45-514.png" 
              alt="Netlistore Logo" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* App Name */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Netlistore</h2>
          <p className="text-gray-600 text-sm mb-6">Install our app for a better shopping experience</p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleInstallClick}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Install App
            </Button>
            
            <Button 
              onClick={handleCancelClick}
              variant="outline"
              className="w-full py-3 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPopup;
