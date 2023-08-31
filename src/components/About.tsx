import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";
import { Link } from "react-router-dom";
interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    const theme = useContext(SiteTheme);

    return <>
        <div className={`about-container container ${theme.color} `}>
            <h1>About ACard</h1>
            <h3>What is ACard</h3>
            <p>ACard is a dynamic web application designed to connect businesses and individuals through the power of advertising. Whether you're a consumer looking for the latest deals or a business owner seeking to promote your products or services, ACard is your go-to platform.</p>
            <h6>Becoming a part of the ACard community is simple:</h6>
            <p><b>Regular User:</b> Sign up as a regular user to access a treasure trove of exciting promotions and deals from businesses in your area. <br></br>
                <b>Business User:</b> If you own a business or store, elevate your brand's visibility by registering as a Business user. ACard empowers you to design and publish compelling advertisements that reach potential customers.</p>
            <h6>Join ACard Today</h6>
            <Link to={"/register"} style={{ color: "blue", fontSize: "1.2rem" }}>Click Here</Link>
        </div>
    </>;
}

export default About;