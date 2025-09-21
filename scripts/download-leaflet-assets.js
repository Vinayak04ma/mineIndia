const fs = require('fs');
const https = require('https');
const path = require('path');

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Files to download
const files = [
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x.png',
    filename: 'marker-icon-2x.png'
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon.png',
    filename: 'marker-icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    filename: 'marker-shadow.png'
  }
];

// Download function
function downloadFile(url, filename) {
  const filePath = path.join(publicDir, filename);
  const file = fs.createWriteStream(filePath);
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
}

// Download all files
async function downloadAll() {
  try {
    console.log('Downloading Leaflet marker assets...');
    for (const file of files) {
      await downloadFile(file.url, file.filename);
    }
    console.log('All assets downloaded successfully!');
  } catch (error) {
    console.error('Error downloading assets:', error);
    process.exit(1);
  }
}

// Run the download
downloadAll();
