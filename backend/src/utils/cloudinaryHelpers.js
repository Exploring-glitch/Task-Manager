import cloudinary from "../config/cloudinaryConfig.js";

const PUBLIC_ID_PATTERN = /\/upload\/(?:v\d+\/)?(.+?)\.[a-z0-9]+$/i;

const extractPublicId = (url) => {
    if (typeof url !== "string") return null;
    const match = url.match(PUBLIC_ID_PATTERN);
    return match ? match[1] : null;
};

/**
 * Deletes a previously uploaded Cloudinary image.
 * Failures are swallowed on purpose: the old file is not critical for the
 * request that triggered the cleanup.
 */
export const deleteCloudinaryImage = async (url) => {
    const publicId = extractPublicId(url);

    if (!publicId || !process.env.CLOUDINARY_CLOUD_NAME) return;

    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Failed to delete Cloudinary image:", error.message);
    }
};
