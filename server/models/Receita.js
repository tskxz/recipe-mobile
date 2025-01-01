import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  quantity: {
    type: String,
    required: false,
  },
});

const StepSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const ReceitaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Fácil', 'Médio', 'Difícil'],
  },
  num_people: {
    type: Number,
    required: true,
    min: 1,
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public', // TODO: meter privado no fim de desenvolvimen
  },
  image: {
    type: String,
    required: false,
  },
  /*
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },*/
  ingredients: {
    type: [IngredientSchema],
    required: false,
  },
  steps: {
    type: [StepSchema],
    required: false,
  },
}, {
  timestamps: true,
});

const Receita = mongoose.model('Receita', ReceitaSchema);

export default Receita;
