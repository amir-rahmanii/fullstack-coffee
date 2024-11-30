 type UserType = {
    _id : string ,
    email : string,
    username : string,
    role : "USER" | "ADMIN",
    createdAt : Date
}

export default UserType