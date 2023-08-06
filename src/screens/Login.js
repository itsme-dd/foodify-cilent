import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [bgColor1, setbgColor1] = useState("#13b2a7");
  const [bgColor2, setbgColor2] = useState("#28b27a");
  let naviagte = useNavigate();
  const handleChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   JSON.stringify({
    //     email: credentials.email,
    //     password: credentials.password,
    //   })
    // );
    const response = await fetch("http://localhost:5000/api/LoginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    //console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      //console.log(localStorage.getItem("authToken"));
      naviagte("/");

    }
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/2260555/pexels-photo-2260555.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div
        className="container "
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className=" m-auto border rounded "
          style={{
            backgroundColor: "rgb(0 40 42 / 59%)",
          }}
        >
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              style={{ backgroundColor: "#4a4a8270" }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={{ backgroundColor: "#4a4a8270" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary m-3"
            style={{ backgroundColor: bgColor1 }}
            onMouseOver={()=>setbgColor1("#4a4a8270")}
            onMouseOut={()=>setbgColor1("#13b2a7")}
          
          
          >
            Login
          </button>
          <Link to="/signup" className="m-3 btn m-3" style={{ backgroundColor: bgColor2}}
          onMouseOver={()=>setbgColor2("#4a4a8270")}
          onMouseOut={()=>setbgColor2("#28b27a")}>
            I'm a new user
          </Link>
        </form>
      </div>
    </div>
  );
}
