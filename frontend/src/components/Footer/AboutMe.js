import React from "react";
import { Link } from "react-router-dom"

export default function AboutMe() {
    return (
        <div className="AboutMe">
            <b>About me</b><br />
            <Link className="AboutMeReferences" to='/'>Home</Link><br />
            <a className="AboutMeReferences" href="https://t.me/fenik_fam">Telegram Link</a><br />            
        </div>
    );
}
