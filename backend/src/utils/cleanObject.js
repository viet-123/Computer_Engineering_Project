const cleanObject = (...correctProperties) => {
  return (req, res, next) => {
    for (const property in req.body) {
      if (!correctProperties.includes(property)) delete req.body[property];
    }
    return next();
  };
};

export default cleanObject;
