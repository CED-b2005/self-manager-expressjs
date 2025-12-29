import { UserController } from "./user.controller"
import { UserService } from "./user.service"

const UserModule = {
    controlLer : UserController,
    service: UserService,
}

export default UserModule;