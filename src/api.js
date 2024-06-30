const API_URL  ='http://localhost:8000/api'


export const getUserList = (userid) => {
    const url = API_URL + '/get/' + userid + '/';
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}

export const verifyUser = (reqbody) => {
    const url = API_URL + '/verfiy/';
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

export const DeleteFriend = (userid, friendid) => {
    const url = API_URL + '/delete/'+userid+'/'+friendid+'/';
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        });
}

export const DeleteUser = (userid) => {
    const url = API_URL + '/delete/'+userid+'/';
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
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
    const fetchOptions = {
        method: "PATCH",
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