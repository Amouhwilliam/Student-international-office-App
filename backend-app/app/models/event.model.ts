import mongoosePaginate from "mongoose-paginate-v2";

const EventsModel = (mongoose: any) => {
  mongoose.plugin(mongoosePaginate)
  const Event = mongoose.model(
    "event",
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
  return Event;
};

export {EventsModel}