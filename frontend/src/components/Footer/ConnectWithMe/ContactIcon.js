import React from "react";

export default function ContactIcon(props) {
    return (
        <a href={props.url} className="ContactIcon">
            <img src={props.img}
                width="30"
                height="30"
            ></img>
        </a>
    );
}
