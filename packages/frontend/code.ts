export function doGet() {
  return HtmlService.createHtmlOutputFromFile("dist/index.html").addMetaTag(
    "viewport",
    "width=device-width, initial-scale=1",
  );
}
