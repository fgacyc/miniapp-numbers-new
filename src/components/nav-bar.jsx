import { BsChevronLeft } from 'react-icons/bs';
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';

NavBar.propTypes = {
    children: PropTypes.node,
    ifShowBackArrow: PropTypes.bool,
    url : PropTypes.string
};

const isExternal = (u) => /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(u);


export default function NavBar({ children, ifShowBackArrow = true,url="" }) {
    const navigate = useNavigate();

    return (
        <>
            <div className={"h-[45px] px-3 flex items-center justify-between bg-white"}>

                <div onClick={() => {
                    if (!url) return navigate(-1);
                    if (isExternal(url)) {
                        window.location.assign(url); // 外链：用浏览器跳转
                    } else {
                        navigate(url);               // 站内：用 react-router
                    }
                }} className={"cursor-pointer"}>
                    {ifShowBackArrow && <BsChevronLeft className={"h-6 w-6"}/>}
                </div>
                <div className={"text-lg"}>{children}</div>
                <div className={"h-6 w-6"}></div>
            </div>
        </>
    );
}