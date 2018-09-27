import Asset from "../models/asset";

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
    tag == null && reject("Invalid tag");

    const cleanTag = sanitize(tag);

    cleanTag !== undefined && cleanTag !== null && cleanTag !== ""
      ? resolve(tag)
      : reject(tag);
  });

/**
 * @param {*} payload
 * @param {*} tag
 * @returns {Promise<>}
 */
const searchByTag = (payload, tag) =>
  new Promise(async (resolve, reject) => {
    const { pageQuery, queryLimit, currentPage } = payload;

    const assets = await Asset.find({ "tags.title": tag })
      .skip(pageQuery)
      .limit(queryLimit)
      .sort({ timestamp: -1 });

    const count = await Asset.countDocuments({ "tags.title": tag });
    const overallPages = Math.floor(count / queryLimit);
    const currentQuery = assets.length;

    assets.length <= 0 && reject("Tag not found");
    currentPage > overallPages && reject("Page out of range.");

    resolve({ currentPage, currentQuery, count, overallPages, assets });
  });

export default { validateTag, searchByTag };
