// Define a function to dynamically import and configure Cloudinary
async function getCloudinary() {
    const cloudinary = (await import('cloudinary')).v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
        secure: true
    });
    return cloudinary;
}

export default getCloudinary;