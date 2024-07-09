import { v4 as uuidv4 } from 'uuid';
export const seed = async (knex) => {
  await knex('Users').insert([
    { ID: uuidv4(), FirstName: 'John', LastName: 'Doe',Password: '1234', Email: 'john.doe@example.com' ,Username: 'johndoe' },
    { ID: uuidv4(), FirstName: 'Jane', LastName: 'Smith',Password: '1234', Email: 'jane.smith@example.com', Username: 'janesmith' }
      // More rows as needed
  ]);
};