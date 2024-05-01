import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
interface IBody {
  contentType?: string;
  content?: string;
}
interface IEmail {
  name?: string;
  address?: string;
}
interface IEmailAddress {
  emailAddress?: IEmail;
}
interface IDateZone {
  dateTime?: string,
  timeZone?: string,
}
interface ILocationMail {
  displayName: string;
  locationType: string;
  uniqueIdType: string;
}
export interface IMail extends Document {
  id?: string;
  createdDateTime?: Date;
  lastModifiedDateTime?: Date;
  changeKey?: string;
  receivedDateTime?: Date;
  sentDateTime: Date;
  hasAttachments?: boolean;
  internetMessageId?: string;
  subject?: string | null;
  bodyPreview?: string;
  importance?: string;
  parentFolderId?: string;
  conversationId?: string;
  conversationIndex?: string;
  isDeliveryReceiptRequested?: boolean;
  isReadReceiptRequested?: boolean;
  isRead?: boolean;
  isDraft?: boolean;
  allowNewTimeProposals?: string | null;
  meetingRequestType?: string;
  body?: IBody;
  sender?: IEmailAddress;
  from?: IEmailAddress;
  toRecipients?: Array<IEmailAddress>;
  ccRecipients?: Array<IEmailAddress>;
  replyTo?: Array<IEmailAddress>;
  inferenceClassification?: string;
  responseRequested?: string;
  type?: string;
  meetingMessageType?: string;
  startDateTime?: IDateZone,
  endDateTime?: IDateZone,
  location?: ILocationMail;
  flag: { flagStatus: string | boolean | number }
}
const mailSchema: Schema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    changeKey: { type: String },
    internetMessageId: { type: String },
    type: { type: String },
    meetingMessageType: { type: String },
    responseRequested: { type: String },
    subject: { type: String },
    bodyPreview: { type: String },
    importance: { type: String },
    parentFolderId: { type: String },
    conversationId: { type: String },
    conversationIndex: { type: String },
    inferenceClassification: { type: String },
    isDeliveryReceiptRequested: { type: Boolean },
    isReadReceiptRequested: { type: Boolean },
    isRead: { type: Boolean },
    isDraft: { type: Boolean },
    createdDateTime: { type: Date, required: true },
    lastModifiedDateTime: { type: Date, required: true },
    receivedDateTime: { type: Date, required: true },
    sentDateTime: { type: Date, required: true },
    hasAttachments: { type: Boolean },
    body: {
      contentType: { type: String },
      content: { type: String },
    },
    sender: {
      emailAddress: {
        name: { type: String },
        address: { type: String },
      },
    },
    from: {
      emailAddress: {
        name: { type: String },
        address: { type: String },
      },
    },
    toRecipients: {
      type: Array<{
        emailAddress: {
          name: { type: string };
          address: { type: string };
        };
      }>,
    },
    ccRecipients: {
      type: Array<{
        emailAddress: {
          name: { type: string };
          address: { type: string };
        };
      }>,
    },
    replyTo: {
      type: Array<{
        emailAddress: {
          name: { type: string };
          address: { type: string };
        };
      }>,
    },
    location: {
      displayName: { type: String },
      locationType: { type: String },
      uniqueIdType: { type: String }
    },
    flag: {
      flagStatus: { type: Schema.Types.Mixed }
    },
    startDateTime: {
      dateTime: { type: String },
      timeZone: { type: String }
    },
    endDateTime: {
      dateTime: { type: String },
      timeZone: { type: String }
    },
  },
  {
    timestamps: true,
  }

);
mailSchema.plugin(paginate);
export const Mail = mongoose.model<IMail, mongoose.PaginateModel<IMail>>(
  "Mail",
  mailSchema
);
