import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../components/LayoutRoot.tsx";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import LogoutPage from "../pages/LogoutPage.tsx";
import RegistrationPage from "../pages/RegistrationPage.tsx";
import ContactCreatePage from "../pages/contacts/ContactCreatePage.tsx";
import ContactDetailsPage from "../pages/contacts/ContactDetailsPage.tsx";
import ContactListPage from "../pages/contacts/ContactListPage.tsx";
import ContactUpdatePage from "../pages/contacts/ContactUpdatePage.tsx";
import ContactsRootPage from "../pages/contacts/ContactsRootPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "logout", element: <LogoutPage /> },
          { path: "registration", element: <RegistrationPage /> },
        ],
      },

      {
        path: "contacts",
        element: <ContactsRootPage />,
        children: [
          { index: true, element: <ContactListPage /> },
          { path: "new", element: <ContactCreatePage /> },
          { path: ":id", element: <ContactDetailsPage /> },
          { path: ":id/edit", element: <ContactUpdatePage /> },
        ],
      },
    ],
  },
]);

export default router;
