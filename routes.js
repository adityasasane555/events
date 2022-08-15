const express = require("express");
const router = express.Router();
const dbConnect = require("./database");
const upload = require("./multer");

router.get("/events", async (req, res) => {
  let Data = await dbConnect();

  let result = Data.findOne({}, (err, data) => {
    if (!data) {
      res.send("Data Not Found!")
    } else {
      res.send(data);
    }
  });
})

router.get("/events/:id", async (req, res) => {
  let id = req.params.id;
  let Data = await dbConnect();

  let result = Data.findOne({ uid: id }, (err, data) => {
    if (!data) {
      res.send("No Record Found!");
    } else {
      res.send(data);
    }
  });
})

router.post("/events", upload.single("image"), async (req, res) => {
  let Data = await dbConnect();

  let type = "event";
  let uid = req.body.uid;
  let name = req.body.name;
  let tagline = req.body.tagline;
  let schedule = req.body.schedule;
  let description = req.body.description;
  let image = req.file.filename;
  let moderator = req.body.moderator;
  let category = req.body.category;
  let sub_category = req.body.subcategory;
  let rigor_rank = req.body.rigorrank;
  let attendees = [{ Users: req.body.attendees }];

   Data.insertOne({ type, uid, name, tagline, schedule, description, image, moderator, category, sub_category, rigor_rank, attendees }, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Data Inserted!");
    }
  });
})

router.put("/events/:id", upload.single("image"), async (req, res) => {
  let id = req.params.id;
  let Data = await dbConnect();
  var Uid, Name, Image, Tagline, Schedule, Description, Moderator, Category, Sub_category, Rigor_rank;

  Data.findOne({ uid: id }, (err, data) => {
    if (err) {
      throw err;
    } else {
      Uid = data.uid;
      Name = data.name;
      Image = data.image;
      Tagline = data.tagline;
      Schedule = data.schedule;
      Description = data.description;
      Moderator = data.moderator;
      Category = data.category;
      Sub_category = data.sub_category;
      Rigor_rank = data.rigor_rank;

      if (req.body.uid != undefined) {
        Uid = req.body.uid;
      }

      if (req.body.name != undefined) {
        Name = req.body.name;
      }

        if(req.file.filename!=undefined){
          Image = req.file.filename;
        }

      if (req.body.tagline != undefined) {
        Tagline = req.body.tagline;
      }

      if (req.body.schedule != undefined) {
        Schedule = req.body.schedule;
      }

      if (req.body.description != undefined) {
        Description = req.body.description;
      }

      if (req.body.moderator != undefined) {
        Moderator = req.body.moderator;
      }

      if (req.body.category != undefined) {
        Category = req.body.category;
      }

      if (req.body.sub_category != undefined) {
        Sub_category = req.body.sub_category;
      }

      if (req.body.rigorrank != undefined) {
        Rigor_rank = req.body.rigorrank;
      }

      Data.updateOne({ uid: id }, { $set: { uid: Uid, name: Name, image: Image, tagline: Tagline, schedule: Schedule, description: Description, moderator: Moderator, category: Category, sub_category: Sub_category, rigor_rank: Rigor_rank } }, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log("Document Updeted!");
        }
      });
    }
  });
});



router.delete("/events/:id", async (req, res) => {
  let id = req.params.id;
  let Data = await dbConnect();

  let result = Data.deleteOne({ uid: id }, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Data Deleted Sucessfully!");
    }
  });

})


module.exports = router;