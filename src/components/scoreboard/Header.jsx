import React from "react";
import "./Header.css";

import headerImage from "../../assets/header.png";

const Header = ({ title }) => {
  return (
    <div className="headerContainer">
      <div className="titleContainer">
        <span className="contestTitle">{title}</span>
        <img className="constestPicture" src={headerImage} alt="" />
      </div>
      <div className="columTitles">
        <span className="columTitles-Rank">Rank</span>
        <span className="columTitles-Photo"></span>
        <span className="columTitles-TeamName">Name</span>
        <span className="columTitles-Solved">Solved</span>
        <span className="columTitles-Penalty">Penalty</span>
      </div>
    </div>
  );
};

export default Header;
