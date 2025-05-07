import axios from "axios";
import type { useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const getMovies = () => {
  return axios
    .get(`${API}/api/movies`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getMovieById = (id: number) => {
  return axios
    .get(`${API}/api/movies/${id}`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

const getUsers = () => {
  return axios
    .get(`${API}/api/users`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

const editMovie = async (id: number, updatedMovie: MovieType) => {
  try {
    const response = await axios.put(`${API}/api/movies/${id}`, updatedMovie, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du film :", error);
    throw error;
  }
};

const createUser = (userData: UserData): Promise<boolean> => {
  const notifySucces = () =>
    toast.success("Votre profil a bien été créé 🎬", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });

  const notifyError = (
    errorMessage = "Une erreur est survenue lors de l'inscription",
  ) =>
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });

  return axios.post(`${API}/api/users`, userData).then((response) => {
    if (response.status === 201) {
      notifySucces();
      return true;
    }
    notifyError(response.data.error);
    return false;
  });
};

const getAuthorization = () => {
  return axios
    .get(`${API}/api/checkAdmin`, {
      withCredentials: true,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const getAuthorizationForUsersOrAdmin = () => {
  return axios
    .get(`${API}/api/checkAdminOrUser`, {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

const loginUser = (
  loginData: LoginData,
  navigate: ReturnType<typeof useNavigate>,
  setRole: (role: string) => void,
  setSubscription: (subscription: boolean) => void,
) => {
  const notifySuccess = () =>
    toast.success("Bienvenue sur Original Digital 🎬", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });

  const notifyError = (
    errorMessage = "Erreur lors de la connexion, mot de passe ou email incorrect",
  ) =>
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });

  return axios
    .post(`${API}/api/login`, loginData, { withCredentials: true })
    .then(({ data }) => {
      setRole(data.role);
      setSubscription(data.subscription);
      notifySuccess();
      setTimeout(() => {
        navigate(data.role === "administrateur" ? "/dashboard" : "/catalogue");
      }, 2000);
    })
    .catch((error) => {
      notifyError();
      console.error(error);
    });
};

const editPremium = (
  navigate: ReturnType<typeof useNavigate>,
  setSubscription: (subscription: boolean) => void,
) => {
  const notifySuccess = () =>
    toast.success("Votre abonnement Premium a bien été activé 🚀", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });

  return axios
    .put(
      `${API}/api/users/premium`,
      {},
      {
        withCredentials: true,
      },
    )
    .then((response) => {
      if (response.status === 200) {
        setSubscription(response.data.subscription);
        notifySuccess();
        setTimeout(() => {
          navigate("/catalogue");
        }, 2000);
      }
    })
    .catch((error) => console.error(error));
};

export {
  getAuthorization,
  getAuthorizationForUsersOrAdmin,
  getMovieById,
  getMovies,
  getUsers,
  editMovie,
  createUser,
  loginUser,
  editPremium,
};
