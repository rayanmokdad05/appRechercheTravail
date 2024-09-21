const HttpError = require('../util/http-error'); // Assurez-vous que le chemin d'accès est correct
const { validationResult } = require('express-validator');

const uuid = require('uuid');
const DUMMY_TASKS = [
  {
    id: 't1',
    title: 'Acheter du lait',
    description: 'Acheter du lait au supermarché',
    dueDate: '2024-04-15',
    priority: 'haute',
    assignee: 'u1',
  },
];

const getTasks = (req, res, next) => {
  res.json({ tasks: DUMMY_TASKS });
};

const getTasksById = (req, res, next) => {
  const taskId = req.params.tid; // { tid: 't1' }
  const task = DUMMY_TASKS.find((t) => {
    return t.id === taskId;
  });
  //si la tâche n'est pas trouvée... erreur 404
  if (!task) {
    /*const error = new Error('Tâche non trouvée');
      error.code = 404; // Spécifie le code de statut HTTP pour l'erreur
      return next(error); // Déclenche une erreur personnalisée
      --boni:*/
    return next(new HttpError('Tâche non trouvée', 404));
  }

  res.json({ task }); // => { task } => { task: task }
};

const getTasksByUserId = (req, res, next) => {
  const userId = req.params.uid; // Récupère l'ID utilisateur de l'URL
  const tasksForUser = DUMMY_TASKS.filter((t) => t.assignee === userId);
  if (tasksForUser?.length === 0) {
    /*const error = new Error('Utilisateur non trouvé');
      error.code = 404; // Spécifie le code de statut HTTP pour l'erreur
      return next(error); // Déclenche une erreur personnalisée
      --boni:*/
    return next(new HttpError('Utilisateur non trouvé', 404));
  }
  res.json({ tasks: tasksForUser });
};

//POST
const createTask = (req, res, next) => {
  
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new HttpError('données saisies invalides valider votre payload', 422)
    );
  }
  const { title, description, dueDate, priority, assignee } = req.body;
  const createdTask = {
    id: uuid.v4(),
    title,
    description,
    dueDate,
    priority,
    assignee,
  };

  DUMMY_TASKS.push(createdTask);
  //201 standard pour créé avec succès
  res.status(201).json({ task: createdTask });
};
//PUT
const updateTask = (req, res, next) => {
  const { title, description } = req.body;
  const taskId = req.params.tid;
  // nous prenons une copie de la tâche a modifier, la modifierons et ensuite nous nettrons
  // la tâche dans la liste. Ceci nous protège en cas d'erreur...
  const updatedTask = { ...DUMMY_TASKS.find((t) => t.id === taskId) };
  const taskIndex = DUMMY_TASKS.findIndex((t) => t.id === taskId);
  if (title) updatedTask.title = title;
  if (description) updatedTask.description = description;
  if (dueDate) updatedTask.dueDate = dueDate;
  if (priority) updatedTask.priority = priority;

  DUMMY_TASKS[taskIndex] = updatedTask;

  res.status(200).json({ task: updatedTask });
};

//DELETE
const deleteTask = (req, res, next) => {
  const taskId = req.params.tid;
  DUMMY_TASKS = DUMMY_TASKS.filter((t) => t.id !== taskId);
  res.status(200).json({ message: 'Deleted task.' });
};

exports.getTasks = getTasks;
exports.getTasksById = getTasksById;
exports.getTasksByUserId = getTasksByUserId;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
