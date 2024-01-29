const { loginValidation, userValidation } = require("./Users.validator");
const { checkPassword, createToken } = require('../Funcs')
const { userRepository } = require('./Users.repository')
const { Request: ExpressRequest} = require("express");

export const userManager={
    signup : async (req: typeof ExpressRequest) => {
        let validBody = userValidation(req.body);
        if (validBody.error) {
            return { status: 400, value:   "ERROR: invalid comment details " + validBody.error.details[0].message  }
        }
        try {
            const user = await userRepository.addUser(req.body)
            let token = createToken(user._id, user.role);
            return { status: 200, value: {  token: `${token}`, user  } }
            // res.header('Authorization', `${token}`).json({{ token: `Bearer ${token}`, user },code:111});
        }
    
        catch (err) {
            if (err.code == 11000) {
                return { status: 500, value:   "ERROR: user name or email already in system, try log in"  }
            }
            return { status: 500, value:   err.message  }
        }
    },
    login :async (req: typeof ExpressRequest) => {
        let validBody = loginValidation(req.body);
        if (validBody.error) {
            return { status: 400, value:   "ERROR: invalid comment details " + validBody.error.details[0].message  }
        }
        try {
            const user = await userRepository.findUserByEmail(req.body.email)
    
            if (!user) {
                return { status: 401, value:  "ERROR: wrong user name or password"  }
            }
    
            let authPassword = await checkPassword(req.body.password, user.password);
            if (!authPassword) {
                return { status: 401, value:  "ERROR: wrong user name or password"  }
            }
            let token = createToken(user._id, user.role)
            return { status: 200, value: {  token: `Bearer ${token}`, user  } }
            //   res.header('Authorization', `Bearer ${token}`).json({{ token: `Bearer ${token}`, user }});    
        }
        catch (err) {
            return { status: 500, value:   err.message  }
        }
    },
    getUserDetails : async (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        try {
            const user = await userRepository.findUserById(userId)
            if (!user) {
                return { status: 400, value:   "ERROR: user not found"  }
            }
            return { status: 200, value: {  user } }
        }
        catch (err) {
            return { status: 500, value:   err.message  }
        }
    },
    addFollower : async (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        const userToFollowId = req.params.follow_id;
    
        if (userToFollowId==undefined) {
            return { status: 400, value:   "ERROR: invalid comment details ,send follow id"   }
        }
    
        try {
            const response = await userRepository.addFollower(userId, userToFollowId)
            if (response.matchedCount == 0)
                return { status: 400, value:   'user id not found'  }
            if (response.modifiedCount == 0)
                return { status: 400, value:   'you already follow this user'  }
            return { status: 200, value:   'success'  }
        }
        catch (err) {
            return { status: 500, value:   err.message  }
    
        }
    },
    removeFollower: async (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        const userToFollowId = req.params.follow_id;
    
        if (userToFollowId==undefined) {
            return { status: 400, value:  "ERROR: invalid comment details ,send follow id"   }
        }
    
        try {        
            const response =await userRepository.removeFollower(userId, userToFollowId)        
            if (response.matchedCount == 0)
                return { status: 400, value:   'user id not found'  }
            if (response.modifiedCount == 0)
                return { status: 400, value:  'you dont follow this user'  }
            return { status: 200, value:   'success'  }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    changeToManager : (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        try {
            const response = userRepository.changeToManager(userId)
            if (!response) {
                return { status: 400, value: {  response } }
            }
            return { status: 200, value:  'seccess'  }
        }
        catch (err) {
            return { status: 500, value:  err.message  }
        }
    }
}



