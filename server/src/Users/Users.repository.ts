const { UserModel } = require("../Models/UserModel");
const bcrypt = require("bcrypt");

export const userRepository = {
    findUserByEmail: async (email: String) => {
        return await UserModel.findOne({ email })
    },
    findUserById: async (_id: String) => {
        return await UserModel.findOne({ _id })
    },
    addUser: async (userObj: Object) => {
        let user = await new UserModel(userObj);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = "********";
        return user
    },
    addFollower: async (userId: String, userToFollowId: String) => {
        const userToFollow = await UserModel.findOne({ _id: userToFollowId })
        if (!userToFollow)
            return
        return await UserModel.updateOne({ _id: userId }, { $addToSet: { follows: userToFollowId } })
    },
    removeFollower: async (userId: String, userToFollowId: String) => {
        return await UserModel.updateOne({ _id: userId, follows: { $in: [userToFollowId] } }, { $pull: { follows: userToFollowId } })
    },
    changeToManager: async (userId: String) => {
        return await UserModel.findOneAndUpdate({ _id: userId }, { role: "admin" }, { new: true })
    }


}

