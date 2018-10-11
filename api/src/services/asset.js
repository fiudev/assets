import Asset from "../models/asset";
import errorResponse from "../responses/errorResponses";
import axios from "axios";
import isReachable from "is-reachable";

const { THUMB_URL, SHARE_URL } = process.env;
const thmb = axios.create({ baseURL: THUMB_URL });

/**
 * @param {string} str
 * @returns {string}
 */
const sanitize = str => str.replace(/[^A-Za-z0-9]+/g, "").toLowerCase();

/**
 * @param {string} tag
 * @returns {Promise<string>}
 */
const validateTag = tag =>
  new Promise((resolve, reject) => {
    tag == null && reject(errorResponse.notTag);

    const cleanTag = sanitize(tag);

    cleanTag !== undefined && cleanTag !== null && cleanTag !== ""
      ? resolve(tag)
      : reject(tag);
  });

/**
 * @param {Array<string>} tags
 */
const validateTags = tags =>
  new Promise((resolve, reject) => {
    if (!Array.isArray(tags)) reject(errorResponse.notTagArray);
    if (tags.length <= 0) reject(errorResponse.notTag);

    let cleanTags = new Array();
    for (let tag of tags) {
      let cleanTag = sanitize(tag);
      cleanTags.push(cleanTag);
    }
    resolve(cleanTags);
  });

/**
 * @param {*} payload
 * @param {*} tag
 * @returns {Promise<>}
 */
const searchByTag = (payload, tag) =>
  new Promise(async (resolve, reject) => {
    const { pageQuery, queryLimit, currentPage } = payload;

    const assets = await Asset.find({ tags: tag })
      .skip(pageQuery)
      .limit(queryLimit)
      .sort({ timestamp: -1 });

    const count = await Asset.countDocuments({ tags: tag });
    const overallPages = Math.floor(count / queryLimit);
    const currentQuery = assets.length;

    assets.length <= 0 && reject(errorResponse.tagNotFound);
    currentPage > overallPages && reject(errorResponse.pageOutOfRange);

    resolve({ currentPage, currentQuery, count, overallPages, assets });
  });

const storeDB = data =>
  new Promise(async resolve => {
    let payload = new Array();

    for (let i of data.assetPaths) {
      const filename = i.original.replace(/^.*[\\\/]/, "");
      const thumbname = i.thumbnail.replace(/^.*[\\\/]/, "");
      const entry = {
        src: `${SHARE_URL}/originals/${filename}`,
        thumbnail: `${SHARE_URL}/thumbnails/${thumbname}`,
        uploadedBy: data.user.email,
        filename,
        tags: data.cleanTags,
        path: i
      };

      payload.push(entry);
      await Asset.create(entry);
    }
    resolve(payload);
  });

/**
 * @param {Array<string>} filepaths
 */
const createThumbnails = filepaths =>
  new Promise(async (resolve, reject) => {
    try {
      const hasValidConnection = await isReachable(THUMB_URL);

      if (hasValidConnection) {
        if (!Array.isArray(filepaths)) reject(errorResponse.invalidRequest);
        const { data } = await thmb.post("/create", { filepaths });
        resolve(data.data);
      }
      reject("Uploader unavailable.");
    } catch (e) {
      reject(e);
    }
  });

export default {
  createThumbnails,
  validateTag,
  validateTags,
  searchByTag,
  storeDB
};
