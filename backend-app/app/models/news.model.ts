const mongoosePaginate = require("mongoose-paginate-v2");

const NewsModel = (mongoose:any) => {
    mongoose.plugin(mongoosePaginate)
    const News = mongoose.model(
      "news",
      mongoose.Schema(
        {
          title: String,
          subTitle: String,
          description: String,
          shortDescription: String,
          published: Boolean,
          media: String,
        },
        { timestamps: true }
      )
    );
    return News;
  };

export {NewsModel}