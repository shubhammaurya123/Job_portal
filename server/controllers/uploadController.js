const Vimeo = require("vimeo").Vimeo;
require("dotenv").config();
const User = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

exports.uploadController = async (req, res) => {
 
  let client = new Vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );
  let path = req.file.path;
  const query = { _id: req.body.id };
  var params = {
    name: req.body.id,
    description: "Student description",
  };
  client.upload(
    path,
    params,
    function (uri) {
      // Getting the metadata response from the upload
      client.request(
        uri + "?fields=link",
        async function (error, body, statusCode, headers) {
          if (error) {
            console.log("There was an error making the request.");
            console.log("Server reported: " + error);
            res.json({ statusCode: statusCode, err: error });
            return;
          }
          const user = await User.updateOne(query, {
            profileVideoLink: body.link,
          });
          res.json({ statusCode: statusCode, msg: "ok" });

          // Making  an API call to see if the video is finished transcoding.
          client.request(
            uri + "?fields=transcode.status",
            function (error, body, statusCode, headers) {
              if (error) {
                console.log("There was an error making the request.");
                console.log("Server reported: " + error);
                res.json({ statusCode: statusCode, err: error });
                return;
              }
              if (body.transcode.status === "complete") {
                console.log("Your video finished transcoding.");
              } else if (body.transcode.status === "in_progress") {
                console.log("Your video is still transcoding.");
              } else {
                console.log(
                  "Your video encountered an error during transcoding."
                );
              }
            }
          );
          // Removing file from diskstorage after uploading
          unlinkfile(req.file.path);
        }
      );
    },
    function (bytesUploaded, bytesTotal) {
      var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      console.log(bytesUploaded, bytesTotal, percentage + "%");
    },
    function (error) {
      console.log("Failed because: " + error);
    }
  );
};

// Function Using file system to remove video file from diskstorage after uploading it
function unlinkfile(path) {
  unlinkAsync(path);
}
