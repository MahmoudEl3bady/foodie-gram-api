const refreshTokens= [];



export function saveRefreshToken(token) {
    refreshTokens.push(token);
    console.log(refreshTokens);
}

export function isValidRefreshToken(token) {
    return refreshTokens.includes(token);
}




export function deletingRefreshToken (token){
     refreshTokens.splice(refreshTokens.indexOf(token),1);
}