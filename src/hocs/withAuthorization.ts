import { ComponentType, FC, createElement } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import useAuth from "../hooks/useAuth";

export const withAuthorization = () => (Component: ComponentType) => {
  const EnhancedComponent: FC = (props) => {
    const { isAuthorized } = useAuth();

    if (isAuthorized === false) {
      console.warn("Unauthorized access attempt to restricted component.");

      return createElement(Navigate, { to: ROUTES.LOGIN });
    }

    return createElement(Component, props);
  };

  return EnhancedComponent;
};
