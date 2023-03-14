//@ts-check
import cors from "cors";
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
import { PDFDocument } from "pdf-lib";

//constants

const PORT = process.env.PORT || 5000;
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
const NODE_ENV = process.env.NODE_ENV || "development";
const APPENDED_DIR = path.join(process.cwd(), "appended");
const IPFS_NODE_HOST = "127.0.0.1";

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
const ipfs = create({
  host: IPFS_NODE_HOST,
  protocol: "http",
  port: 5001,
});

/**
 * @param {string} filePath
 */
async function uploadFileToIPFS(filePath) {
  // Read the file from disk
  const file = fs.readFileSync(filePath);

  // Upload the file to IPFS
  const result = await ipfs.add(file, {
    pin: true,
  });

  return result.cid.toString();
}

/**
 * @param {string} uuidStr
 * @param {string} pdfInputPath
 * @param {string} pdfOutputPath
 */
async function appendUUIDtoPDF(uuidStr, pdfInputPath, pdfOutputPath) {
  // Load your existing PDF
  const pdfBytes = fs.readFileSync(pdfInputPath);

  // Load the PDFDocument
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Get the number of pages in the PDF
  const numPages = pdfDoc.getPageCount();

  // Create a new UUID
  const uuid = uuidStr;

  // Add the UUID to each page
  for (let i = 0; i < numPages; i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();
    const text = `UUID: ${uuid}`;
    const fontSize = 10;

    // Add the text to the top right corner of the page
    // const textWidth = page.getFont("Helvetica").widthOfText(text, fontSize);
    const x = width - 250;
    const y = height - 20;
    page.drawText(text, { x, y, size: fontSize });
  }

  // Save the modified PDF
  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(pdfOutputPath, modifiedPdfBytes);
}

//setup

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}
if (!fs.existsSync(APPENDED_DIR)) {
  fs.mkdirSync(APPENDED_DIR);
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
app.use(cors());
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
    // res.send(`hash: ${hash}`);
    res.json({ hash });
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
    const id = uuid();
    const appendedFilePath = path.join(APPENDED_DIR, id + ".pdf");
    await appendUUIDtoPDF(id, req.file.path, appendedFilePath);
    const cid = await uploadFileToIPFS(appendedFilePath);
    return res.json({
      uuid: id,
      hash: hash,
      ifpsLink: `https://ipfs.io/ipfs/${cid}/?filename=${id}.pdf`,
      cid: cid,
    });
  })
);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
