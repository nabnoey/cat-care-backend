import Service from "../models/service.model.js";

export const getServices = async (req, res) => {
  const services = await Service.find();
  res.send(services);
};

export const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.send(service);
};
