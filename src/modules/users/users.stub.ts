import { Gender, Role } from "./dto/user.dto"

export const UserStub = () => {
  return {
    id:1,
    username: 'karesian',
    email: 'email@gmail.com',
    password: 'Abcde_1234',
    gender: Gender.MALE,
    role: Role.ADMIN
  }
}
