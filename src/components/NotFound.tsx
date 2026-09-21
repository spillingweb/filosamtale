import { Link } from "@tanstack/react-router";
import { DisplayHeading } from "./ui/DisplayHeading";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="p-30 flex flex-col gap-4 items-center justify-center">
      <DisplayHeading>404 - Siden finnes ikke</DisplayHeading>
      <p>Siden du leter etter finnes ikke, eller har blitt flyttet.</p>
      <Button variant="link" tabIndex={-1}>
        <Link to="/">
          <Home className="inline-block mr-2" />
          Gå tilbake til forsiden
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
