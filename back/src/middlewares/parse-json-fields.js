export function parseJsonFields(fields) {
  return (req, res, next) => {
    fields.forEach(field => {
      const value = req.body[field];
      if (value && typeof value === 'string') {
        try {
          req.body[field] = JSON.parse(value);
        } catch (err) {
          return res.status(410).json({ error: `${field} باید JSON معتبر باشد` });
        }
      }
    });
    next();
  };
}

