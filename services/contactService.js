const { AppDataSource } = require("../data-source");
const { Contact } = require("../models/Contact");

const identifyContact = async (email, phoneNumber) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const existingContacts = await contactRepository.find({
    where: [{ email: email }, { phoneNumber: phoneNumber }],
  });

  if (existingContacts.length === 0) {
    const newContact = new Contact();
    newContact.email = email;
    newContact.phoneNumber = phoneNumber;
    newContact.linkPrecedence = "primary";
    await contactRepository.save(newContact);

    return {
      primaryContactId: newContact.id,
      emails: [newContact.email],
      phoneNumbers: [newContact.phoneNumber],
      secondaryContactIds: [],
    };
  }

  const primaryContact =
    existingContacts.find((contact) => contact.linkPrecedence === "primary") ||
    existingContacts[0];
  const secondaryContacts = existingContacts.filter(
    (contact) =>
      contact.linkPrecedence === "secondary" && contact.id !== primaryContact.id
  );

  if (
    primaryContact.email !== email ||
    primaryContact.phoneNumber !== phoneNumber
  ) {
    const newSecondaryContact = new Contact();
    newSecondaryContact.email = email;
    newSecondaryContact.phoneNumber = phoneNumber;
    newSecondaryContact.linkPrecedence = "secondary";
    newSecondaryContact.linkedId = primaryContact.id;
    await contactRepository.save(newSecondaryContact);
    secondaryContacts.push(newSecondaryContact);
  }

  const emails = [
    ...new Set([
      primaryContact.email,
      ...secondaryContacts.map((contact) => contact.email),
    ]),
  ];
  const phoneNumbers = [
    ...new Set([
      primaryContact.phoneNumber,
      ...secondaryContacts.map((contact) => contact.phoneNumber),
    ]),
  ];
  const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

  return {
    primaryContactId: primaryContact.id,
    emails,
    phoneNumbers,
    secondaryContactIds,
  };
};

module.exports = { identifyContact };
