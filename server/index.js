//@ts-check
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const fsp = require("fs/promises");
const { cursorTo } = require("readline");
const { nextTick } = require("process");
const createHttpError = require("http-errors");

//constants

const PORT = process.env.PORT || 8080;
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
const NODE_ENV = process.env.NODE_ENV || "development";

//utils

/**
 * @param {string} filepath
 * @returns string
 */
async function sha256(filepath) {
  const contentbuff = await fsp.readFile(filepath);
  const hash = crypto.createHash("sha256").update(contentbuff).digest("hex");
  return hash;
}

function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

//setup

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const id = uuid();
      cb(null, id + ext);
    },
  }),
});

//middleware

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.get("/healthcheck", (req, res) => {
  res.json({
    status: "ok",
  });
});

if (NODE_ENV == "development") {
  app.get("/calculatehash", (req, res) => {
    const template = `
            <form action="/calculatehash" method="post" enctype="multipart/form-data">
                <input type="file" name="certificate" />
                <button type="submit">Calculate Hash</button>
            </form>
        `;
    res.send(template);
  });
}

app.post(
  "/calculatehash",
  upload.single("certificate"),
  catchAsync(async (req, res, next) => {
    if (!req.file) {
      throw new createHttpError.BadRequest("file not found");
    }

    const filepath = req.file.path;
    const ext = path.extname(req.file.originalname);

    if (ext != ".pdf") {
      await fsp.unlink(filepath);
      throw new createHttpError.BadRequest("file extension must be .pdf");
    }

    const hash = await sha256(req.file.path);
    await fsp.unlink(filepath);
    res.send(`hash: ${hash}`);
  })
);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
