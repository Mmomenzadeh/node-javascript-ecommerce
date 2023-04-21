import { Input } from "Components"
import { BsSearch } from "react-icons/bs"
import "../../Assets/Styles/Components/SearchBox/index.scss"
export const SearchBox = () => {
  return (
    <div className="searchBox">
        <BsSearch className="searchBox__icon"/>
        <Input type="search" inpType="searchBox" holder="جستجو"/>
    </div>
  )
}
