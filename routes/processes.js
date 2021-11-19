const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getProcessesByType, addProcess, removeProcess } = require('../controllers/processes');

router.get('/:type', getProcessesByType);

router.post('/:type', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    type: Joi.string().required(),
    actions: Joi.array().items(
        Joi.object().keys({
            title: Joi.string().required(),
            exec: Joi.string().required(),
        })
    ),
    daddy: Joi.string().required(),
  }).unknown(true),
}), addProcess);

router.delete('/:type/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required(),
  }),
}), removeProcess);

module.exports = router;