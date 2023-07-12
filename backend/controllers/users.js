const { NODE_ENV, JWT_SECRET, SALT } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');
const NotFoundError = require('../errors/notFoundError');
const IncorrectDataError = require('../errors/incorrectDataError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .orFail(() => new UnauthorizedError('Пользователь не найден в системе'))
    .select('+password')
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((matched) => {
        if (matched) {
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'MDKL');
          res.cookie('jwt', token, {
            maxAge: 360000,
            secure: true,
            httpOnly: true,
            sameSite: 'none',
          });
          res.status(200).send(user);
        } else {
          next(new UnauthorizedError('Не правильный логин или пароль'));
        }
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(String(req.body.password), NODE_ENV === 'production' ? SALT : 10)
    .then((hash) => {
      User.create({
        ...req.body,
        password: hash,
      }).then((user) => {
        res.status(201).send(user);
      })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Этот email уже зарегистрирован в базе'));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new IncorrectDataError('Введен некорректный URL аватара'));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUserAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Введен некорректный URL аватара'));
        return;
      }
      next(err);
    });
};

const updateAvatarUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Введен некорректный URL аватара'));
        return;
      }
      next(err);
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt', {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  }).send({ message: 'Выход' });
};

module.exports = {
  login,
  getUserById,
  createUser,
  getUsers,
  updateUser,
  updateAvatarUser,
  getUserAboutMe,
  logout,
};
