import { compare } from 'bcrypt';
import { User, USER_ROLE } from '../users/model.js';

export async function authenticate(req, res, next) {
  // GET fields that are needed from req.body: email, password
  const { email, password } = req.body;
  // FIND the email & password from collection
  // const user = User.find({ email })
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error: {
        message: 'Invalid credentials',
      },
    });
  }

  const isPasswordCorrect = await compare(password, user.password);
  // const isPasswordCorrect = compareSync(password, user.password)
  // IF PASSWORD IS INCORRECT 400 Invalid credentials
  if (!isPasswordCorrect) {
    return res.status(400).json({
      error: {
        message: 'Invalid credentials',
      },
    });
  }

  // UPDATE req with Authenticated user
  req.authenticatedUser = user;

  // CALL next middleware
  next();
}

export function authorizeAdmin(req, res, next) {
  if (req.authenticatedUser.role !== USER_ROLE.ADMIN) {
    return res.status(401).json({
      error: {
        message: 'Unauthorized',
      },
    });
  }

  next();
}
