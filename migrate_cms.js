const https = require('https');
const fs = require('fs');
const path = require('path');

const config = {
  projectId: 'nljl95h9',
  dataset: 'production',
  token: 'sk8wdsPDTOuC2FCJ4R8YCy3cGRihrEAaA4Mq4rmXlXPLS59WpUqt6nbQjd1UUz2GqbiF3i0KNEdn23VqmSxOUH2lf9P6NwQkfhWZsjVVbaOAoo7mwpatl8vlVAreYGKFacGnNNZ7f6tY7pgzbYU3MLbVf4TAtTf2DwxbGQDdIvVy5H7bgwA1',
  apiVersion: 'v2024-01-01'
};

const solutions = [
  {
    slug: 'corn-milling-solution',
    localId: 'corn-grinding',
    title: 'Corn Grinding',
    images: {
      banner: 'corn.jpg',
      icon_cost: 'low-cost-high-roi.png',
      icon_dust: 'dust-free-sealing.png',
      icon_quality: 'excellent-quality.png',
      icon_efficiency: 'efficiency-improvement.png',
      icon_smart: 'intelligent-worry-free.png',
      icon_support: 'long-term-guarantee.png',
      pain_dust: 'serious-dust-pollution.jpg',
      pain_unstable: 'unstable-performance.jpg',
      pain_mismatch: 'mismatched-systems.jpg',
      pain_manual: 'low-intelligence.jpg'
    }
  },
  {
    slug: 'grain-milling-solution',
    localId: 'grains-and-beans',
    title: 'Grains and Beans',
    images: {
      banner: 'grains-and-beans.jpg',
      icon_cost: 'low-cost-high-roi.png',
      icon_dust: 'dust-free-sealing.png',
      icon_fine: 'excellent-quality.png',
      icon_efficiency: 'efficiency-improvement.png',
      icon_smart: 'intelligent-worry-free.png',
      icon_support: 'long-term-guarantee.png',
      pain_dust: 'serious-dust-pollution.jpg',
      pain_clogging: 'oily-material-clogging.jpg',
      pain_temp: 'high-temp-rise.jpg',
      pain_fineness: 'sub-standard-fineness.jpg'
    }
  },
  {
    slug: 'fertilizer-mixing',
    localId: 'powder-mixing',
    title: 'Powder Mixing',
    images: {
      banner: 'powder.jpg',
      icon_uniformity: 'leading-uniformity.png',
      icon_efficiency: 'efficiency-improvement.png',
      icon_dust: 'dust-free-sealing.png',
      icon_smart: 'intelligent-worry-free.png',
      icon_deadangle: 'no-dead-angle-design.png',
      icon_adaptability: 'strong-adaptability.png',
      pain_dust: 'serious-dust-pollution.jpg',
      pain_uniformity: 'poor-mixing-uniformity.jpg',
      pain_temp: 'high-temp-rise.jpg',
      pain_residue: 'high-residue.jpg'
    }
  },
  {
    slug: 'soaked-rice-solution',
    localId: 'soaked-rice-grinding',
    title: 'Soaked Rice Grinding',
    images: {
      banner: 'soaked-rice.jpg',
      icon_efficiency: 'efficiency-improvement.png',
      icon_quality: 'excellent-quality.png',
      icon_hygiene: 'dust-free-sealing.png',
      icon_cost: 'low-cost-high-roi.png',
      icon_smart: 'intelligent-worry-free.png',
      icon_support: 'long-term-guarantee.png',
      pain_residue: 'high-residue.jpg',
      pain_cleaning: 'serious-dust-pollution.jpg',
      pain_texture: 'sub-standard-fineness.jpg',
      pain_maintenance: 'high-temp-rise.jpg'
    }
  }
];

const imageDir = path.join(process.cwd(), 'front/dodoshark/public/assets/images/solutions/temp');

