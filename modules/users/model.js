import { Schema, model } from 'mongoose';

export const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

export const USER_PERMISSION = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: USER_ROLE.USER,
  },
  permissions: {
    type: [String],
  },
});

export const User = model('User', userSchema);
