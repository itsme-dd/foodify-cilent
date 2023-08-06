import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [bgColor1, setbgColor1] = useState("#13b2a7");
  const [bgColor2, setbgColor2] = useState("#28b27a");
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let navigate = useNavigate();
  const handleChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,geolocation:credentials.geolocation})
    // )
    const response = await fetch("http://localhost:5000/api/CreateUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    //console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    } else navigate("/login");
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1028708/pexels-photo-1028708.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          height:"100vh",
          

        }}
      >
        <form
          onSubmit={handleSubmit}
          className="m-auto border rounded p-3"
          style={{ backgroundColor: "#00282a42" }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control text-white "
              name="name"
              value={credentials.name}
              onChange={handleChange}
              unique="true"
              style={{ backgroundColor: "rgb(73 74 57 / 44%)" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control text-white"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              style={{ backgroundColor: "rgb(73 74 57 / 44%)" }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control text-white"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={{ backgroundColor: "rgb(73 74 57 / 44%)" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control text-white"
              name="geolocation"
              value={credentials.geolocation}
              onChange={handleChange}
              style={{ backgroundColor: "rgb(73 74 57 / 44%)" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: bgColor1}}
            onMouseOver={()=>setbgColor1("#4a4a8270")}
            onMouseOut={()=>setbgColor1("#13b2a7")}
          >
            Submit
          </button>
          <Link to="/login" className="m-3 btn "
          style={{ backgroundColor: bgColor2}}
          onMouseOver={()=>setbgColor2("#4a4a8270")}
          onMouseOut={()=>setbgColor2("#28b27a")}>
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
