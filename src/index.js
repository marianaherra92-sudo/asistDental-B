require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const clinicaRoutes = require('./routes/clinicaRoutes');
const pacienteCompletoController = require('./routes/pacienteCompletoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const examenRoutes = require('./routes/examenRoutes');
const antecedentesRoutes = require('./routes/antecedentesRoutes');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/clinicas', clinicaRoutes);
app.use('/api', pacienteCompletoController);
app.use('/pacientes', pacienteRoutes);
app.use('/examenes', examenRoutes);
app.use('/antecedentes', antecedentesRoutes);

app.get('/', (req, res) => {
  res.send('API AsistDental Backend funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
