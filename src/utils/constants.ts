import mongoose, { FilterQuery } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export const DEFAULT_PAGE_SIZE = 10;

export const isIdValid = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const buildUserFilter = (query?: string): FilterQuery<User> => {
  if (!query) return {}; // no query, return all users

  const regex = new RegExp(query, 'i'); // case-insensitive regex

  const conditions: any[] = [
    { fullname: { $regex: regex } }, //match fullname contains query
    { email: { $regex: regex } }, //match email contains query
    { role: { $regex: regex } }, //match role contains query
  ];

  //if the query is a valid ObjectId, add it to the conditions
  if (mongoose.Types.ObjectId.isValid(query)) {
    conditions.push({ _id: query });
  }

  return { $or: conditions }; //combines conditions with OR
};
