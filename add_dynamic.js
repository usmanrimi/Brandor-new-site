const fs = require('fs');
const files = [
  'app/page.tsx', 
  'app/projects/page.tsx', 
  'app/testimonials/page.tsx', 
  'app/admin/services/page.tsx', 
  'app/admin/team/page.tsx', 
  'app/admin/projects/page.tsx', 
  'app/admin/testimonials/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if(!content.includes('force-dynamic')) {
    fs.writeFileSync(f, 'export const dynamic = "force-dynamic";\n' + content);
  }
});
console.log("Done");
