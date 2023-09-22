import React from "react";

export default function ContactIco(props) {
    return (
        <a href={props.url} className="App-Contacts-Ico">
            <img src={props.img}
                width="30"
                height="30"
            ></img>
        </a>
    );
}
