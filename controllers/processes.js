const Process = require('../models/process');

module.exports.getProcessesByDaddy = (req, res, next) => {
    Process.findProcessesByDaddy(req.process._id)
        .then((processes) => res.send({ processes }))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                const error = new Error('Недостаточно прав.');
                error.statusCode = 403;
                next(error);
            } else {
                next(err);
            }
        });
};

module.exports.getProcessesByType = (req, res, next) => {
    const { type } = req.params;
    console.log(type);


    Process.find({ type })
        .then((processes) => res.send({ processes }))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                const error = new Error('Недостаточно прав.');
                error.statusCode = 403;
                next(error);
            } else {
                next(err);
            }
        });
};

module.exports.addProcess = (req, res, next) => {
    const { title, type, actions, daddy } = req.body;

    Process.create({ title, type, actions, daddy })
    .then((process) => res.send({ process }))
    .catch((err) => {
        if (err.name === 'ValidationError') {
            const error = new Error('Переданы некорректные данные при создании картины.');
            error.statusCode = 400;
            next(error);
        } else {
            next(err);
        }
    });
}

module.exports.removeProcess = (req, res, next) => {
    Process.findOne({ id: req.params.id })
        .then((process) => {
            if (!process) {
                const error = new Error('Картина с указанным _id не найдена.');
                error.statusCode = 404;
                next(error);
            } else {
            Process.findByIdAndRemove(id)
                .then(res.send({ process }))
                .catch(() => {
                    const error = new Error('Картина с указанным _id не найдена.');
                    error.statusCode = 404;
                    next(error);
                });
            }
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                const error = new Error('Картина с указанным _id не найдена.');
                error.statusCode = 404;
            next(error);
            } else {
                next(err);
            }
        });
}