import React, { useEffect } from "react";
import LoaderGif from '../../assets/loader.gif';
import "./loader.css";

const Loader = (props) => {
    useEffect(() => { }, [props.isVisible]);
    return (
        <div>
            {props.isVisible === true ? (
                <div className="lds-roller">
                    <div id="containerLoader">
                    </div>
                    <img src={LoaderGif} alt="loading" height={120} width={120} />
                </div>
            ) : null}
        </div>
    );
};

export default Loader;