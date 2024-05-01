
import { User } from "../models/user.model";
import { v4 as uuid } from "uuid";

const login = async (email: string, name: string, role: string, avatar: string) => {
    const existedUser  = await User.findOne({ email: email });
    if (existedUser ) {
        if(existedUser.role !== role || existedUser .avatar !== avatar) {
            existedUser.role = role;
            existedUser.avatar = avatar;
            await existedUser .save();
        }
        return existedUser ;
    } else {
        const newUser = await User.create({
            id: uuid(),
            email,
            name,
            role,
            avatar
        });
    
        return newUser;
    }
};

const getUser = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        console.log("Can not find user!");
    };

    return user;
};

const getUsersByRole = async (role: string) => {
    const users = await User.find({ role });
    return users;
};

export default {
    login,
    getUser,
    getUsersByRole,
};
