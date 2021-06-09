module.exports.errorHandler = async (req, res, func) => {
  try {
    await func();
  } catch (ex) {
    res.json({ error: ex });
  }
};
