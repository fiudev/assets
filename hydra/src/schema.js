const schema = {
  properties: {
    choice: {
      description: "\n1 - read length of path\n2 - insert path files to DB",
      type: "string",
      message: "Wrong path answer",
      default: "1",
      required: true
    }
  }
};

module.exports = schema;
