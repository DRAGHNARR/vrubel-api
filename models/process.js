const mongoose = require('mongoose');

const prosessShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    reqired: true,
  },
  actions: [{
    title: {
      type: String,
      exex: String
    }
  }],
  daddy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'process',
    required: false,
  },
});

prosessShema.statics.findProcessesByDaddy = function (daddy) {
  return this.find({ daddy })
    .then((processes) => {
      if (!processes) {
        return [processes];
      }

      return movies;
    });
};

module.exports = mongoose.model('process', prosessShema);