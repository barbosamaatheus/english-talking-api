import User from "../models/User";

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      picture: user.picture,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};
