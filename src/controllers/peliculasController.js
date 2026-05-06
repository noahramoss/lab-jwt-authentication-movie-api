// src/controllers/peliculasController.js
const PeliculaService = require("../services/PeliculaService");

// GET /api/peliculas
const listarPeliculas = async (req, res, next) => {
  try {
    const resultado = await PeliculaService.obtenerTodas(req.query);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

// GET /api/peliculas/:id
const obtenerPelicula = async (req, res, next) => {
  try {
    const peliculas = await PeliculaService.obtenerPorId(Number(req.params.id));
    res.json(peliculas);
  } catch (error) {
    next(error);
  }
};

// POST /api/peliculas
const crearPelicula = async (req, res, next) => {
  try {
    const { titulo, director_id, anio, genero_id, nota } = req.body;

    if (!titulo || !director_id || !anio || !genero_id) {
      return res.status(400).json({
        error: "Los campos titulo, director, anio y genero son obligatorios",
      });
    }

    if (nota !== undefined && (nota < 0 || nota > 10)) {
      return res.status(400).json({ error: "La nota debe estar entre 0 y 10" });
    }

    const nuevaPelicula = await PeliculaService.crear({
      titulo,
      director_id,
      anio,
      genero_id,
      nota,
    });

    res.status(201).json(nuevaPelicula);
  } catch (error) {
    next(error);
  }
};

// PUT /api/peliculas/:id
const actualizarPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { titulo, director_id, anio, genero_id, nota } = req.body;

    if (!titulo || !director_id || !anio || !genero_id) {
      return res.status(400).json({
        error: "PUT requiere todos los campos: titulo, director, anio, genero",
      });
    }

    const peliculaActualizada = await PeliculaService.actualizar(id, {
      titulo,
      director_id,
      anio,
      genero_id,
      nota,
    });

    res.json(peliculaActualizada);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/peliculas/:id
const patchPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const pelicula = await PeliculaService.obtenerPorId(id);

    const datosActualizados = { ...req.body };

    delete datosActualizados.id;

    if (datosActualizados.anio !== undefined) {
      datosActualizados.anio = Number(datosActualizados.anio);
    }

    if (datosActualizados.nota !== undefined) {
      const nuevaNota = Number(datosActualizados.nota);
      if (nuevaNota < 0 || nuevaNota > 10) {
        return res
          .status(400)
          .json({ error: "La nota debe estar entre 0 y 10" });
      }
      datosActualizados.nota = nuevaNota;
    }

    const actualiza = await PeliculaService.actualizar(id, datosActualizados);

    res.json(actualiza);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/peliculas/:id
const eliminarPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const eliminada = await PeliculaService.eliminar(id);

    res.json({ mensaje: "Película eliminada", pelicula: eliminada });
  } catch (error) {
    next(error);
  }
};

// GET /api/estadisticas
const obtenerEstadisticas = async (req, res, next) => {
  try {
    const stats = await PeliculaService.obtenerEstadisticas();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

// GET /api/peliculas/:id/resenas
const listarResenas = async (req, res, next) => {
  try {
    const peliculaId = Number(req.params.id);
    const pelicula = await PeliculaService.obtenerPorId(peliculaId);

    const resenas = await PeliculaService.obtenerResenas(peliculaId);
    res.json({ pelicula: pelicula.titulo, resenas });
  } catch (error) {
    next(error);
  }
};

// POST /api/peliculas/:id/resenas
const crearResena = async (req, res, next) => {
  try {
    const peliculaId = Number(req.params.id);
    const pelicula = await PeliculaService.obtenerPorId(peliculaId);

    const { autor, texto, puntuacion } = req.body;

    if (!autor || !texto || puntuacion === undefined) {
      return res.status(400).json({
        error: "Los campos autor, texto y puntuacion son obligatorios",
      });
    }

    if (puntuacion < 1 || puntuacion > 10) {
      return res
        .status(400)
        .json({ error: "La puntuacion debe ser entre 1 y 10" });
    }

    const nueva = await PeliculaService.crearResena(peliculaId, {
      autor,
      texto,
      puntuacion,
    });

    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
};

const calificarPelicula = async (req, res, next) => {
  try {
    const peliculasId = Number(req.params.id);
    const { autor, texto, puntuacion } = req.body;
    const resultado = await PeliculaService.calificar(peliculaId, {
      autor,
      texto,
      putuacion,
    });
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listarPeliculas,
  obtenerPelicula,
  crearPelicula,
  actualizarPelicula,
  patchPelicula,
  eliminarPelicula,
  obtenerEstadisticas,
  listarResenas,
  crearResena,
  calificarPelicula,
};
