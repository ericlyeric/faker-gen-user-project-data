const faker = require('faker');
const fs = require('fs');

const locationIds = [
  5,
  8,
  11,
  16,
  19,
  20,
  21,
  22,
  23,
  44,
  45,
  46,
  47,
  49,
  50,
  51,
  66,
  70,
  73,
  75,
  76,
  77,
  79,
  81,
  82,
  84,
  97,
];

const generateRandomProjects = numberOfProjects => {
  let projectsArray = [];
  for (let i = 0; i < numberOfProjects; i++) {
    let project = {
      Id: i + 1,
      Number: `20${faker.random.number(1)}${faker.random.number(
        9,
      )}-${faker.random
        .alphaNumeric(4)
        .toUpperCase()}-${faker.random.number(
        9,
      )}${faker.random.number(9)}`,
      Title: faker.lorem.sentence(),
      LocationId:
        locationIds[Math.floor(Math.random() * locationIds.length)],
    };
    projectsArray.push(project);
  }
  return projectsArray;
};

const generateRandomUsers = numberOfUsers => {
  let usersArray = [];
  for (let i = 0; i < numberOfUsers; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName().replace("'", '');
    let user = {
      Id: i + 1,
      FirstName: firstName,
      LastName: lastName,
      Username: `${lastName.toLowerCase()}${firstName[0].toLowerCase()}`,
      LocationId:
        locationIds[Math.floor(Math.random() * locationIds.length)],
    };
    usersArray.push(user);
  }
  return usersArray;
};

const writeProjectsToSql = projectsArray => {
  let logger = fs.createWriteStream('projects.sql', {
    flags: 'a',
  });
  logger.write('SET IDENTITY_INSERT [dbo].[Projects] ON\n');
  for (let i = 0; i < projectsArray.length; i++) {
    logger.write(
      `INSERT [dbo].[Projects] ([Id], [Number], [Title], [LocationId]) VALUES (${projectsArray[i].Id}, '${projectsArray[i].Number}', '${projectsArray[i].Title}', ${projectsArray[i].LocationId})\n`,
    );
  }
  logger.write('SET IDENTITY_INSERT [dbo].[Projects] OFF\n');
};

const writeUsersToSql = usersArray => {
  let logger = fs.createWriteStream('users.sql', {
    flags: 'a',
  });
  logger.write('SET IDENTITY_INSERT [dbo].[Users] ON\n');
  for (let i = 0; i < usersArray.length; i++) {
    logger.write(
      `INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [LocationId]) VALUES (${usersArray[i].Id}, '${usersArray[i].FirstName}', '${usersArray[i].LastName}', '${usersArray[i].Username}', ${usersArray[i].LocationId})\n`,
    );
  }
  logger.write('SET IDENTITY_INSERT [dbo].[Users] OFF\n');
};

const run = () => {
  let projectsArray = generateRandomProjects(10000);
  writeProjectsToSql(projectsArray);
  let usersArray = generateRandomUsers(1000);
  writeUsersToSql(usersArray);
};

run();
