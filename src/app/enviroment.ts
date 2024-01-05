export const FIREBASE_CONFIG ={
    apiKey: "AIzaSyBVXZNO4nZMZ--_tmR7cXEthXRbeMRnqzI",
    authDomain: "nbwedding-f7d0c.firebaseapp.com",
    databaseURL: "https://nbwedding-f7d0c.firebaseio.com",
    projectId: "nbwedding-f7d0c",
    storageBucket: "nbwedding-f7d0c.appspot.com",
    messagingSenderId: "186310144028"
};

export const snapshotToArray = snaphot =>{
    let returnArray = [];
    snaphot.forEach(element => {
        let item = element.val();
        item.key = element.key;
        returnArray.push(item);
    });
    return returnArray;
}

