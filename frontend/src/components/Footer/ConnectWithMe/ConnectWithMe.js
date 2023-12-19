import React from "react";
import ContactIcon from "./ContactIcon";

export default function ConnectWithMe() {
    return (
        <div className="ConnectWithMe">
            <b>Connect with me</b>
            <br />
            <ContactIcon url="mailto:fenik2305@gmail.com" img="/icons/email-icon.png"/>
            <ContactIcon url="https://github.com/Fenik2305" img="/icons/github-icon.png"/>
            <ContactIcon url="https://t.me/fenik_fam" img="/icons/tg-icon.png"/>
            <ContactIcon url="https://t.me/fenik_fam" img="/icons/tg-icon.png"/>
            <ContactIcon url="https://t.me/fenik_fam" img="/icons/tg-icon.png"/>
        </div>
    );
}
