import { hash } from 'bcrypt';
import { User, USER_ROLE } from './model.js';

export async function createUser(req, res) {
  try {
    const {
      name,
      email,
      password,
      permissions = [],
      role = USER_ROLE.USER,
    } = req.body;

    const SALT_ROUNDS = 10;

    const user = await User.create({
      name,
      email,
      password: await hash(password, SALT_ROUNDS),
      permissions,
      role,
    });

    return res.status(201).json({
      success: {
        message: `Successfully created new user`,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          permissions: user.permissions,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: {
        message: 'Unable to create user',
        details: error,
      },
    });
  }
}

export async function getUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id, '-password -__v');

    return res.json({
      success: {
        message: 'Successfully get user information',
        data: user,
      },
    });
  } catch (error) {
    return res.status(404).json({
      error: {
        message: 'Unable to find user',
        details: error,
      },
    });
  }
}
