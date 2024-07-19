import fs from "node:fs";
import Member from "../models/Member.js";

const createMember = async (req, res, next) => {
  try {
    fs.readFile("members.json", "utf-8", async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error reading the file");
      }

      const members = JSON.parse(data)?.Sheet1;
      if (!members) {
        return res.status(400).send("Invalid JSON format");
      }

      for (let member of members) {
        const { MEMBERSHIP_NO, NAME, PHONE_NUMBER } = member;
        try {
          await Member.create({
            member_no: MEMBERSHIP_NO,
            name: NAME.trim(),
            phone_number: PHONE_NUMBER.trim(),
          });
        } catch (err) {
          console.log(`Error creating member: ${MEMBERSHIP_NO}`, err);
        }
      }

      res.status(201).send("Members created successfully");
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default createMember;
