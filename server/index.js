//@ts-check
// const express = require("express");
import express from "express";
import morgan from "morgan";
// const morgan = require("morgan");
// const multer = require("multer");
import multer from "multer";
// const uuid = require("uuid").v4;
import { v4 as uuid } from "uuid";
// const path = require("path");
import path from "path";
// const crypto = require("crypto");
import crypto from "crypto";
// const fsp = require("fs/promises");
import fsp from "fs/promises";
// const createHttpError = require("http-errors");
import createHttpError from "http-errors";
// const ipfsClient = require("ipfs-http-client");
import { create } from "ipfs-http-client";
// const fs = require("fs");
import fs from "fs";

//constants

const PORT = process.env.PORT || 5000;
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

/**
 *
 * @param {(req: import('express').Request,res: import('express').Response,next: import("express").NextFunction)=>Promise<any>} fn
 * @returns {import("express").RequestHandler}
 */
function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}
const ipfs = create({ url: "http://127.0.0.1:5001" });
// const testFile = fs.readFileSync("./test.pdf");
// ipfs.add(testFile).then((resp) => {
//   console.log(resp);
// });

/**
 * @param {string} filePath
 */
async function uploadFileToIPFS(filePath) {
  // Read the file from disk
  const file = fs.readFileSync(filePath);

  // Upload the file to IPFS
  const result = await ipfs.add(file);

  return result.cid.toString();
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

if (NODE_ENV == "development") {
  app.get("/issue", (req, res) => {
    const template = `
            <form action="/issue" method="post" enctype="multipart/form-data">
                <input type="file" name="certificate" />
                <button type="submit">issue</button>
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

app.post(
  "/issue",
  upload.single("certificate"),
  catchAsync(async (req, res, next) => {
    if (!req.file) {
      throw new createHttpError.BadRequest("file not found");
    }
    const hash = await sha256(req.file.path);
    const cid = await uploadFileToIPFS(req.file.path);
    return res.json({
      hash: hash,
      cid: cid,
      ifpsLink: `https://ipfs.io/ipfs/${cid}`,
    });
  })
);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
