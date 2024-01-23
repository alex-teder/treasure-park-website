import { Avatar, CardContent, CardHeader, Divider } from "@mui/material";
// import { useContext } from "react";
import { Link } from "react-router-dom";

// import { UserContext } from "../../UserProvider";
import { SingleCommentActions } from "./SingleCommentActions";

export function SingleComment() {
  // const { user } = useContext(UserContext);

  return (
    <>
      <CardHeader
        avatar={<Avatar>U</Avatar>}
        title={
          <Link to="/users/123">
            <b>@username</b>
          </Link>
        }
        subheader="Today, 13:31"
        action={true && <SingleCommentActions />}
      />
      <CardContent sx={{ fontSize: "0.875rem", pt: 0 }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe cum vitae doloremque
        reiciendis id perspiciatis exercitationem odit impedit corrupti necessitatibus!
      </CardContent>
      <Divider />
    </>
  );
}
