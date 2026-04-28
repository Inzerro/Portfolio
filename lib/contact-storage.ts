import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

import type { ContactFormData } from "@/lib/contact-schema";

export type StoredContactSubmission = Pick<
  ContactFormData,
  "name" | "email" | "message"
> & {
  id: string;
  createdAt: string;
  ip: string;
  userAgent: string;
};

const STORAGE_DIR = path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(STORAGE_DIR, "feedback-submissions.jsonl");

export async function storeContactSubmission(
  submission: StoredContactSubmission,
) {
  await mkdir(STORAGE_DIR, { recursive: true });
  await appendFile(STORAGE_FILE, `${JSON.stringify(submission)}\n`, "utf8");

  return STORAGE_FILE;
}
