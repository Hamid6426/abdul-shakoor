import Mail from '../models/Mail';
import mongoose from '../dbConfig'

interface CreateMailInput {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

class MailService {
  // Create a new mail document
  async createMail(input: CreateMailInput) {
    try {
      const mail = new Mail(input);
      return await mail.save();
    } catch (error) {
      throw new Error(`Failed to create mail: ${error}`);
    }
  }

  // Get all mails
  async getAllMails() {
    try {
      return await Mail.find();
    } catch (error) {
      throw new Error(`Failed to fetch mails: ${error}`);
    }
  }

  // Get a single mail by ID
  async getMailById(id: string) {
    try {
      const mail = await Mail.findById(id);
      if (!mail) {
        throw new Error('Mail not found');
      }
      return mail;
    } catch (error) {
      throw new Error(`Failed to fetch mail: ${error}`);
    }
  }

  // Update a mail by ID
  async updateMail(id: string, updates: Partial<CreateMailInput>) {
    try {
      const mail = await Mail.findByIdAndUpdate(id, updates, { new: true });
      if (!mail) {
        throw new Error('Mail not found');
      }
      return mail;
    } catch (error) {
      throw new Error(`Failed to update mail: ${error}`);
    }
  }

  // Delete a mail by ID
  async deleteMail(id: string) {
    try {
      const mail = await Mail.findByIdAndDelete(id);
      if (!mail) {
        throw new Error('Mail not found');
      }
      return mail;
    } catch (error) {
      throw new Error(`Failed to delete mail: ${error}`);
    }
  }
}

export default new MailService();
