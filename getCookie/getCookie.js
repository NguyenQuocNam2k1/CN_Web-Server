

function getCookie(nameCookie) {
    let name = nameCookie + "=";
    let decodedCookie = decodeURIComponent(document.cookie);

    let arrayCookie = decodedCookie.split(';'); 

    for (let i = 0; i < arrayCookie.length; i++) {
        let c = arrayCookie[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            let token = c.substring(name.length, c.length);
            return token;
        }
    }
    return "";
}

export default getCookie;