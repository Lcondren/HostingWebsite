//Create an array to store user data
const users = [];

//This creates the username and password 
function createUser(username, password){
    users.push({ username, password});
    console.log(users);
}

function authenticateUser(username, password){
    //Find the user by username in the array
    const user = users.find(user => user.username === username)

    if(!user || user.password !== password )
    {
        return false;
    }
     return true;
}

module.exports = {createUser, authenticateUser};