import { Fragment } from "react"
import "../../Assets/Styles/Components/Loading/index.scss"

export const Loading = ({type}) => {
    return(
        <div style={{height:"100Vh"}} className=" flex j-c a-c">
          {
            type === "spinner" ?
              <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            : type === "ripple" ?
              <div className="lds-ripple"><div></div><div></div></div>
            : type === "roller" ?
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            : ""
          }

        </div>

        
      )
}
