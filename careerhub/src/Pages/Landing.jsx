import React from "react";
import styled from "styled-components";
import { Logo } from "../Components/index";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            career <span>hub</span> app
          </h1>
          <p>
            Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
            fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
            crucifix heirloom meggings bicycle rights.
          </p>
          <Link to="/login" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

const Wrapper = styled.section`
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
  }

  .page {
    min-height: calc(100vh - 5rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  .info {
    text-align: center;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  span {
    color: var(--primary-500);
  }

  .btn-hero {
    background: var(--primary-500);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    margin-top: 1rem;
  }

  .img {
    width: 90%;
    max-width: 500px;
    margin: auto;
    display: block;
  }

  @media (min-width: 768px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 2rem;
    }

    .info {
      text-align: left;
    }
  }
`;
