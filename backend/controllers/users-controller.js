// users-controller.js
const jwt = require('jsonwebtoken');
const uuid = require('uuid'); // Assurez-vous d'avoir la bibliothèque 'uuid'.

let MOCK_USERS = [
  {
    id: 'u1',
    name: ' Ons Mlouki',
    email: 'test1@example.com',
    password: 'testers',
    image:
      'https://static.vecteezy.com/ti/vecteur-libre/p3/21688200-fermer-portrait-de-une-femelle-personnage-avec-un-islamique-voile-foulard-hijab-tchador-rond-cercle-avatar-icone-pour-social-medias-utilisateur-profil-site-internet-application-ligne-dessin-anime-style-vecteur-illustration-vectoriel.jpg',
    tasks: 3,
  },
  {
    id: 'u2',
    name: 'Marc-Olivier Tremblay',
    email: 'test2@example.com',
    password: 'testers',
    image:
      'https://cdn.icon-icons.com/icons2/582/PNG/512/gentleman_icon-icons.com_55044.png',
    role: 'normal',
    tasks: 5,
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: MOCK_USERS });
};

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: 'Utilisateur non trouvé.' });
  } else {
    res.json({ user });
  }
};

const registerUser = (req, res, next) => {
  console.log('registering');
  const { name, email, password, image, role } = req.body;
  const hasUser = MOCK_USERS.find((u) => u.email === email);
  if (hasUser) {
    res.status(422).json({ message: 'Cet email est déjà utilisé.' });
    return;
  }
  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password, // À noter : En pratique, le mot de passe devrait être encrypté avant d'être stocké.
    image,
    role,
  };
  MOCK_USERS.push(createdUser);
  console.log('registered');
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  const identifiedUser = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  console.log(identifiedUser);
  if (!identifiedUser) {
    res
      .status(401)
      .json({ message: 'Identification échouée, vérifiez vos identifiants.' });
  } else {
    res.status(201).json({
      userId: identifiedUser.id,
      email: identifiedUser.email,
    });
  }
};

const updateUserById = (req, res, next) => {
  const userId = req.params.uid;
  const { name, email, password, image, role } = req.body;
  const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);
  const updatedUser = {
    ...MOCK_USERS[userIndex],
    name,
    email,
    password,
    image,
    role,
  };
  MOCK_USERS[userIndex] = updatedUser;
  res.status(200).json({ user: updatedUser });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.registerUser = registerUser;
exports.login = login;
exports.updateUserById = updateUserById;
