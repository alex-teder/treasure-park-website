import { Clear, FileUpload } from "@mui/icons-material";
import { Alert, Box, Button, CardMedia, CircularProgress } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEventHandler, useState } from "react";

import { attachmentsRef } from "../../storage/firebase-storage";

const LIMIT_MB = 2;
const MAX_FILE_SIZE = LIMIT_MB * 1024 * 1024;
const MAX_IMAGES = 1;

type ImageUploaderProps = { attachments: string[]; setAttachments: (urls: string[]) => void };

export function ImageUploader({ attachments, setAttachments }: ImageUploaderProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setError(`File size should not exceed ${LIMIT_MB} MB.`);
        return;
      }
      if (!file.type.startsWith("image")) {
        setError("Please upload a valid image file.");
        return;
      }
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) return;
    try {
      setIsLoading(true);
      const filename = crypto.randomUUID() + "." + file.name.split(".").at(-1)!.toLowerCase();
      const fileRef = ref(attachmentsRef, filename);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setAttachments(attachments.concat(url));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h3 style={{ marginBlock: "0.5rem" }}>Attachments:</h3>
      {attachments.length < MAX_IMAGES && (
        <Button variant="contained" component="label" endIcon={<FileUpload />}>
          Upload Image
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      )}

      <Box display="flex" flexWrap="wrap" gap={1}>
        {attachments.map((url) => (
          <Box key={url}>
            <CardMedia image={url} component="img" sx={{ py: 1, maxHeight: 400 }} />
            <Button
              size="small"
              startIcon={<Clear />}
              onClick={() => setAttachments(attachments.filter((value) => value !== url))}
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={50} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
}
