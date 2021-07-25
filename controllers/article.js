const Article = require('../models/article');

const add_article = async (req,res,next) => {

  const name = "Kedilerin Hayatı";
  const title = "Doğada Hayat";
  const content = "Kediler burada yaşamayı çok seviyor. Gece avlanıyor.";
  const summary = "Kedilerin bilinmeyen özellikleri";
  const category = "Hayvanlar";

  const article = await Article.create({
    name,
    title,
    content,
    summary,
    category,
  });

  res.status(200).json({
    success: true,
    data: article
  });
}

module.exports = {
  add_article
};
