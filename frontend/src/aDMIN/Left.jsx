import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Left(){
    return (
<>
                <div className="w-1/3 flex flex-row gap-4">
               <Link to="/PrdouctMang">     <Button>Product Management</Button> </Link>
                    
                </div>


</>
    )
}
export default Left