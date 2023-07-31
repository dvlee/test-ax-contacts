import { FC } from "react";
import { withAuthorization } from "../../hocs/withAuthorization";
import { Outlet } from "react-router-dom";

interface Props {}

const ContactsRootPage: FC<Props> = () => {
  return <Outlet />;
};

export default withAuthorization()(ContactsRootPage);
