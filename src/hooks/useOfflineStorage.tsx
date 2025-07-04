
import { useState, useEffect, useCallback } from 'react';

interface OfflineAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
}

export const useOfflineStorage = () => {
  const [offlineActions, setOfflineActions] = useState<OfflineAction[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Load offline actions from localStorage
    const storedActions = localStorage.getItem('offline-actions');
    if (storedActions) {
      setOfflineActions(JSON.parse(storedActions));
    }

    const handleOnline = () => {
      setIsOnline(true);
      // Process offline actions when back online
      processOfflineActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addOfflineAction = useCallback((type: string, data: any) => {
    const action: OfflineAction = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now()
    };

    const updatedActions = [...offlineActions, action];
    setOfflineActions(updatedActions);
    localStorage.setItem('offline-actions', JSON.stringify(updatedActions));
  }, [offlineActions]);

  const processOfflineActions = useCallback(async () => {
    if (offlineActions.length === 0) return;

    // Process each offline action
    for (const action of offlineActions) {
      try {
        // Handle different types of offline actions
        switch (action.type) {
          case 'add-to-cart':
            // Sync cart additions
            console.log('Syncing cart addition:', action.data);
            break;
          case 'add-to-wishlist':
            // Sync wishlist additions
            console.log('Syncing wishlist addition:', action.data);
            break;
          default:
            console.log('Unknown offline action:', action.type);
        }
      } catch (error) {
        console.error('Failed to process offline action:', error);
      }
    }

    // Clear processed actions
    setOfflineActions([]);
    localStorage.removeItem('offline-actions');
  }, [offlineActions]);

  const cacheData = useCallback((key: string, data: any) => {
    localStorage.setItem(`cache-${key}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  }, []);

  const getCachedData = useCallback((key: string, maxAge: number = 3600000) => {
    const cached = localStorage.getItem(`cache-${key}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < maxAge) {
        return data;
      }
    }
    return null;
  }, []);

  return {
    isOnline,
    addOfflineAction,
    cacheData,
    getCachedData,
    offlineActions: offlineActions.length
  };
};
