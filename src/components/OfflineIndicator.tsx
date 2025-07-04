
import { useOffline } from "@/hooks/useOffline";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import { Wifi, WifiOff } from "lucide-react";

const OfflineIndicator = () => {
  const isOffline = useOffline();
  const { offlineActions } = useOfflineStorage();

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-50 flex items-center justify-center gap-2">
      <WifiOff className="h-4 w-4" />
      <span>
        You are offline. {offlineActions > 0 && `${offlineActions} actions will sync when online.`}
      </span>
    </div>
  );
};

export default OfflineIndicator;
