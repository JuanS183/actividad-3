import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

import { userRouter } from './routes/usuarioRoutes.js'
import { habitoRouter } from './routes/habitoRoutes.js'
import { proyectoRouter } from './routes/proyectoRoutes.js'
import { categoriaRouter } from './routes/categoriaRoutes.js'
import { actividadRouter } from './routes/actividadRoutes.js'
import { authRouter } from './routes/authRoute.js'

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//app.use(morgan(combined))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter)
app.use('/usuarios', userRouter)
app.use('/habitos', habitoRouter)
app.use('/proyectos', proyectoRouter)
app.use('/categorias', categoriaRouter)
app.use('/actividades', actividadRouter)

app.get('/', (req, res) => {
  res.render('index', { titulo: 'Bienvenido a Gestor' });
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    mensaje: 'Error interno del servidor',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
