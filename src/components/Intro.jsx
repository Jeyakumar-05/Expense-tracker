import React from "react";
import { Form } from "react-router-dom";
import '../assets/css/index.css';

//assets
import illustration from '../assets/illustration.jpg';

//library
import { UserPlusIcon } from "@heroicons/react/24/solid";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Rule your <span className="accent">Wallet</span>
        </h1>
        <p>
          Start your journey to smarter budgeting with our app - your trusted
          partner for managing expenses, tracking savings, and staying in
          control of your money.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What's your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20}/>
          </button>
        </Form>
      </div>
      <img src={illustration} alt="person with money"
      width={600} />
    </div>
  );
};

export default Intro;
