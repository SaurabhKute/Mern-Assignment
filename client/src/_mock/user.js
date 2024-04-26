import { sample } from 'lodash';
import { faker } from '@faker-js/faker';


export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  title: faker.person.fullName(),
  description: faker.company.name(),
  price: faker.datatype.boolean(),
  category: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
  ]),
  sold: sample(['True', 'False']),
  image: `/assets/images/avatars/avatar_${index + 1}.jpg`,
}));


