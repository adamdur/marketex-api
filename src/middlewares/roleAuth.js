import * as helper from "../utils/helpers/errors.helper";

export function roleAccess(role) {
    return async (req, res, next) => {
        let roleAuthorized = false;
        switch (role) {
            case 'admin':
                roleAuthorized = await helper.isAdmin(req.currentUser);
                break;
            case 'premium':
                roleAuthorized = await helper.isPremium(req.currentUser);
                break;
            case 'user':
                roleAuthorized = await helper.isUser(req.currentUser);
                break;
        }
        if (!roleAuthorized) return await helper.unauthorized(res);
        next();
    }
}