const paginate = (model) => async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const total = await model.countDocuments();
  const nextPage = page + 1 <= Math.ceil(total / limit) ? page + 1 : null;
  const prevPage = page - 1 > 0 ? page - 1 : null;

  const data = await model.find().limit(limit).skip(startIndex);
  res.status(200).json({
    data,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    nextPage,
    prevPage,
  });
};

module.exports = { paginate };
