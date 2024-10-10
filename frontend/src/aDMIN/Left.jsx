import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Left() {
    return (
        <div className="w-1/4 flex flex-row gap-1">
            <Link to="/PrdouctMang">
                <Button variant="contained" color="primary" fullWidth>
                    Product Management
                </Button>
            </Link>
            <Link to="/queryManagement">
                <Button variant="contained" color="primary" fullWidth>
                    Query Management
                </Button>
            </Link>
            <Link to="/userManag">
                <Button variant="contained" color="primary" fullWidth>
                    User Management
                </Button>
            </Link>
        </div>
    );
}

export default Left;
