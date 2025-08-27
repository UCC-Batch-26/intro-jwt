import { hash } from 'bcrypt';
import { User, USER_PERMISSION } from '../users/model.js';

export function login(req, res) {
  res.status(200).json({
    success: {
      message: `Welcome ${req.authenticatedUser.name}`,
    },
  });
}

export function onlyAdmin(req, res) {
  res.json({
    success: {
      message: 'Welcome Admin',
    },
  });
}

export function canEdit(req, res) {
  if (!req.authenticatedUser.permissions.includes(USER_PERMISSION.UPDATE)) {
    return res.status(401).json({
      error: {
        message: 'Unauthorized',
      },
    });
  }

  res.json({
    success: {
      message: 'Welcome Who can edit this page',
    },
  });
}

export async function resetPassword(req, res) {
  // GET fields from req.body
  const { email, newPassword } = req.body;

  // FIND the user based on email
  const user = await User.findOne({ email });

  // IF NOT FOUND 404
  if (!user) {
    return res.status(404).json({
      message: 'Cannot find user',
    });
  }

  const SALT_ROUNDS = 10;
  // UPDATE the user.password to hash
  user.password = await hash(newPassword, SALT_ROUNDS);

  await user.save();

  // (Happy Path) Response successfully
  res.json({
    success: {
      message: 'Successfully reset password',
    },
  });
}
