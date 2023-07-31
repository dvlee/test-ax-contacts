import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../constants/routes";
import { AuthProps } from "../types/auth";

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized === null) {
      onAuthStateChanged(auth, (data) => {
        if (data) {
          setUser(data);
        }
        setIsAuthorized(data ? true : false);
      });
    }
  }, []);

  const login = async (props: AuthProps) => {
    const { email, password } = props;
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Успешный вход");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    signOut(auth);
  };

  const register = async (props: AuthProps) => {
    const { email, password } = props;
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Успешная регистрация");
      navigate(ROUTES.HOME);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return {
    isAuthorized,
    user,
    login,
    logout,
    register,
  };
};

export default useAuth;
