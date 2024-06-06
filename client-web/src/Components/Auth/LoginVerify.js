import { redirect } from "react-router-dom";
import { ip } from "../../Config/ip";

const LoginVerify = async () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return null;
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      token: token,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(`${ip}/verify`, requestOptions);
    const result = await response.json();
    console.log(result);
    if (result.rcode === 200) {
      if (result.data.Role === 5) {
        return redirect("/admin");
      } else if (result.data.Role === 4) {
        return redirect("/authority");
      } else if (result.data.Role === 3) {
        return redirect("/manager");
      } else {
        return redirect("/");
      }
    } else {
      localStorage.removeItem("token");
      return redirect("/");
    }
  }
};

export default LoginVerify;
