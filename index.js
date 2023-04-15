const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContact":
      try {
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);
      } catch (error) {
        console.error("Failed to list contacts:", error);
      }
      break;

    case "getContactById":
      try {
        const oneContact = await contacts.getContactById(id);
        return console.log(oneContact);
      } catch (error) {
        console.error("Failed to get contact by ID:", error);
      }
      break;

    case "addContact":
      try {
        const newContact = await contacts.addContact({ name, email, phone });
        return console.log(newContact);
      } catch (error) {
        console.error("Failed to add contact:", error);
      }
      break;

    case "removeContact":
      try {
        const removeContact = await contacts.removeContact(id);
        return console.log(removeContact);
      } catch (error) {
        console.error("Failed to remove contact:", error);
      }
      break;

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
