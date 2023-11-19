import React from "react";

export default function ContactIcon(props) {
    return (
        <a href={props.url} className="ContactIcon">
            <img src={props.img}
                width="25"
                height="25"
            ></img>
        </a>
    );
}
