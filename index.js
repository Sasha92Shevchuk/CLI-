const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContact":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case "getContactById":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);

    case "addContact":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "removeContact":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);

    default:
      return console.warn("Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
