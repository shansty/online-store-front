function getIDFromToken() {

    const token = localStorage.getItem("token");
    if(!token) {
        return null
    } else {
        let tokenParts = token.split('.');
        let payload = JSON.parse(atob(tokenParts[1]));
        return payload.id;
    }
}

export default getIDFromToken;