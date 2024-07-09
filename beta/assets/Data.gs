function updateGithubHTML() {
  const token = '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';
  const repo = 'domainedelarochethulon';
  const owner = 'emlncvsr';
  const path = 'beta/index.html';
  const branch = 'main';
  
  // ID du document Google Docs
  const docId = '1cR9KkZr-LvDjDtWwpea0QZueosnF2DC3SXfm9D_XOh0';
  const doc = DocumentApp.openById(docId);
  const body = doc.getBody();
  const content = body.getText();
  
  // Split the content into sections
  const sections = content.split('---');
  
  // Extract sections for the HTML content
  const accueilContent = sections[0] ? sections[0].trim() : '';
  const exploitationContent = sections[1] ? sections[1].trim() : '';
  const vinsContentArray = sections[2].trim().split('\n\n');
  const locationContent = sections[3] ? sections[3].trim() : '';
  const vigneContentArray = sections[4].trim().split('\n');
  const salonsContent = sections[5] ? sections[5].trim() : '';
  const actualitesContentArray = sections[6].trim().split('\n\n');
  const contactContent = sections[7] ? sections[7].trim().replace(/\n/g, '<br>') : '';

  const vinsContentHtml = vinsContentArray.map(vin => {
    const vinParts = vin.split('\n');
    return `
      <div class="vin-item">
        <h2>${vinParts[0]}</h2>
        <p>${vinParts[1]}</p>
        <img src="${vinParts[2]}" alt="${vinParts[0]}">
        <p><strong>Prix:</strong> ${vinParts[3]}</p>
        <p><strong>Température de service:</strong> ${vinParts[4]}</p>
        <p><strong>Détails:</strong> ${vinParts[5]}</p>
      </div>
    `;
  }).join('');

  const actualitesContentHtml = actualitesContentArray.map(actualite => {
    const parts = actualite.trim().split('\n');
    return `<div class="news-item"><p>${parts[0]}</p><img src="${parts[1]}" alt="Medal Image"></div>`;
  }).join('\n');

  const vigneContentHtml = vigneContentArray.map(url => `<img src="${url.trim()}" alt="Vigne">`).join('\n');

  // Récupérer le fichier existant
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const options = {
    method: 'get',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json'
    }
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const file = JSON.parse(response.getContentText());
  const sha = file.sha;
  
  const currentHtml = Utilities.newBlob(Utilities.base64Decode(file.content)).getDataAsString();

  // Mettre à jour uniquement les sections spécifiques
  const newHtml = currentHtml
    .replace(/<p id="accueil-content">.*<\/p>/, `<p id="accueil-content">${accueilContent}</p>`)
    .replace(/<p id="exploitation-content">.*<\/p>/, `<p id="exploitation-content">${exploitationContent}</p>`)
    .replace(/<div class="vin-list" id="vins-content">.*<\/div>/, `<div class="vin-list" id="vins-content">${vinsContentHtml}</div>`)
    .replace(/<div class="vigne-images" id="vigne-content">.*<\/div>/, `<div class="vigne-images" id="vigne-content">${vigneContentHtml}</div>`)
    .replace(/<div id="salons-content">.*<\/div>/, `<div id="salons-content">${salonsContent}</div>`)
    .replace(/<div id="actualites-content">.*<\/div>/, `<div id="actualites-content">${actualitesContentHtml}</div>`)
    .replace(/<div id="contact-content">.*<\/div>/, `<div id="contact-content">${contactContent}</div>`);

  // Encode the new content
  const encodedContent = Utilities.base64Encode(Utilities.newBlob(newHtml).getBytes());

  // Mettre à jour le fichier
  const payload = JSON.stringify({
    message: 'Update HTML sections from Google Docs',
    content: encodedContent,
    sha: sha,
    branch: branch
  });
  
  const updateOptions = {
    method: 'put',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json'
    },
    payload: payload
  };
  
  const updateResponse = UrlFetchApp.fetch(url, updateOptions);
  Logger.log(updateResponse.getContentText());
}
