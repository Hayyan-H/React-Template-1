import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "24qvzm19",
  dataset: "production",
});

const builder = imageUrlBuilder(client);

function convertImagesToUrls(obj) {
  if (Array.isArray(obj)) {
    return obj.map(convertImagesToUrls); // If it's an array, process each item
  } else if (obj && typeof obj === "object") {
    // If it's a Sanity image object (has _type: 'image' and asset), convert it
    if (obj._type === "image" && obj.asset) {
      return builder.image(obj).url();
    }
    // Otherwise, process all properties
    const newObj = {};
    for (const key in obj) {
      newObj[key] = convertImagesToUrls(obj[key]);
    }
    return newObj;
  }
  return obj;
}

var general_data = null;
var homepage_data = null;
var FAQs_data = null;
var about_data = null;
var contact_data = null;

var alreadyFetched = false;

const fetchContentData = async () => {
  if (!alreadyFetched) {
    try {
      const data = await client.fetch(`{
        "general": *[_type == "general"][0],
        "homepage": *[_type == "homepage"][0],
        "FAQs": *[_type == "FAQs"][0],
        "about": *[_type == "about"][0],
        "contact": *[_type == "contact"][0]
      }`);
      general_data = data.general || null;
      homepage_data = data.homepage.sections || [];
      FAQs_data = data.FAQs.faqList || null;
      about_data = data.about || null;
      contact_data = data.contact || null;

      alreadyFetched = true;
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
    }
  }

  return {
    general: convertImagesToUrls(general_data) || {},
    socialMedia: convertImagesToUrls(general_data.socialMedia) || [],
    contactInformation: convertImagesToUrls(general_data.contactInformation) || {},
    homepage_sections: convertImagesToUrls(homepage_data) || [],
    FAQs: convertImagesToUrls(FAQs_data) || [],
    about_sections: convertImagesToUrls(about_data) || {},
    contact: convertImagesToUrls(contact_data) || {},
  };
};
fetchContentData();

export { fetchContentData };