async function apiRequest(method, path, body = null, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${config.projectId}.api.sanity.io`,
      path: `/${config.apiVersion}${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': contentType
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode >= 400) reject(json);
          else resolve(json);
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    if (body) {
      if (Buffer.isBuffer(body)) req.write(body);
      else if (typeof body === 'string') req.write(body);
      else req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function uploadImage(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1);
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
  return apiRequest('POST', `/assets/images/${config.dataset}`, fileBuffer, mimeType);
}

// Extract HTML from the artifact file
function extractHtml(allContent, sectionName) {
  const marker = `## ${sectionName}`;
  const start = allContent.indexOf(marker);
  if (start === -1) return null;
  
  const htmlMarker = '### HTML\n```html\n';
  const htmlStart = allContent.indexOf(htmlMarker, start) + htmlMarker.length;
  const htmlEnd = allContent.indexOf('```', htmlStart);
  let html = allContent.substring(htmlStart, htmlEnd).trim();
  
  // Fix placeholders to match the asset mapping logic
  html = html.replace(/\{\{IMAGES\.([A-Z0-9_]+)\}\}/g, (match, key) => `{{asset:${key.toLowerCase()}}}`);
  
  return html;
}

async function run() {
  try {
    const artifactPath = 'C:\\Users\\lin\\.gemini\\antigravity\\brain\\bcd9a252-9596-40df-a98c-909d753f0785\\extracted_content.md';
    const allContent = fs.readFileSync(artifactPath, 'utf8');

    console.log('Fetching solution documents...');
    const query = '*[_type == "solution"]{_id, "slug": slug.current, title}';
    const res = await apiRequest('GET', `/data/query/${config.dataset}?query=${encodeURIComponent(query)}`);
    const docMap = {};
    res.result.forEach(doc => { docMap[doc.slug] = doc._id; });

    for (const sol of solutions) {
      // Try exact slug or title match if slug differs
      let docId = docMap[sol.slug];
      if (!docId) {
        // Fallback search for documents matching the local ID or title
        const searchSlug = sol.localId;
        docId = docMap[searchSlug];
      }

      if (!docId) {
        console.warn(`[WARN] Skipping ${sol.title} - Document not found by slug ${sol.slug} or ${sol.localId}`);
        continue;
      }

      console.log(`\n--- Migrating ${sol.title} ---`);
      
      const html = extractHtml(allContent, sol.localId === 'corn-grinding' ? 'Corn Grinding' : 
                                sol.localId === 'grains-and-beans' ? 'Grains and Beans' :
                                sol.localId === 'powder-mixing' ? 'Powder Mixing' : 'Soaked Rice Grinding');

      const templateImages = [];
      for (const [key, fileName] of Object.entries(sol.images)) {
        const filePath = path.join(imageDir, fileName);
        if (!fs.existsSync(filePath)) {
          console.warn(`  [WARN] Missing file: ${fileName}`);
          continue;
        }

        console.log(`  Uploading ${key} (${fileName})...`);
        const asset = await uploadImage(filePath);
        templateImages.push({
          _key: `key_${key}_${Math.random().toString(36).substr(2, 9)}`,
          key: key,
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset.document._id }
          }
        });
      }

      const patch = {
        mutations: [
          {
            patch: {
              id: docId,
              set: {
                detailRenderMode: 'htmlTemplate',
                'htmlTemplate.html.code': html,
                'htmlTemplate.templateImages': templateImages
              }
            }
          }
        ]
      };

      // Also update draft
      if (!docId.startsWith('drafts.')) {
        patch.mutations.push({
          patch: {
            id: `drafts.${docId}`,
            set: {
              detailRenderMode: 'htmlTemplate',
              'htmlTemplate.html.code': html,
              'htmlTemplate.templateImages': templateImages
            }
          }
        });
      }

      await apiRequest('POST', `/data/mutate/${config.dataset}`, patch);
      console.log(`  SUCCESS: Updated document ${sol.slug}`);
    }
  } catch (err) {
    console.error('Migration failed:', err.message || err);
  }
}

run();
