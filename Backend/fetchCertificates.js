const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')
// Configure Cloudinary
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const fetchCertificates = async () => {
  try {
    let certificates = [];
    let nextCursor = null;

    do {
      const response = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'GDG-Certificates-', // Folder name in Cloudinary
        max_results: 100, // Fetch up to 100 results per request
        next_cursor: nextCursor, // Use the cursor to fetch subsequent pages
      });

      const currentCertificates = response.resources.map(resource => ({
        public_id: resource.public_id,
        url: resource.secure_url,
      }));

      certificates = [...certificates, ...currentCertificates];
      nextCursor = response.next_cursor; // Update the cursor for the next request
    } while (nextCursor);

    console.log('All Certificates:', certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
  }
};

// Run the function
fetchCertificates();
