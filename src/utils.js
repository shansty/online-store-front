import Login from "./components/Login";

function getIDFromToken() {
    let savedToken = localStorage.getItem("token");
    if(!savedToken) {
        return(
            <Login />
        )
    } else {
        let tokenParts = savedToken.split('.');
        let payload = JSON.parse(atob(tokenParts[1]));
        return payload.id;
    }
}

export default getIDFromToken;

