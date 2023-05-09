import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAnnouncement,
  editAnnouncement,
  fetchAnnouncementByDate,
  fetchAnnouncementByName,
  fetchAnnouncementList,
  postAnnouncement,
} from "../../Utils/announcement-api";

//Set the initial state for announcement store
//Announcement list contains the list of announcements. Loading and error are used as flags
const initialState = {
  loading: false,
  announcementList: [],
  error: null,
};

//Create reducers for announcement.
const AnnouncementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncementList.pending, (state, action) => {
        state.loading = true;
      })
      //Get Announcement list from the database and set it to the Announcementlist state
      .addCase(fetchAnnouncementList.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementList = action.payload;
      })
      .addCase(fetchAnnouncementList.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(postAnnouncement.pending, (state, action) => {
        state.loading = true;
      })
      //Add new Announcement to the database and update the state
      .addCase(postAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementList.push(action.payload);
      })
      .addCase(postAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(editAnnouncement.pending, (state, action) => {
        state.loading = true;
      })
      //Edit Announcement and reflect the change in the db
      .addCase(editAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.announcementList.findIndex(
          (announcement) => announcement.id === action.payload.id
        );
        state.announcementList[index] = {
          ...state[index],
          ...action.payload,
        };
        console.log("state after edit", state.announcementList[index]);
      })
      .addCase(editAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(deleteAnnouncement.pending, (state, action) => {
        state.loading = true;
      })
      //Delete Announcement and update the state
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.announcementList.findIndex(
          ({ id }) => id === action.payload.id
        );
        console.log("index in del", index);
        state.announcementList.splice(index, 1);
        console.log("state after del", state);
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })

      .addCase(fetchAnnouncementByName.pending, (state, action) => {
        state.loading = true;
      })
      //Get announcement up search query
      .addCase(fetchAnnouncementByName.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementList = action.payload;
        console.log("state after search", state.announcementList);
      })
      .addCase(fetchAnnouncementByName.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(fetchAnnouncementByDate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAnnouncementByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementList = action.payload;
        console.log("state after search", state.announcementList);
      })
      .addCase(fetchAnnouncementByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default AnnouncementSlice.reducer;
