const { EntitySchema } = require("typeorm");

const Contact = new EntitySchema({
  name: "Contact",
  tableName: "contact",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    phoneNumber: {
      type: "varchar",
      nullable: true,
    },
    email: {
      type: "varchar",
      nullable: true,
    },
    linkedId: {
      type: "int",
      nullable: true,
    },
    linkPrecedence: {
      type: "varchar",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
    deletedAt: {
      type: "timestamp",
      nullable: true,
    },
  },
});

module.exports = { Contact };
