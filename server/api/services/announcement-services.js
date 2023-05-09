import Announcement from "../models/announcement.js";
/**
 * @desc created a new announcement item
 */
export const save = (newAnnouncement) => {
  //mongoose docs - model.prototype.save()
  const announcement = new Announcement(newAnnouncement);
  return announcement.save();
};

/**
 * @desc gets the announcements based on the query params passed
 */
export const search = async (query) => {
  const params = { ...query };
  const announcementResult = Announcement.find(params).exec(); //find does an database query, returns the result as promise
  return announcementResult;
};

/**
 * @desc gets the specific Announcement item
 */
export const get = (id) => {
  const announcementItem = Announcement.findById(id).exec();
  return announcementItem;
};

export const getList = async () => {
  let fullList = await Announcement.find();
  return fullList;
};

/**
 * @desc update the spefic announcement item
 */
export const update = (updateAnnouncement) => {
  updateAnnouncement.lastModifiedDate = new Date();
  const announcementUpdated = Announcement.findByIdAndUpdate(
    updateAnnouncement.id,
    updateAnnouncement,
    {
      new: true,
    }
  ).exec();
  return announcementUpdated;
};

/**
 * @desc deletes the speecific announcement item
 */
export const remove = (id) => {
  const announcementDeleted = Announcement.findByIdAndDelete(id).exec();
  return announcementDeleted;
};
