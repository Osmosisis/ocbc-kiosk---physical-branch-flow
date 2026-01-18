
import { Branch, User } from './types';

export const MOCK_USER: User = {
  name: 'John Doe',
  tier: 'PREMIER BANKING',
  initials: 'JD'
};

export const BRANCHES: Branch[] = [
  // CENTRAL
  {
    id: '1',
    name: 'OCBC Centre Branch',
    address: '65 Chulia St, #01-00 OCBC Centre',
    postalCode: 'Singapore 049513',
    isPremier: true,
    region: 'CENTRAL'
  },
  {
    id: '2',
    name: 'SMU Branch',
    address: '70 Stamford Road #B1-43, SMU',
    postalCode: 'Singapore 178901',
    isPremier: false,
    region: 'CENTRAL'
  },
  {
    id: '3',
    name: 'Orchard Gateway',
    address: '277 Orchard Road #B2-10/11',
    postalCode: 'Singapore 238858',
    isPremier: true,
    region: 'CENTRAL'
  },
  {
    id: '4',
    name: 'Tiong Bahru Plaza',
    address: '302 Tiong Bahru Road #01-125',
    postalCode: 'Singapore 168732',
    isPremier: false,
    region: 'CENTRAL'
  },
  {
    id: '5',
    name: 'HarbourFront Centre',
    address: '1 Maritime Square #02-104',
    postalCode: 'Singapore 099253',
    isPremier: false,
    region: 'CENTRAL'
  },
  // EAST
  {
    id: '6',
    name: 'Tampines Branch',
    address: 'Tampines Central 1, #01-01',
    postalCode: 'Singapore 529540',
    isPremier: false,
    region: 'EAST'
  },
  {
    id: '7',
    name: 'Bedok North Branch',
    address: 'Blk 212 Bedok North St 1 #01-147',
    postalCode: 'Singapore 460212',
    isPremier: false,
    region: 'EAST'
  },
  {
    id: '8',
    name: 'Parkway Parade',
    address: '80 Marine Parade Road #01-14',
    postalCode: 'Singapore 449269',
    isPremier: true,
    region: 'EAST'
  },
  {
    id: '9',
    name: 'Changi Airport T3',
    address: '65 Airport Boulevard #B2-53',
    postalCode: 'Singapore 819663',
    isPremier: false,
    region: 'EAST'
  },
  {
    id: '10',
    name: 'Paya Lebar Quarter',
    address: '10 Paya Lebar Road #B1-12',
    postalCode: 'Singapore 409057',
    isPremier: true,
    region: 'EAST'
  },
  // NORTH
  {
    id: '11',
    name: 'Northpoint City',
    address: '930 Yishun Ave 2 #B1-40',
    postalCode: 'Singapore 769098',
    isPremier: false,
    region: 'NORTH'
  },
  {
    id: '12',
    name: 'Causeway Point',
    address: '1 Woodlands Square #02-10',
    postalCode: 'Singapore 738099',
    isPremier: false,
    region: 'NORTH'
  },
  {
    id: '13',
    name: 'Ang Mo Kio Branch',
    address: 'Blk 702 Ang Mo Kio Ave 8 #01-2511',
    postalCode: 'Singapore 560702',
    isPremier: false,
    region: 'NORTH'
  },
  {
    id: '14',
    name: 'Waterway Point',
    address: '83 Punggol Central #B2-04',
    postalCode: 'Singapore 828761',
    isPremier: true,
    region: 'NORTH'
  },
  {
    id: '15',
    name: 'Hougang Mall',
    address: '90 Hougang Ave 10 #03-12',
    postalCode: 'Singapore 538766',
    isPremier: false,
    region: 'NORTH'
  },
  // WEST
  {
    id: '16',
    name: 'Jurong Gateway',
    address: '21 Jurong Gateway Road',
    postalCode: 'Singapore 608512',
    isPremier: true,
    region: 'WEST'
  },
  {
    id: '17',
    name: 'Clementi Branch',
    address: 'Blk 449 Clementi Ave 3 #01-241',
    postalCode: 'Singapore 120449',
    isPremier: false,
    region: 'WEST'
  },
  {
    id: '18',
    name: 'Westgate',
    address: '3 Gateway Drive #02-12',
    postalCode: 'Singapore 608532',
    isPremier: true,
    region: 'WEST'
  },
  {
    id: '19',
    name: 'Choa Chu Kang Branch',
    address: '304 Choa Chu Kang Ave 4 #01-657',
    postalCode: 'Singapore 680304',
    isPremier: false,
    region: 'WEST'
  },
  {
    id: '20',
    name: 'JEM Branch',
    address: '50 Jurong Gateway Road #B1-12',
    postalCode: 'Singapore 608549',
    isPremier: false,
    region: 'WEST'
  }
];
