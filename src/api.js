const API_URL = 'http://localhost:8000/api'


export const getUserList = (userid) => {
    const url = API_URL + '/get/' + userid + '/';
    const token = sessionStorage.getItem('token');
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}

export const verifyUser = (username) => {
    const url = API_URL + '/verfiy/' + username + '/';
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}

export const createUser = (reqbody) => {
    const url = API_URL + '/create/';
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}

export const AddFriend = (reqbody) => {
    const url = API_URL + '/add/';
    const token = sessionStorage.getItem('token');
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}

export const DeleteFriend = (userid, friendid) => {
    const url = API_URL + '/delete/' + userid + '/' + friendid + '/';
    const token = sessionStorage.getItem('token');
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}

export const DeleteUser = (userid) => {
    const url = API_URL + '/delete/' + userid + '/';
    const token = sessionStorage.getItem('token');
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}

export const EditUserName = (reqbody) => {
    const url = API_URL + '/edit/';
    const token = sessionStorage.getItem('token');
    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}