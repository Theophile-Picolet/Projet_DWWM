import axios from "axios";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const API = import.meta.env.VITE_API_URL;

type WatchlistContextType = {
  watchlist: MovieType[];
  refreshWatchlist: () => Promise<void>;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<MovieType[]>([]);

  const refreshWatchlist = useCallback(async () => {
    try {
      console.info("Demande de mise à jour de la watchlist...");
      const response = await axios.get(`${API}/api/users/watchlist`, {
        withCredentials: true,
      });

      console.info(" Réponse API :", response.data);

      // Forcer un nouvel array pour s'assurer que React détecte le changement
      setWatchlist([...response.data.watchlist]);
    } catch (error) {
      console.error("Erreur lors du chargement de la watchlist :", error);
    }
  }, []);

  useEffect(() => {
    console.info(" Chargement initial de la watchlist...");
    refreshWatchlist();
  }, [refreshWatchlist]);

  return (
    <WatchlistContext.Provider value={{ watchlist, refreshWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

// Hook personnalisé pour utiliser la Watchlist
export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
