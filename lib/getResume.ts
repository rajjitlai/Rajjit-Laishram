import { config, resumeBucket } from "@/config/appwrite";

export const getResume = () => {
    return resumeBucket.getFileDownload(
        config.resumeBucketId!,
        config.resumeFileId!
    )
}
