import type { RequestHandler } from "express";
import movieRepository from "./movieRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const movies = await movieRepository.readAll();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);
    const movie = await movieRepository.read(movieId);
    if (movie == null) {
      res.sendStatus(404);
    } else {
      res.json(movie);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  console.info("dans add", req.body);
  try {
    const movie = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      release_year: Number(req.body.release_year),
      duration: req.body.duration,
      poster: req.body.poster,
      trailer: req.body.trailer,
      casting: req.body.casting,
      production: req.body.production,
      landscape_image: req.body.landscape_image,
      premium: req.body.premium,
    };
    const insertId = await movieRepository.create(movie);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const movie = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
      release_year: req.body.release_year,
      duration: req.body.duration,
      poster: req.body.poster,
      trailer: req.body.trailer,
      casting: req.body.casting,
      production: req.body.production,
      landscape_image: req.body.landscape_image,
      premium: req.body.premium,
    };
    const affectedRows = await movieRepository.update(movie);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);
    await movieRepository.delete(movieId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
export default { browse, read, add, edit, destroy };
